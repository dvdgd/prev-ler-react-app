import { UseToastOptions, useToast } from "@chakra-ui/react";
import { queryClient } from "@config/tanStackQueryClient";
import { useAuth } from "@hooks/useCurrentUser";
import { useShowToastErrorHandler } from "@hooks/useShowToastErrorHandler";
import { CompanyService } from "@shared/services/CompanyService";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TCompany } from "types/company";

export type TCompanyCreateForm = TCompany & { planId: number }

export function useCompanyForm() {
  const toast = useToast();
  const navigate = useNavigate();

  const { userSession } = useAuth();
  const { register, handleSubmit, setValue, getValues, control } = useForm<TCompanyCreateForm>();
  const { showErrorToast } = useShowToastErrorHandler();

  const toastErrorAttributes: UseToastOptions = {
    title: "Erro ao salvar",
    description: "Não foi possível recuperar a sessão do usuario, tente novamente mais tarde.",
    status: "error",
    duration: 5000,
    isClosable: true
  };

  const mutation = useMutation({
    mutationFn: async () => {
      if (!userSession?.user?.id) {
        toast(toastErrorAttributes);
        return;
      }

      const formValues = getValues();
      const newCompany = await new CompanyService().create(
        formValues,
        userSession?.user?.id,
        formValues.planId
      );
      return newCompany;
    },
    onSuccess: (newCompany) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Cadastro concluído.",
        description: "Você se associou como representate da empresa " + newCompany?.fantasyName,
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      navigate("/check/login");
    },
    onError: (error) => {
      toast.closeAll();
      showErrorToast({
        error,
        toastAttributes: toastErrorAttributes
      });
    }
  });

  const handleNewCompany = useCallback(
    () => mutation.mutate(),
    [mutation],
  );

  return {
    control,
    isLoading: mutation.isPending,
    register,
    handleSubmit,
    setValue,
    getValues,
    handleNewCompany,
  }
}
