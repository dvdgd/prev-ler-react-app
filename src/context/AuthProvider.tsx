import { createContext, useEffect, useState } from "react";
import { IChildrenProps } from "../@types/react-base-props";
import { TUserSession } from "../@types/user";
import { supabaseClient } from "../config/supabase";
import { TLoginBody, TSignUpBody } from "../shared/services/@types";
import { AuthService } from "../shared/services/AuthService";

interface TCurrentUserContextValues {
  userSession: TUserSession | undefined;
  isLoading: boolean;
  login: (props: TLoginBody) => Promise<TUserSession>;
  signUp: (props: TSignUpBody) => Promise<TUserSession>;
  logout: () => void;
  setUserSession: (userSession: TUserSession | undefined) => void;
}

export const CurrentUserContext = createContext(
  {} as TCurrentUserContextValues
);

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [userSession, setStateSession] = useState<TUserSession>();
  const [isLoading, setIsLoading] = useState(true);

  const authService = new AuthService();

  useEffect(() => {
    const userSessionStr = localStorage.getItem("@userSession");
    if (!userSessionStr) return;

    const userSession = JSON.parse(userSessionStr) as TUserSession;

    if (userSession?.session?.access_token) {
      supabaseClient.auth.setSession(userSession.session);
      setStateSession(userSession);
    }
    setIsLoading(false);
  }, []);

  const setUserSession = (userSession: TUserSession | undefined) => {
    if (!userSession?.session?.access_token) {
      return logout();
    }

    supabaseClient.auth.setSession(userSession.session);
    localStorage.setItem("@userSession", JSON.stringify(userSession));
    setStateSession(userSession);
    setIsLoading(false);
  }

  const logout = async () => {
    await supabaseClient.auth.signOut();
    localStorage.removeItem("@userSession");
    setStateSession(undefined);
    setIsLoading(false);
  }

  const login = async (props: TLoginBody) => {
    const session = await authService.login(props);
    setUserSession(session);
    setIsLoading(false);
    return session;
  }

  const signUp = async (props: TSignUpBody) => {
    const session = await authService.signUp(props);
    setUserSession(session);
    setIsLoading(false);
    return session;
  }

  return (
    <CurrentUserContext.Provider value={{ userSession, login, logout, signUp, setUserSession, isLoading }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
