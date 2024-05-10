import { FreshContext, Handlers } from "$fresh/server.ts";
import { context } from "https://deno.land/x/esbuild@v0.20.2/mod.js";
import { cookie_to_object, create_cookie } from "../functions.ts";
import { Auth, Cookie_Obj, User } from "../types.ts";
import { Form } from "../islands/Form.tsx";

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext) => {
    const raw_cookies = req.headers.get("cookie")?.split(";");
    return ctx.render();
    /*if (raw_cookies && raw_cookies.length > 0) {
      const cookies = cookie_to_object(raw_cookies);

      if (!cookies.Auth.auth) {
        return ctx.render();
      }
      const headers: Headers = new Headers();
      headers.append("location", "/client/home");
      return new Response(``, {
        status: 302,
        headers,
      });
    }*/
  },

  POST: async (req: Request, ctx: FreshContext) => {
    const raw_cookies = req.headers.get("cookie")?.split(";");

    const form = await req.formData();
    const user: User = {
      email: form.get("email")!.toString(),
      pass: form.get("pass")!.toString(),
    };

    const auth: Auth = {
      email: form.get("email")!.toString(),
      auth: true,
    };

    if (raw_cookies) {
      const get_cookie = cookie_to_object(raw_cookies);
      const exist = get_cookie.Users.find((em) => {
        console.log(em.email === form.get("email")!.toString());

        return em.email === form.get("email")!.toString();
      });
      if (exist) {
        const cookie_set: Cookie_Obj = {
          Users: [...get_cookie.Users],
          Auth: auth,
          Emails: [],
        };
        const headers = create_cookie(cookie_set);

        headers.append("location", "/client/home");
        return new Response(``, {
          status: 302,
          headers,
        });
      }
      const cookie_set: Cookie_Obj = {
        Users: [...get_cookie.Users, user],
        Auth: auth,
        Emails: [],
      };
      const headers = create_cookie(cookie_set);

      headers.append("location", "/client/home");
      return new Response(``, {
        status: 302,
        headers,
      });
    }

    const cookie_set: Cookie_Obj = {
      Users: [user],
      Auth: auth,
      Emails: [],
    };
    const headers = create_cookie(cookie_set);

    headers.append("location", "/client/home");
    return new Response(``, {
      status: 302,
      headers,
    });
  },
};

export default function Page() {
  return <Form></Form>;
}
