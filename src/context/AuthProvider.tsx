import { createContext, useEffect, useState } from "react";
import { IChildrenProps } from "../@types/react-base-props";
import { TUserSession } from "../@types/user";
import { supabaseClient } from "../config/supabase";
import { ILoginAttributes, Login } from "../shared/services/auth/LoginSerivce";
import { IRegisterUserAttributes, Register } from "../shared/services/auth/RegisterService";

interface TCurrentUserContextValues {
  userSession: TUserSession | undefined;
  login: (props: ILoginAttributes) => Promise<void>;
  register: (props: IRegisterUserAttributes) => Promise<void>;
  logout: () => void;
  setUserSession: (userSession: TUserSession | undefined) => void;
}

export const CurrentUserContext = createContext(
  {} as TCurrentUserContextValues
);

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [userSession, setStateSession] = useState<TUserSession>();

  useEffect(() => {
    const userSessionStr = localStorage.getItem("@userSession");
    if (!userSessionStr) return;

    const userSession = JSON.parse(userSessionStr) as TUserSession;
    setUserSession(userSession);
  }, []);

  const setUserSession = (userSession: TUserSession | undefined) => {
    if (!userSession?.session?.access_token) {
      return logout();
    }

    supabaseClient.auth.setSession(userSession.session);
    localStorage.setItem("@userSession", JSON.stringify(userSession));
    setStateSession(userSession);
  }

  const logout = () => {
    localStorage.removeItem("@userSession");
    supabaseClient.auth.signOut();
    setStateSession(undefined);
  }

  const login = (props: ILoginAttributes) => Login(props).then((session) => setUserSession(session));

  const register = (props: IRegisterUserAttributes) => Register(props).then((session) => setUserSession(session));

  return (
    <CurrentUserContext.Provider value={{ userSession, login, logout, register, setUserSession }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
