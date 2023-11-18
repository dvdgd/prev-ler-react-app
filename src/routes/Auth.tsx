import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useCurrentUser";
import { SplashPage } from "../pages/Splash/SplashPage";

export function Auth() {
  const location = useLocation();
  const { userSession, isLoading } = useAuth();

  if (isLoading) {
    return (
      <>
        <SplashPage />
      </>
    )
  }

  const access_token = userSession?.session?.access_token;
  if (access_token) {
    return <Outlet />
  }

  return <Navigate to="/check/login" state={{ from: location }} replace />
}
