import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { getSubscriptionStatusText } from "@shared/functions/SubscriptionStatusMap";
import { TSubscription } from "types/subscription";

type SubscriptionModalProps = {
  subscription: TSubscription
}

export function SubscriptionModal({ subscription }: SubscriptionModalProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const plan = subscription.plan;

  const subscriptionStatusText = getSubscriptionStatusText(subscription.status);
  const periodicyText = plan?.periodicy === "mensais" ? "mês" : "anual";
  return (
    <>
      <Button size={"md"} onClick={onOpen}>
        Detalhes da assinatura
      </Button>

      <Modal isCentered size="xs" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(9px)" />
        <ModalContent>
          <ModalHeader>Assinatura {subscription.subscriptionId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} alignItems={"flex-start"}>
              <Box>
                <Text fontWeight={"medium"}>Informações da assinatura:</Text>
                <Text>Inicio: {subscription.startDate?.toLocaleDateString()}</Text>
                <Text>Expiração: {subscription.expirationDate?.toLocaleDateString() || "--"}</Text>
                <Text>Data fim: {subscription.endDate?.toLocaleDateString() || "--"}</Text>
                <Text>Status: {subscriptionStatusText}</Text>
              </Box>
              <Box>
                <Text fontWeight={"medium"}>Plano assinado:</Text>
                <Text>{plan?.title} - Até {plan?.maxUsers} usuários</Text>
                <Text>R$ {plan?.value}/{periodicyText}</Text>
                <Text>{plan?.active ? "Ativo" : "Inativo"}</Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}