import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { cookie_to_object } from "../functions.ts";

export const Email: FunctionComponent = () => {
  const [disable, setdisable] = useState<boolean>(true);
  const [em, sete] = useState<string>("");
  const [p, setp] = useState<string>("");
  const [m, setm] = useState<string>("");
  const cookie_raw = IS_BROWSER ? document.cookie.split(";") : [];

  const cookie = cookie_to_object(cookie_raw);

  const check = (em: string, p: string, m: string) => {
    const exist = cookie.Users.find((e) => {
      return e.email === em;
    });
    if (em.endsWith("@nebrija.es") && exist) {
      setdisable(false);
    }
    if (p.length >= 5) {
      setdisable(false);
    }
    if (m.length >= 1) {
      setdisable(false);
    } else setdisable(true);
    return;
  };

  return (
    <form action="/client/new" method="post" class={"new"}>
      <label for="to">To:</label>
      <input
        placeholder={"...@nebrrija.es"}
        type="text"
        name="to"
        id="to"
        onBlur={(e) => {
          sete(e.currentTarget.value);
          check(em, p, m);
        }}
      />
      <label for="affair">Affair:</label>
      <input
        type="text"
        name="affair"
        id="affair"
        onBlur={(e) => {
          setp(e.currentTarget.value);
          check(em, p, m);
        }}
      />
      <label for="message">Message:</label>
      <input
        type="text"
        name="message"
        id="message"
        onBlur={(e) => {
          setm(e.currentTarget.value);
          check(em, p, m);
        }}
      />
      <button disabled={disable} type={"submit"}>Send</button>
    </form>
  );
};
