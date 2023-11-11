import { TPlan } from "../@types/plan";
import { PlanService } from "../shared/services/PlanService";
import { useShowToastErrorHandler } from "./useShowToastErrorHandler";

export function usePlans() {
  const { showErrorToast } = useShowToastErrorHandler();

  const fetchAllPlans = async (): Promise<TPlan[] | undefined> => {
    try {
      const plans = await new PlanService().getAllPlans();
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

  return {
    fetchAllPlans,
  };
}