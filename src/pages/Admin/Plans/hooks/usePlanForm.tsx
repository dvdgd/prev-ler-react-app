import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TPlan } from "../../../../@types/plan";
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler";
import { PlanService } from "../../../../shared/services/PlanService";


export function usePlanForm() {
  const toast = useToast();
  const { showErrorToast } = useShowToastErrorHandler();
  const [isLoading, setIsLoading] = useState(false);

  const formMethods = useForm<TPlan>();

  const toastErrorAttributes: UseToastOptions = {
    title: "Erro ao salvar",
    description: "Não foi possível recuperar a sessão do usuario, tente novamente mais tarde.",
    status: "error",
    duration: 5000,
    isClosable: true
  };

  const handleFormSubmit: SubmitHandler<TPlan> = async (formAttributes) => {
    try {
      setIsLoading(true);
      await new PlanService().createNewPlan(formAttributes);
      toast({
        title: "Plano cadastrado com sucesso.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast.closeAll();
      showErrorToast({
        error,
        toastAttributes: toastErrorAttributes
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    onFormSubmit: formMethods.handleSubmit(handleFormSubmit),
    formMethods,
  }
}
