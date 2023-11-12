import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButtonProps,
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
import { useState } from "react";
import { useShowToastErrorHandler } from "../../hooks/useShowToastErrorHandler";
import { MyIconButton } from "./MyIconButton";

type DeleteIconProps = {
  deleteFn: () => Promise<void>;
} & IconButtonProps;

export function DeleteIconAction({ deleteFn, ...props }: DeleteIconProps) {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorToast } = useShowToastErrorHandler();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteFn();
    } catch (error) {
      showErrorToast({
        error,
        toastAttributes: {
          title: "Erro inesperado.",
          description: "Desculpe, não foi possível deletar o plano.",
          status: "error",
          duration: 3000,
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MyIconButton
        icon={<DeleteIcon />}
        color={"red.600"}
        onClick={onOpen}
        cursor="pointer"
        {...props}
      />

      <Modal isCentered size={isLargerThan900 ? "lg" : "xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(9px)" />
        <ModalContent>
          <ModalHeader>Tem certeza?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Essa ação é permanente e pode afetar outras entidades do sistema.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              loadingText="Excluindo..."
              isLoading={isLoading}
              mr={3}
              onClick={handleDelete}
            >
              Continuar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
