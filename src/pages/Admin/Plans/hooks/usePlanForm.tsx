import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { TPlan } from "../../../../@types/plan";
import { queryClient } from "../../../../config/tanStackQueryClient";
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler";
import { PlanService } from "../../../../shared/services/PlanService";

export type TCreatePlanForm = Omit<TPlan, "createdAt" | "endDate">

export function usePlanForm() {
  const formMethods = useForm<TCreatePlanForm>();
  const toast = useToast();
  const { showErrorToast } = useShowToastErrorHandler();

  const { idPlan: idPlanParam } = useParams();
  const planId = parseInt(idPlanParam ?? '0');
  const { data: plan, isLoading } = useQuery({
    queryKey: ["plans", planId],
    queryFn: () => new PlanService().getPlanById(planId),
  })

  useEffect(() => {
    if (!plan || isLoading) return;
    const { setValue } = formMethods;
    setValue("title", plan.title);
    setValue("active", plan.active);
    setValue("description", plan.description);
    setValue("maxUsers", plan.maxUsers);
    setValue("periodicy", plan.periodicy);
    setValue("value", plan.value);
  }, [isLoading])

  const mutation = useMutation({
    mutationFn: () => {
      const formValues = formMethods.getValues();
      return new PlanService().createNewPlan({
        ...formValues,
        planId,
        createdAt: new Date(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      toast({
        title: `Plano ${planId ? "atualizado" : "cadastrado"} com sucesso.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast.closeAll();
      showErrorToast({
        error,
        toastAttributes: {
          title: "Erro ao salvar",
          description: "Não foi possível recuperar a sessão do usuario, tente novamente mais tarde.",
          status: "error",
          duration: 5000,
          isClosable: true
        }
      });
    },
  });

  const onSubmit: SubmitHandler<TCreatePlanForm> = useCallback(
    () => mutation.mutate(),
    [mutation]
  );

  return {
    isLoading: mutation.isPending,
    onFormSubmit: formMethods.handleSubmit(onSubmit),
    formMethods,
  }
}
