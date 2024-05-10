import { Cookie_Obj } from "./types.ts";

export const cookie_to_object = (cookie: string[]): Cookie_Obj => {
  if (cookie.length === 0) {
    return {
      Users: [],
      Auth: { email: "", auth: false },
      Emails: [],
    };
  }

  const ur = cookie[0].substring(6);
  const ar = cookie[1].substring(6);
  const er = cookie[2].substring(8);
  const cookie_object: Cookie_Obj = {
    Users: JSON.parse(ur),
    Auth: JSON.parse(ar),
    Emails: JSON.parse(er),
  };
  return cookie_object;
};
export const create_cookie = (cookie: Cookie_Obj): Headers => {
  const header: Headers = new Headers();
  header.append("Set-Cookie", `Users=${JSON.stringify(cookie.Users)}; path=/`);
  header.append("Set-Cookie", `Auth=${JSON.stringify(cookie.Auth)}; path=/`);
  header.append(
    "Set-Cookie",
    `Emails=${JSON.stringify(cookie.Emails)}; path=/`,
  );

  return header;
};
