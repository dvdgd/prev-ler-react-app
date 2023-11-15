import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { IChildrenProps } from "../@types/react-base-props";
import { TUserSession } from "../@types/user";
import { supabaseClient } from "../config/supabase";
import { TLoginBody, TSignUpBody } from "../shared/services/@types";
import { AuthService } from "../shared/services/AuthService";
import { UserService } from "../shared/services/UserService";

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
  const userService = new UserService();

  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!userSession?.session) return;
      const userProfile = await userService.getUserProfile();
      const newUserSession: TUserSession = {
        session: userSession?.session,
        user: userProfile,
      }
      setUserSession(newUserSession);
    }
  });

  useEffect(() => {
    const userSessionStr = localStorage.getItem("@userSession");
    if (!userSessionStr) return setIsLoading(false);

    const userSession = JSON.parse(userSessionStr) as TUserSession;
    setUserSession(userSession);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUserSession = async (userSession: TUserSession | undefined) => {
    if (!userSession?.session?.access_token) {
      return logout();
    }

    try {
      setIsLoading(true);
      const { data: { session } } = await supabaseClient.auth.setSession(userSession.session);

      if (!session?.access_token) {
        return logout();
      }

      userSession.session = session;
      localStorage.setItem("@userSession", JSON.stringify(userSession));

      setStateSession(userSession);
    } catch (e) {
      console.log('An unexpected error occured in AuthProvider.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("@userSession");
    await supabaseClient.auth.signOut();
    setStateSession(undefined);
    if (isLoading) setIsLoading(false);
  };

  const login = async (props: TLoginBody) => {
    const session = await authService.login(props);
    setUserSession(session);
    if (isLoading) setIsLoading(false);
    return session;
  };

  const signUp = async (props: TSignUpBody) => {
    const session = await authService.signUp(props);
    setUserSession(session);
    if (isLoading) setIsLoading(false);
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
