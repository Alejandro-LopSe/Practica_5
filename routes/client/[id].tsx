import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { ShowEmail } from "../../islands/ShowEmail.tsx";

import { cookie_to_object, create_cookie } from "../../functions.ts";
import { Email } from "../../islands/Email.tsx";
import { Form } from "../../islands/Form.tsx";
import { Cookie_Obj, Email as Emailtype } from "../../types.ts";

export const handler: Handlers<Emailtype> = {
  GET: (req: Request, ctx: FreshContext<unknown, Emailtype>) => {
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
    const id = ctx.params.id;
    const email = cookie.Emails[parseInt(id)];
    return ctx.render(email);
  },
};

export default function Page(props: PageProps<Emailtype>) {
  return (
    <div>
      <ShowEmail email={[props.data]} />
    </div>
  );
}
