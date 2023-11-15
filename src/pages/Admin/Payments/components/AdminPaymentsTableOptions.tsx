import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { Center, HStack, UseToastOptions, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { TPayment } from "../../../../@types/payment"
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler"
import { MyIconButton } from "../../../../shared/components/MyIconButton"
import { PaymentService } from "../../../../shared/services/PaymentService"

type AdminPaymentTableOptionsProps = {
  payment: TPayment
}

export function AdminPaymentTableOptions({ payment }: AdminPaymentTableOptionsProps) {
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isContestLoading, setIsContestLoading] = useState(false);
  const { showErrorToast } = useShowToastErrorHandler();
  const toast = useToast();

  const baseErrorToast: UseToastOptions = {
    status: "error",
    duration: 3000,
    isClosable: true
  }
  const baseSuccessToast: UseToastOptions = {
    status: "success",
    duration: 3000,
    isClosable: true
  }

  const onRecognizeClick = async () => {
    try {
      setIsApproveLoading(true);
      await new PaymentService().recognizeCompanyPayment(payment.paymentId || 0);
      toast({
        ...baseSuccessToast,
        title: "Pagamento aprovado",
      });
    } catch (error) {
      showErrorToast({
        error,
        toastAttributes: {
          ...baseErrorToast,
          title: "Não foi possível aprovar o pagamento",
        }
      })
    } finally {
      setIsApproveLoading(false)
    }
  }

  const onContestClick = async () => {
    try {
      setIsContestLoading(true);
      await new PaymentService().contestCompanyPayment(payment.paymentId || 0);
      toast({
        ...baseSuccessToast,
        title: "Pagamento contestado",
      });
    } catch (error) {
      showErrorToast({
        error,
        toastAttributes: {
          ...baseErrorToast,
          title: "Não foi possível contestar o pagamento",
        }
      });
    } finally {
      setIsContestLoading(false);
    }
  }

  return (
    <>
      <Center>
        <HStack alignContent={"space-around"} paddingX={3}>
          <MyIconButton
            onClick={onRecognizeClick}
            isLoading={isApproveLoading}
            icon={<CheckIcon />}
            color={"green.600"}
            aria-label="Reconhecer pagamento"
          >
            Aprovar
          </MyIconButton>
          <MyIconButton
            onClick={onContestClick}
            isLoading={isContestLoading}
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