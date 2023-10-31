import {
  Box,
  Button,
  Center,
  HStack,
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
import {} from "antd";
import { useNavigate } from "react-router-dom";
import { TPlan } from "../../../../@types/plan";
import { DeleteIconAction } from "../../../../shared/components/DeleteIconAction";
import { EditIconAction } from "../../../../shared/components/EditIconAction";
import { ViewIconAction } from "../../../../shared/components/ViewIconAction";
import { PlanService } from "../../../../shared/services/PlanService";

type PlansModalProps = {
  plan: TPlan;
};

export function PlansTableOptions({ plan }: PlansModalProps) {
  const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    openModal();
  };

  const handleDelete = async () => {
    if (!plan.planId) return;
    await new PlanService().deletePlanById(plan.planId);
  };

  const handleEdit = () => {
    navigate(`create/${plan.planId}`);
  };

  return (
    <>
      <Center>
        <HStack alignContent={"space-around"} paddingX={3}>
          <ViewIconAction
            cursor="pointer"
            aria-label="Detalhes do Plano"
            onClick={handleViewDetails}
          />
          <EditIconAction
            cursor="pointer"
            aria-label="Editar Plano"
            onClick={handleEdit}
          />
          <DeleteIconAction
            cursor="pointer"
            deleteFn={handleDelete}
            aria-label="Excluir Plano"
          />
        </HStack>
      </Center>
      <Modal isCentered size="xs" isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay backdropFilter="blur(9px)" />
        <ModalContent>
          <ModalHeader>Plano {plan.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} alignItems={"flex-start"}>
              <Box>
                <Text fontWeight={"medium"}>Descrição:</Text>
                <Text>{plan.description}</Text>
              </Box>
              <Box>
                <Text fontWeight={"medium"}>
                  Quantidade máxima de usuários permitidos:
                </Text>
                <Text>Até {plan.maxUsers} usuários</Text>
              </Box>
              <Box>
                <Text fontWeight={"medium"}>Valor:</Text>
                <Text>
                  R$ {plan.value} {plan.periodicy}
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal}>Sair</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
