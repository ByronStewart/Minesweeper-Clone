import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../utils/constants";
import {
  IAuth,
  ILoginFailDTO,
  ILoginSuccessDTO,
  IRegisterFailDTO,
  IToken,
  IUser,
} from "../interfaces/IAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { IErrorMessage } from "../interfaces/IMessage";

const authContext = createContext<IAuth>({
  user: false,
  accessToken: null,
  register: async () => {},
  signOut: () => {},
  signIn: async () => {},
});

export const RequireAuth = () => {
  const auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // redirect to the login page but save the current location from which they were redirected
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

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
    setAccess(data.access);
    setRefresh(data.refresh);
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    const tokenDetails: IToken = jwt_decode(data.access);
    setUser({
      username: tokenDetails.username,
      id: tokenDetails.user_id,
    });
  };

  const handleLoginError = (
    data: ILoginFailDTO,
    response: Response
  ): IErrorMessage => {
    setUser(false);
    return {
      msg: data.detail,
      status: response.status,
    };
  };

  const handleRegisterError = (
    error: IRegisterFailDTO,
    response: Response
  ): IErrorMessage => {
    let msgList = "";
    for (const err in error) {
      msgList += err + ", ";
    }
    return {
      msg: `The following details were not provided: ${msgList}`,
      status: response.status,
    };
  };

  const signIn = async (
    email: string,
    password: string,
    callback: (err?: IErrorMessage) => void
  ) => {
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
        callback();
      } else {
        const error: ILoginFailDTO = await response.json();
        const errorMessage: IErrorMessage = handleLoginError(error, response);
        callback(errorMessage);
      }
    } catch (error) {
      console.error(error);
      signOut();
      callback({ msg: "something went wrong", status: -1 });
    }
  };
  const signOut = (callback?: (err?: IErrorMessage) => {}) => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(false);
    setAccess(null);
    setRefresh(null);
    if (callback) {
      callback();
    }
  };
  const register = async (
    username: string,
    email: string,
    password: string,
    callback: (err?: IErrorMessage) => void
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
        callback();
      } else {
        const error: IRegisterFailDTO = await response.json();
        const errorMessage = handleRegisterError(error, response);
        callback(errorMessage);
      }
    } catch (error) {
      signOut();
      callback({ msg: "something went wrong", status: -1 });
    }
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");
    if (accessToken) {
      const decodedToken: IToken = jwt_decode(accessToken);
      setUser({
        id: decodedToken.user_id,
        username: decodedToken.username,
      });
      setAccess(accessToken);
      setRefresh(refreshToken);
    }
  }, []);

  return {
    user,
    accessToken: access,
    signIn,
    signOut,
    register,
  };
};
