import { Navigate, Outlet } from "react-router-dom";
import { EUserType } from "../@types/profile";
import { useAuth } from "../hooks/useCurrentUser";
import { CheckCompanyComplete } from "../shared/functions/CheckCompanyComplete";

const getRouteRedirectByUserType = (userType: EUserType | undefined) => {
  const routes = new Map<EUserType | undefined, string>([
    [EUserType.representante, "/auth/company/dashboard"],
    [EUserType.administrador, "/auth/admin/dashboard"],
  ]);

  return routes.get(userType);
}

export const RedirectLoginRoute = () => {
  const { userSession: currentUser } = useAuth();

  const user = currentUser?.user;
  const session = currentUser?.session;

  if (!session?.access_token) {
    return <Outlet />
  }

  const ableToAccess = CheckCompanyComplete(user);
  if (!ableToAccess) {
    return <Navigate to="/auth/complete-register" />
  }

  const redirectRoute = getRouteRedirectByUserType(user?.profile?.userType);
  return (
    redirectRoute
      ? <Navigate to={redirectRoute} />
      : <Navigate to="/unauthorized" />
  );
};
