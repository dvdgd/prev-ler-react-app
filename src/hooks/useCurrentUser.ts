import { useContext } from "react";
import { CurrentUserContext } from "../context/AuthProvider";

export const useAuth = () => useContext(CurrentUserContext)
