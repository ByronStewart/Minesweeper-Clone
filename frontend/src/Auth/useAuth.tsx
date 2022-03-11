import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import jwt_decode from "jwt-decode"
import {
  LOGIN_ROUTE,
  REFRESH_INTERVAL,
  REFRESH_ROUTE,
  REGISTER_ROUTE,
} from "../utils/constants"
import {
  IAuth,
  ILoginFailDTO,
  ILoginSuccessDTO,
  IRegisterFailDTO,
  IToken,
  IUser,
} from "../interfaces/IAuth"

import { Navigate, Outlet, useLocation } from "react-router-dom"
import { IErrorMessage } from "../interfaces/IMessage"
import { api } from "../services/api/api"

const authContext = createContext<IAuth>({
  user: false,
  accessToken: null,
  register: async () => {},
  signOut: () => {},
  signIn: async () => {},
})

export const RequireAuth = () => {
  const auth = useAuth()
  let location = useLocation()

  if (!auth.user) {
    // redirect to the login page but save the current location from which they were redirected
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <Outlet />
}

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

const useProvideAuth = (): IAuth => {
  const [user, setUser] = useState<IUser | false>(false)
  const [access, setAccess] = useState<string | null>(null)
  const [refresh, setRefresh] = useState<string | null>(null)

  const handleLoginUser = (data: ILoginSuccessDTO) => {
    setAccess(data.access)
    setRefresh(data.refresh)
    localStorage.setItem("access", data.access)
    localStorage.setItem("refresh", data.refresh)
    api.defaults.headers.common["Authorization"] = "Bearer " + data.access
    const tokenDetails: IToken = jwt_decode(data.access)
    setUser({
      username: tokenDetails.username,
      id: tokenDetails.user_id,
    })
  }

  const signIn = async (
    email: string,
    password: string,
    callback: (err?: ILoginFailDTO & { status: number }) => void
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
      })
      if (response.ok) {
        const data: ILoginSuccessDTO = await response.json()
        handleLoginUser(data)
        callback()
      } else {
        const error: ILoginFailDTO = await response.json()
        setUser(false)
        callback({ ...error, status: response.status })
      }
    } catch (error) {
      console.error(error)
      signOut()
      callback({ detail: "something went wrong", status: -1 })
    }
  }

  const signOut = (callback?: (err?: IErrorMessage) => {}) => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    delete api.defaults.headers.common["Authorization"]
    setUser(false)
    setAccess(null)
    setRefresh(null)
    if (callback) {
      callback()
    }
  }

  const register = async (
    username: string,
    email: string,
    password: string,
    callback: (err?: IRegisterFailDTO & { status: number }) => void
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
      })
      if (response.ok) {
        const data: ILoginSuccessDTO = await response.json()
        handleLoginUser(data)
        callback()
      } else {
        const error: IRegisterFailDTO = await response.json()
        //const errorMessage = handleRegisterError(error, response);
        callback({ ...error, status: response.status })
      }
    } catch (error) {
      signOut()
      callback({ status: 500 })
    }
  }

  const refreshTokenFromAPI = useCallback(async (refreshToken: string) => {
    const response = await fetch(REFRESH_ROUTE, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    })
    if (response.ok) {
      const data = await response.json()
      return {
        access: data.access,
        refresh: refreshToken,
      }
    }
    return Promise.reject({ error: "unauthorized" })
  }, [])

  // runs on page load, get the refresh token from local storage and obtain a new access token if exists
  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh")
    let refreshHandler: NodeJS.Timer
    if (refreshToken) {
      const decodedToken: IToken = jwt_decode(refreshToken)
      // if it has not expired we will obtain a new access token and log the user in
      if (decodedToken.exp * 1000 > Date.now()) {
        refreshTokenFromAPI(refreshToken).then((tokens) => {
          handleLoginUser(tokens)
          // set a interval to refresh the access token periodically
          refreshHandler = setInterval(() => {
            refreshTokenFromAPI(refreshToken).then((tokens) =>
              handleLoginUser(tokens)
            )
          }, REFRESH_INTERVAL)
        })
      }
    }
    return () => {
      clearInterval(refreshHandler)
    }
  }, [refreshTokenFromAPI])

  return {
    user,
    accessToken: access,
    signIn,
    signOut,
    register,
  }
}
