import { createContext, useEffect, useState } from "react";
import { TUser } from "../@types/user";

interface AuthProviderAttributes {
  children: React.ReactNode;
}

type TCurrentUserContextValues = {
  currentUser: TUser | undefined;
  setCurrentUser: (T: TUser | undefined) => void;
};

export const CurrentUserContext = createContext(
  {} as TCurrentUserContextValues
);

export const CurrentUserProvider = ({ children }: AuthProviderAttributes) => {
  const [currentUser, setCurrentUser] = useState<TUser>();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
