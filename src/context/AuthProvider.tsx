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
    setIsLoading(false);
  }, [userSession]);

  useEffect(() => {
    const userSessionStr = localStorage.getItem("@userSession");
    if (!userSessionStr) return;

    const userSession = JSON.parse(userSessionStr) as TUserSession;

    if (userSession?.session?.access_token) {
      setUserSession(userSession);
    }
  }, []);

  const setUserSession = (userSession: TUserSession | undefined) => {
    if (!userSession?.session?.access_token) {
      return logout();
    }

    setIsLoading(true);
    supabaseClient.auth.setSession(userSession.session).then(({ data }) => {
      if (!data.session?.access_token) {
        return setStateSession(undefined);
      }

      userSession.session = data.session;
      localStorage.setItem("@userSession", JSON.stringify(userSession));
      setStateSession(userSession);
    });
  };

  const logout = async () => {
    await supabaseClient.auth.signOut();
    localStorage.removeItem("@userSession");
    setStateSession(undefined);
  };

  const login = async (props: TLoginBody) => {
    const session = await authService.login(props);
    setUserSession(session);
    return session;
  };

  const signUp = async (props: TSignUpBody) => {
    const session = await authService.signUp(props);
    setUserSession(session);
    return session;
  };

  return (
    <CurrentUserContext.Provider
      value={{ userSession, login, logout, signUp, setUserSession, isLoading }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
