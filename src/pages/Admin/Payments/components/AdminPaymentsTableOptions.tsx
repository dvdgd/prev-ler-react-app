import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { Center, HStack, UseToastOptions, useToast } from "@chakra-ui/react"
import { queryClient } from "@config/tanStackQueryClient"
import { useShowToastErrorHandler } from "@hooks/useShowToastErrorHandler"
import { MyIconButton } from "@shared/components/MyIconButton"
import { container } from "tsyringe";
import { IPaymentPort } from "@core/ports/payment.port";
import { useMutation } from "@tanstack/react-query"
import { EPaymentStatus, TPayment } from "@core/entities/payment"

type AdminPaymentTableOptionsProps = {
  payment: TPayment
}

export function AdminPaymentTableOptions({ payment }: AdminPaymentTableOptionsProps) {
  const { showErrorToast } = useShowToastErrorHandler();
  const toast = useToast();
  const paymentService = container.resolve<IPaymentPort>("PaymentRepository");

  const baseErrorToast: UseToastOptions = {
    status: "error",
    duration: 3000,
    isClosable: true
  }
  const baseSuccessToast: UseToastOptions = {
    status: "info",
    duration: 3000,
    isClosable: true
  }

  const recognizeMutation = useMutation({
    mutationFn: () => paymentService.recognizeCompanyPayment(payment.paymentId || 0),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"]
      });
      queryClient.invalidateQueries({
        queryKey: ["company", "subscriptions"]
      });
      toast({
        ...baseSuccessToast,
        title: "Pagamento aprovado",
        description: `O pagamento no valor de ${payment.value} foi aprovado com sucesso.`
      });
    },
    onError: (error) => {
      showErrorToast({
        error,
        toastAttributes: {
          ...baseErrorToast,
          title: "Não foi possível aprovar o pagamento",
          description: `Ocorreu um erro inesperado ao aprovar o pagamento #${payment.paymentId} no valor de R$ ${payment.value}`
        }
      });
    }
  });

  const contestMutation = useMutation({
    mutationFn: () => paymentService.contestCompanyPayment(payment.paymentId || 0),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments",]
      });
      queryClient.invalidateQueries({
        queryKey: ["company", "subscriptions"]
      });
      toast({
        ...baseSuccessToast,
        title: "Pagamento contestado",
        description: `O pagamento da empresa ${payment.subscription?.company?.fantasyName} de valor de R$ ${payment.value} foi contestado.`,
      });
    },
    onError: (error) => {
      showErrorToast({
        error,
        toastAttributes: {
          ...baseErrorToast,
          title: "Não foi possível contestar o pagamento",
          description: `Ocorreu um erro inesperado ao contestar o pagamento #${payment.paymentId} no valor de R$ ${payment.value}`
        }
      });
    }
  });

  return (
    <>
      <Center>
        <HStack alignContent={"space-around"} paddingX={3}>
          <MyIconButton
            buttonFn={recognizeMutation.mutate}
            isLoading={recognizeMutation.isPending}
            isDisabled={payment.status !== EPaymentStatus.processing}
            icon={<CheckIcon />}
            color={"green.600"}
            aria-label="Reconhecer pagamento"
          >
            Aprovar
          </MyIconButton>
          <MyIconButton
            buttonFn={contestMutation.mutate}
            isLoading={contestMutation.isPending}
            isDisabled={payment.status !== EPaymentStatus.processing}
            icon={<CloseIcon />}
            color={"red.600"}
            aria-label="Contestar Pagamento"
          >
            Recusar
          </MyIconButton>
        </HStack>
      </Center>
    </>
  )
}