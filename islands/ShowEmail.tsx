import { FunctionComponent } from "preact";

import { Email } from "../types.ts";

export const ShowEmail: FunctionComponent<{ email: Email[] }> = ({ email }) => {
  const ems = email;
  return (
    <div class={"home"}>
      {ems.map((em: Email) => {
        return (
          <div>
            <p>From: {em.from}</p>
            <p>To: {em.to}</p>
            <p>Affari: {em.affair}</p>
            <p>Message: {em.message}</p>
            <p>Date: {em.date}</p>
          </div>
        );
      })}
    </div>
  );
};
