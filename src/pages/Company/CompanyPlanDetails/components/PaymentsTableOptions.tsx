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
} from "@chakra-ui/react";
import { } from "antd";
import { TPayment } from "../../../../@types/payment";
import { ViewIconAction } from "../../../../shared/components/ViewIconAction";

type PaymentsModalProps = {
  payment: TPayment;
};

export function PaymentsTableOptions({ payment }: PaymentsModalProps) {
  const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();

  const handleViewDetails = () => {
    openModal();
  };

  return (
    <>
      <Center>
        <HStack alignContent={"space-around"} paddingX={3}>
          <ViewIconAction
            cursor="pointer"
            aria-label="Detalhes do Pagamento"
            onClick={handleViewDetails}
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
