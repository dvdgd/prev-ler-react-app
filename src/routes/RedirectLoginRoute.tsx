import { Navigate, Outlet } from "react-router-dom";
import { EUserType } from "../@types/profile";
import { TUser } from "../@types/user";
import { useAuth } from "../hooks/useCurrentUser";
import { ReturnTrueIfCompanyComplete } from "../shared/functions/ReturnTrueIfCompanyComplete";

const getRouteRedirectByUserType = (user: TUser | undefined) => {
  const routes = new Map<EUserType | undefined, string>([
    [EUserType.representante, "/auth/company/dashboard"],
    [EUserType.administrador, "/auth/admin/dashboard"],
  ]);

  const userType = user?.profile?.userType;

  if (userType === EUserType.administrador) {
    return routes.get(userType);
  }

  const ableToAccess = ReturnTrueIfCompanyComplete(user);
  if (!ableToAccess) return "/auth/complete-register";

  return routes.get(userType);
}

export const RedirectLoginRoute = () => {
  const { userSession: currentUser } = useAuth();

  const user = currentUser?.user;
  const session = currentUser?.session;

  if (!session?.access_token) {
    return <Outlet />
  }

  const redirectRoute = getRouteRedirectByUserType(user);
  return (
    redirectRoute
      ? <Navigate to={redirectRoute} />
      : <Navigate to="/unauthorized" />
  );
};
