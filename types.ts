export type Cookie_Obj = {
  Users: User[];
  Auth: Auth;
  Emails: Email[];
};

export type User = {
  email: string;
  pass: string;
};
export type Auth = {
  email: string;
  auth: boolean;
};

export type Email = {
  id: number;
  to: string;
  from: string;
  affair: string;
  message: string;
  date: Date;
};
