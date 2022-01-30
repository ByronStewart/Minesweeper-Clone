import { createContext, useContext, useState } from "react";

interface IAuth {
  user: IUser | false;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

interface IUser {
  username: string;
  id: number;
}

const authContext = createContext<IAuth>({
  user: false,
  register: async (email, password) => {},
  signOut: async () => {},
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

  const signIn = async (email: string, password: string) => {
    setUser({
      username: "Billy",
      id: 1,
    });
  };

  const signOut = async () => {
    setUser(false);
  };

  const register = async (email: string, password: string) => {
    setUser({
      username: "Bob",
      id: 2,
    });
  };

  return {
    user,
    signIn,
    signOut,
    register,
  };
};
