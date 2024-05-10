import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: () => {
    const headers = new Headers({
      location: `/auth`,
    });
    return new Response("", {
      status: 302,
      headers,
    });
  },
};
