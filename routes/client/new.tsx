import { FreshContext, Handlers } from "$fresh/server.ts";

import { cookie_to_object, create_cookie } from "../../functions.ts";
import { Email } from "../../islands/Email.tsx";
import { Form } from "../../islands/Form.tsx";
import { Cookie_Obj, Email as Emailtype } from "../../types.ts";

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext) => {
    const r = req.headers.get("cookie");
    if (!r) {
      const headers = new Headers();
      headers.append("location", "/auth");
      return new Response(``, {
        status: 302,
        headers,
      });
    }

    return ctx.render();
  },
  POST: async (req: Request, ctx: FreshContext) => {
    const raw_cookies = req.headers.get("cookie")?.split(";");
    const cookie_set: Cookie_Obj = cookie_to_object(raw_cookies!);
    if (cookie_set.Auth.auth === false) {
      const new_cookie_set: Cookie_Obj = {
        Users: cookie_set.Users,
        Auth: { email: cookie_set.Auth.email, auth: false },
        Emails: cookie_set.Emails,
      };
      const headers = create_cookie(new_cookie_set);

      headers.append("location", "/auth");
      return new Response(``, {
        status: 302,
        headers,
      });
    }
    const form = await req.formData();
    const email: Emailtype = {
      id: cookie_set.Emails.length,
      to: form.get("to")!.toString(),
      from: cookie_set.Auth.email,
      affair: form.get("affair")!.toString(),
      message: form.get("message")!.toString(),
      date: new Date(),
    };
    const new_cookie_set: Cookie_Obj = {
      Users: cookie_set.Users,
      Auth: { email: cookie_set.Auth.email, auth: true },
      Emails: [...cookie_set.Emails, email],
    };
    const headers = create_cookie(new_cookie_set);

    headers.append("location", "/client/new");
    return new Response(``, {
      status: 302,
      headers,
    });
  },
};

export default function Page() {
  return (
    <div class={"new"}>
      <Email />
    </div>
  );
}
