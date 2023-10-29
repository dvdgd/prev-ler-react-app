import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { } from "antd";
import { useNavigate } from "react-router-dom";
import { TPlan } from "../../../../@types/plan";
import { DeleteIconAction } from "../../../../shared/components/DeleteIconAction";
import { EditIconAction } from "../../../../shared/components/EditIconAction";
import { ViewIconAction } from "../../../../shared/components/ViewIconAction";

type PlansModalProps = {
  plan: TPlan;
}

export function PlansTableOptions({ plan }: PlansModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();

  return (
    <>
      <HStack alignContent={"space-around"} paddingX={3}>
        <ViewIconAction
          color={"brand.600"}
          onClick={() => {
            onOpen();
          }}
          cursor="pointer"
          aria-label={"Detalhes do Plano"}
        />
        <EditIconAction
          color={"blue.600"}
          onClick={() => {
            navigate(`create/${plan.planId}`)
          }}
          cursor="pointer"
          aria-label={"Editar Plano"}
        />
        <DeleteIconAction
          color={"red.600"}
          cursor="pointer"
          onClick={() => { }}
          aria-label={"Excluir Plano"}
        />
      </HStack>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          backdropFilter='blur(9px)'
        />
        <ModalContent>
          <ModalHeader>Plano {plan.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Custom backdrop filters!</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
