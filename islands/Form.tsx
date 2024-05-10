import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { cookie_to_object } from "../functions.ts";

export const Form: FunctionComponent = () => {
  const [disable, setdisable] = useState<boolean>(true);
  const [e, sete] = useState<string>("");
  const [p, setp] = useState<string>("");
  if (IS_BROWSER) {
    console.log(document.cookie);
  }

  const cookie_raw = IS_BROWSER && document.cookie !== ""
    ? document.cookie.split(";")
    : [];

  const cookie = cookie_to_object(cookie_raw);
  const check = (p: string, e: string) => {
    if (cookie_raw.length > 0) {
      const exist = cookie.Users.find((em) => {
        console.log(em.email === e);

        return em.email === e;
      });
      if (exist) {
        if (p === exist.pass) {
          console.log(1);
          setdisable(false);
        } else {
          console.log(2);
          setdisable(true);
        }
      } else if (p.length >= 6 && e.endsWith("@nebrija.es")) {
        console.log(3);
        setdisable(false);
      }
      return;
    }

    if (p.length >= 6 && e.endsWith("@nebrija.es")) {
      console.log(3);
      setdisable(false);
    }
    return;
  };

  return (
    <form action="/auth" method="POST" class={"auth"}>
      <input
        placeholder={"...@nebrrija.es"}
        type="text"
        name="email"
        required
        onBlur={(em) => {
          sete(em.currentTarget.value);
          check(p, e);
        }}
        onInput={(em) => {
          sete(em.currentTarget.value);
          check(p, e);
        }}
      />
      <input
        type="text"
        name="pass"
        required
        onBlur={(em) => {
          setp(em.currentTarget.value);
          check(p, e);
        }}
        onInput={(em) => {
          setp(em.currentTarget.value);
          check(p, e);
        }}
      />
      <button disabled={disable} type={"submit"}>Send</button>
    </form>
  );
};
