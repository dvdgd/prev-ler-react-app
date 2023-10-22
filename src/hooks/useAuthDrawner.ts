import { useContext } from "react";
import { AuthDrawnerContext } from "../context/DrawnerProvider";

export const useAuthDrawner = () => useContext(AuthDrawnerContext);
