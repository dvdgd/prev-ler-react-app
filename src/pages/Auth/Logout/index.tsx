import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useCurrentUser";
import { useToast } from "@chakra-ui/react";

export function Logout() {
  const { logout } = useAuth();
  const toast = useToast();

  useEffect(() => {
    logout();
    toast({
      title: "Deslogado",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, []);

  return (
    <Navigate to={"/"} replace />
  )
}
