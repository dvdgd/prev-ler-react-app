import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { Center, HStack, UseToastOptions, useToast } from "@chakra-ui/react"
import { queryClient } from "@config/tanStackQueryClient"
import { useShowToastErrorHandler } from "@hooks/useShowToastErrorHandler"
import { MyIconButton } from "@shared/components/MyIconButton"
import { PaymentService } from "@shared/services/PaymentService"
import { useMutation } from "@tanstack/react-query"
import { TPayment } from "types/payment"

type AdminPaymentTableOptionsProps = {
  payment: TPayment
}

export function AdminPaymentTableOptions({ payment }: AdminPaymentTableOptionsProps) {
  const { showErrorToast } = useShowToastErrorHandler();
  const toast = useToast();

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
    mutationFn: () => new PaymentService().recognizeCompanyPayment(payment.paymentId || 0),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
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
    mutationFn: () => new PaymentService().contestCompanyPayment(payment.paymentId || 0),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
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
            icon={<CheckIcon />}
            color={"green.600"}
            aria-label="Reconhecer pagamento"
          >
            Aprovar
          </MyIconButton>
          <MyIconButton
            buttonFn={contestMutation.mutate}
            isLoading={contestMutation.isPending}
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