import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useCurrentUser";

export function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return (
    <Navigate to={"/"} replace />
  )
}
