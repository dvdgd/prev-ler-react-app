import { UseToastOptions, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EUserType } from "../../../../@types/profile";
import { useAuth } from "../../../../hooks/useCurrentUser";
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler";

interface IFormSignUpInputs {
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
  };
}

export function useSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { signUp } = useAuth();
  const { register, handleSubmit } = useForm<IFormSignUpInputs>();

  const toast = useToast();
  const { showErrorToast } = useShowToastErrorHandler();
  const navigate = useNavigate();

  const toastErrorAttributes: UseToastOptions = {
    title: "Usuario não encontrado",
    description: "O usuário não existe os as credencias estão incorretas.",
    status: "error",
    duration: 5000,
    isClosable: true,
  };

  const onFormSubmit = async (formAttributes: IFormSignUpInputs) => {
    try {
      setIsLoading(true);
      await signUp({
        email: formAttributes.email,
        password: formAttributes.password,
        profile: {
          ...formAttributes.profile,
          userType: EUserType.representante,
        },
      });

      toast({
        title: "Cadastrado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/check/login");
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
    handleSubmit,
    isLoading,
    register,
    onFormSubmit,
  };
}
