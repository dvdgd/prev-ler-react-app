import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";

type CheckPaymentProps = {
  notifyPaymentFn: () => any;
} & ButtonProps;

export function CheckPaymentButtonAction({ notifyPaymentFn, isLoading, ...props }: CheckPaymentProps) {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button color={"green.600"}
        onClick={onOpen}
        cursor="pointer"
        {...props}
        size={"md"}
        textColor={"brand.600"}
      >
        Confirmar pagamento
      </Button>


      <Modal isCentered size={isLargerThan900 ? "lg" : "xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(9px)" />
        <ModalContent>
          <ModalHeader>Confirmação de Pagamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Deseja confirmar este pagamento? Ele será verificado após sua confirmação.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              loadingText="Excluindo..."
              isLoading={isLoading}
              mr={3}
              onClick={notifyPaymentFn}
            >
              Confirmar pagamento
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
