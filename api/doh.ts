const targetDoh = "https://1.1.1.1/dns-query";
const contentType = "application/dns-message";
const jsonContentType = "application/dns-json";

const emptyContent = "Not Found";
const emptyLength = new TextEncoder().encode(emptyContent).length;
const emptyRes = () => new Response(emptyContent, { status: 404, headers: { "Content-Length": emptyLength.toString() } });

const getUrlParams = (url: string) => {
  return new URL(url).searchParams;
}

export async function GET(request: Request) {
  const query = getUrlParams(request.url);
  let res: Promise<Response> | undefined = undefined;

  if (query.has("dns")) {
    res = fetch(targetDoh + `?dns=${query.get("dns")}`, {
      method: "GET",
      headers: {
        "Accept": contentType,
      }
    });
  } else if (request.headers.get("Accept") === jsonContentType) {
    res = fetch(targetDoh + "?" + query.toString(), {
      method: "GET",
      headers: {
        "Accept": jsonContentType,
      }
    });
  }

  return res ?? emptyRes();
}

export async function POST(request: Request) {
  if (request.headers.get("Content-Type") === contentType) {
    const body = request.body;
    return fetch(targetDoh, {
      method: "POST",
      duplex: "half",
      headers: {
        "Content-Type": contentType,
        "Accept": contentType,
      },
      body: body,
    });
  }

  return emptyRes();
}