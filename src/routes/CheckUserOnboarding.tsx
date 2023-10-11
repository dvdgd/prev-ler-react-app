import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";


export const CheckUserOnboarding = () => {
  const { currentUser } = useCurrentUser();
  const location = useLocation();

  return (
    currentUser?.company
      ? <Navigate to="/company/register" state={{ from: location }} replace />
      : <Outlet />
  );
};