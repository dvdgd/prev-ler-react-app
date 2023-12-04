import { UseToastOptions, useToast } from "@chakra-ui/react";
import { useAuth } from "@hooks/useCurrentUser";
import { useShowToastErrorHandler } from "@hooks/useShowToastErrorHandler";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EUserType } from "types/profile";

interface IFormSignUpInputs {
  email: string;
  password: string;
  profile: {
    cpf: string;
    firstName: string;
    lastName: string;
  };
}

export function useSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { signUp } = useAuth();
  const formMethods = useForm<IFormSignUpInputs>();

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
          email: formAttributes.email,
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
    handleSubmit: formMethods.handleSubmit(onFormSubmit),
    isLoading,
    formMethods,
  };
}
