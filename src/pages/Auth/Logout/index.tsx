import { Center, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useCurrentUser";

export function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const toast = useToast();
  const toastId = 'logout-toast'

  useEffect(() => {
    logout();
    if (!toast.isActive(toastId)) {
      toast.closeAll();
      toast({
        id: toastId,
        title: "Deslogado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    navigate('/');
  }, [logout, navigate, toast]);

  return (
    <>
      <Center>
        <Text>Deslogando...</Text>
      </Center>
    </>
  )
}
