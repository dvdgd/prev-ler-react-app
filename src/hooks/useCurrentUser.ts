import { useContext } from "react";
import { CurrentUserContext } from "../context/AuthProvider";

export const useCurrentUser = () => useContext(CurrentUserContext)
