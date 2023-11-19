import { UseToastOptions, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useCurrentUser";
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler";

interface IFormLoginInputs {
  email: string;
  password: string;
}

export function useLogin() {
  const toast = useToast();
  const { register, handleSubmit, ...rest } = useForm<IFormLoginInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showErrorToast } = useShowToastErrorHandler();

  const toastErrorAttributes: UseToastOptions = {
    title: "Usuario não encontrado",
    description: "O usuário não existe ou as credencias estão incorretas.",
    status: "error",
    duration: 5000,
    isClosable: true,
  };

  const onFormSubmit = async (loginFormAttributes: IFormLoginInputs) => {
    try {
      setIsLoading(true);
      const userSession = await login(loginFormAttributes);
      toast({
        title: "Bem vindo!",
        description:
          "Login efetuado com sucesso, seja bem-vindo " +
          userSession?.user?.profile?.firstName,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      return navigate("/check/login");
    } catch (error) {
      toast.closeAll();
      showErrorToast({
        error,
        toastAttributes: toastErrorAttributes
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onFormSubmit,
    register,
    rest,
    isLoading,
    handleSubmit,
  };
}
