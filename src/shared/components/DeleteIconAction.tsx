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
import { MyIconButton } from "./MyIconButton";

type DeleteIconProps = {
  deleteFn: () => any;
} & IconButtonProps;

export function DeleteIconAction({ deleteFn, isLoading, ...props }: DeleteIconProps) {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    deleteFn();
    onClose();
  }

  return (
    <>
      <MyIconButton
        icon={<DeleteIcon />}
        color={"red.600"}
        buttonFn={onOpen}
        isLoading={isLoading}
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
              onClick={onDelete}
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
