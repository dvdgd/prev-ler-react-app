import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface IRequireAuthAttributes {
  allowedRoles: string[];
}

export const RequireAuth = ({ allowedRoles }: IRequireAuthAttributes) => {
  const { currentUser } = useCurrentUser();
  const location = useLocation();

  return (
    allowedRoles.includes(currentUser?.profile.userType || "")
      ? <Outlet />
      : currentUser?.id
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/check/login" state={{ from: location }} replace />
  )
};
