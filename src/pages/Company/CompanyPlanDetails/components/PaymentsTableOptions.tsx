import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { } from "antd";
import { useState } from "react";
import { EPaymentStatus, TPayment } from "../../../../@types/payment";
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler";
import { CheckPaymentButtonAction } from "../../../../shared/components/CheckPaymentButtonAction";
import { ViewIconAction } from "../../../../shared/components/ViewIconAction";
import { PaymentService } from "../../../../shared/services/PaymentService";

type PaymentsModalProps = {
  payment: TPayment;
};

const acceptedStatus = [
  EPaymentStatus.notPaid,
  EPaymentStatus.processing
]

export function PaymentsTableOptions({ payment }: PaymentsModalProps) {
  const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const { showErrorToast } = useShowToastErrorHandler();
  const toast = useToast();
  const [isLoadingNotifyButton, setIsLoadingNotifyButton] = useState(false);


  const handleViewDetails = () => {
    openModal();
  };

  const handleNotifyPayment = async () => {
    if (acceptedStatus.includes(payment.status)) {
      try {
        setIsLoadingNotifyButton(true)
        await new PaymentService().notifyPaymentToAdmin(payment);

      } catch (error) {
        toast.closeAll();
        showErrorToast({
          error,
          toastAttributes: {
            title: "Desculpe, ocorreu um erro interno.",
            description: "Não possivel notificar o pagamento.",
            duration: 3000,
            status: "warning"
          }
        });
      } finally {
        setIsLoadingNotifyButton(false)
      }
    }

  }

  return (
    <>
      <Center>
        <HStack alignContent={"space-around"} paddingX={3}>
          <ViewIconAction
            cursor="pointer"
            aria-label="Detalhes do Pagamento"
            onClick={handleViewDetails}
          />
          <CheckPaymentButtonAction
            cursor="pointer"
            aria-label="Confirmar Pagamento"
            isLoading={isLoadingNotifyButton}
            notifyPaymentFn={handleNotifyPayment}
          />
        </HStack>
      </Center>
      <Modal isCentered size="xs" isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay backdropFilter="blur(9px)" />
        <ModalContent>
          <ModalHeader>
            <VStack w={"full"} align={"flex-start"}>
              <Heading size={"md"} textAlign={"left"}>
                Pagamento Plano
              </Heading>
              <Heading size={"sm"} fontWeight={600} color={"gray.700"}>
                {payment.subscription?.plan?.title}
              </Heading>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} alignItems={"flex-start"}>
              <Box>
                <Text fontWeight={"medium"}>Descrição:</Text>
                <Text>{payment.subscription?.plan?.description}</Text>
              </Box>
              <Box>
                <Text fontWeight={"medium"}>
                  Quantidade máxima de usuários:
                </Text>
                <Text>Até {payment.subscription?.plan?.maxUsers} usuários</Text>
              </Box>
              <Box>
                <Text fontWeight={"medium"}>Valor:</Text>
                <Text>
                  R$ {payment.subscription?.plan?.value} {payment.subscription?.plan?.periodicy}
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal}>Sair</Button>
          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  );
}
