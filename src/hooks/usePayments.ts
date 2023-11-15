import { useQuery } from "@tanstack/react-query";
import { PaymentService } from "../shared/services/PaymentService";
import { useShowToastErrorHandler } from "./useShowToastErrorHandler";

export function usePayments() {
  const { showErrorToast } = useShowToastErrorHandler();

  const fetchPaymentsFn = async () => {
    try {
      return await new PaymentService().getAllPayments();
    } catch (error) {
      showErrorToast({
        error, toastAttributes: {
          title: 'Desculpe, ocorreu um erro ao buscar os pagamentos',
          status: 'error',
          duration: 3000,
        }
      });
    }
  }

  const {
    isLoading,
    data: allPayments
  } = useQuery({
    queryKey: ["payments"],
    queryFn: fetchPaymentsFn,
  });

  return {
    allPayments,
    isLoading,
  }
}
