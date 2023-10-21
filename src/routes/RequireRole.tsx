import { Navigate, Outlet, useLocation } from "react-router-dom";
import { EUserType } from "../@types/profile";
import { useAuth } from "../hooks/useCurrentUser";
import { ReturnTrueIfCompanyComplete } from "../shared/functions/ReturnTrueIfCompanyComplete";
import { Box } from "@chakra-ui/react";
import { Navbar } from "../shared/components/Navbar";

interface IRequireRoleProps {
  allowedRoles: EUserType[];
}

export const RequireRole = ({ allowedRoles }: IRequireRoleProps) => {
  const location = useLocation();
  const { userSession: currentUser } = useAuth();

  const userType = currentUser?.user?.profile?.userType || "";

  if (userType !== EUserType.administrador) {
    const ableToAccess = ReturnTrueIfCompanyComplete(currentUser?.user);
    if (!userType || !ableToAccess) return <Navigate to="/unauthorized" state={{ from: location }} replace />
  }

  const allowedRole = allowedRoles.includes(userType);
  if (!allowedRole) return <Navigate to="/unauthorized" state={{ from: location }} replace />

  return (
    <Box minH="100vh" fontFamily={"Inter"}>
      <Navbar />
      <Outlet />
    </Box>
  );
};
