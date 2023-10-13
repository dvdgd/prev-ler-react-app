import { Navigate, Outlet } from "react-router-dom";
import { EUserType } from "../@types/profile";
import { useAuth } from "../hooks/useCurrentUser";

const getRouteRedirectByUserType = (userType: EUserType | undefined) => {
  const routes = new Map<EUserType | undefined, string>([
    [EUserType.representante, "/auth/company/dashboard"],
    [EUserType.administrador, "/auth/admin/dashboard"],
  ]);

  return routes.get(userType);
}

export const CheckUserOnboarding = () => {
  const { userSession: currentUser } = useAuth();

  const user = currentUser?.user;
  const session = currentUser?.session;

  if (!session?.access_token) {
    return <Outlet />
  }

  const redirectRoute = getRouteRedirectByUserType(user?.profile.userType);
  return (
    redirectRoute
      ? <Navigate to={redirectRoute} />
      : <Navigate to="/unauthorized" />
  )
};
