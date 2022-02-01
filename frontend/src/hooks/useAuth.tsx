import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../utils/constants";
import {
  IAuth,
  ILoginFailDTO,
  ILoginSuccessDTO,
  IToken,
  IUser,
} from "../interfaces/Iauth";

const authContext = createContext<IAuth>({
  user: false,
  accessToken: null,
  register: async (username, email, password) => {},
  signOut: () => {},
  signIn: async (email, password) => {},
});

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = (): IAuth => {
  const [user, setUser] = useState<IUser | false>(false);
  const [access, setAccess] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<string | null>(null);

  const handleLoginUser = (data: ILoginSuccessDTO) => {
    const tokenDetails: IToken = jwt_decode(data.access);
    setAccess(data.access);
    setRefresh(data.refresh);
    setUser({
      username: tokenDetails.username,
      id: tokenDetails.user_id,
    });
  };
  const handleLoginError = (data: ILoginFailDTO, response: Response) => {
    console.log("status", response.status);
    console.log("error message", data.detail);
    setUser(false);
  };
  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(LOGIN_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const data: ILoginSuccessDTO = await response.json();
        handleLoginUser(data);
      } else {
        const error: ILoginFailDTO = await response.json();
        handleLoginError(error, response);
      }
    } catch (error) {
      console.error(error);
      signOut();
    }
  };
  const signOut = () => {
    setUser(false);
    setAccess(null);
    setRefresh(null);
  };
  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch(REGISTER_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (response.ok) {
        const data: ILoginSuccessDTO = await response.json();
        handleLoginUser(data);
      } else {
        const error: ILoginFailDTO = await response.json();
        handleLoginError(error, response);
      }
    } catch (error) {
      console.error(error);
      signOut();
    }
  };

  return {
    user,
    accessToken: access,
    signIn,
    signOut,
    register,
  };
};
