import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import { cookie_to_object, create_cookie } from "../../functions.ts";
import { ShowEmail } from "../../islands/ShowEmail.tsx";
import { Cookie_Obj, Email } from "../../types.ts";

export const handler: Handlers<Email[]> = {
  GET: (req: Request, ctx: FreshContext<unknown, Email[]>) => {
    const r = req.headers.get("cookie");
    if (!r) {
      const headers = new Headers();
      headers.append("location", "/auth");
      return new Response(``, {
        status: 302,
        headers,
      });
    }
    const cookie = cookie_to_object(r.split(";"));
    return ctx.render(cookie.Emails);
  },
  POST: (req: Request, ctx: FreshContext) => {
    const raw_cookies = req.headers.get("cookie")?.split(";");
    const cookie_set: Cookie_Obj = cookie_to_object(raw_cookies!);
    cookie_set.Auth.auth = false;
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
  },
};

export default function Page(props: PageProps<Email[]>) {
  return (
    <div class={"home"}>
      <form action="/client/new" method="get">
        <button type={"submit"}>
          nuevo correo
        </button>
      </form>
      <ShowEmail email={props.data}></ShowEmail>
    </div>
  );
}
