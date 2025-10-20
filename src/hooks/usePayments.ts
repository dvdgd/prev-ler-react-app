import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { IPaymentPort } from "@core/ports/payment.port";
import { useShowToastErrorHandler } from "./useShowToastErrorHandler";

export function usePayments() {
  const { showErrorToast } = useShowToastErrorHandler();

  const fetchPaymentsFn = async () => {
    try {
      return await container.resolve<IPaymentPort>("PaymentRepository").getAllPayments();
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
