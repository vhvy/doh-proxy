
const handleRequest = async () => {
  return new Response("Hello world!", {
    status: 200
  });
};

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const DELETE = handleRequest;
export const OPTIONS = handleRequest;