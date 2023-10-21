import { UseToastOptions, useToast } from "@chakra-ui/react";
import { BaseError } from "../shared/errors/BaseError";

interface IShowErrorToast {
  error: unknown,
  toastAttributes: UseToastOptions
}

export function useShowToastErrorHandler() {
  const toast = useToast();

  const showErrorToast = ({
    error,
    toastAttributes
  }: IShowErrorToast) => {
    if (error instanceof BaseError) {
      return toast({
        ...toastAttributes,
        title: error.title,
        description: error.descripion,
      });
    }

    return toast(toastAttributes);
  }

  const showInternalServerToast = () => {
    return toast({
      title: "Ops... Ocorreu um erro interno no sistema.",
      description: "Tente novamente mais tarde ou entre em contato com os administradores.",
      status: "error",
      duration: 3000,
    });
  }

  return {
    showErrorToast,
    showInternalServerToast
  };
}
