import { IPlanPort } from "@core/ports/plan.port";
import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { useShowToastErrorHandler } from "./useShowToastErrorHandler";

export function usePlans() {
  const { showErrorToast } = useShowToastErrorHandler();

  const { isLoading, error, data: allPlans } = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      try {
        const plans = await container.resolve<IPlanPort>('PlanRepository').getAllPlans();
        return plans;
      } catch (error) {
        showErrorToast({
          error,
          toastAttributes: {
            title: "Erro ao buscar informações dos planos.",
            description: "Desculpe, tente novamente mais tarde ou entre em contato com os administradores.",
            status: "error",
            duration: 3000,
            isClosable: true,
          },
        });
      }
    }
  });

  return {
    isLoading,
    error,
    allPlans
  };
}
