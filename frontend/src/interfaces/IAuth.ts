export interface IAuth {
  user: IUser | false;
  accessToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
}

export interface IToken {
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
  username: string;
}

export interface ILoginSuccessDTO {
  access: string;
  refresh: string;
}

export interface ILoginFailDTO {
  detail: string;
}

export interface IUser {
  username: string;
  id: number;
}
