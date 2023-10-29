import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  IconButtonProps,
  Modal,
  ModalBody,
  Text,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useShowToastErrorHandler } from "../../hooks/useShowToastErrorHandler";

type DeleteIconProps = {
  deleteFn: () => Promise<void>;
} & IconButtonProps;

export function DeleteIconAction({ deleteFn, ...props }: DeleteIconProps) {
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
      <IconButton
        icon={<DeleteIcon />}
        color={"red.600"}
        onClick={onOpen}
        cursor="pointer"
        {...props}
      />

      <Modal isCentered size="xs" isOpen={isOpen} onClose={onClose}>
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
              colorScheme="brand"
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
