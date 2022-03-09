import { IErrorMessage } from "./IMessage"

export interface IAuth {
  user: IUser | false
  accessToken: string | null
  signIn: (
    email: string,
    password: string,
    callback: (err?: ILoginFailDTO & { status: number }) => void
  ) => Promise<void>
  signOut: (callback?: (err?: IErrorMessage) => {}) => void
  register: (
    username: string,
    email: string,
    password: string,
    callback: (err?: IRegisterFailDTO & { status: number }) => void
  ) => Promise<void>
}

export interface IToken {
  exp: number
  iat: number
  jti: string
  token_type: string
  user_id: number
  username: string
}

export interface ILoginSuccessDTO {
  access: string
  refresh: string
}

export interface IRegisterFailDTO {
  username?: string
  email?: string
  password?: string
}

export interface ILoginFailDTO {
  detail: string
}

export interface IUser {
  username: string
  id: number
}
