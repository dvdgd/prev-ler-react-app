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
  useToast,
} from "@chakra-ui/react";
import { queryClient } from "@config/tanStackQueryClient";
import { useShowToastErrorHandler } from "@hooks/useShowToastErrorHandler";
import { DeleteIconAction } from "@shared/components/DeleteIconAction";
import { EditIconAction } from "@shared/components/EditIconAction";
import { ViewIconAction } from "@shared/components/ViewIconAction";
import { PlanService } from "@shared/services/PlanService";
import { useMutation } from "@tanstack/react-query";
import { } from "antd";
import { useNavigate } from "react-router-dom";
import { TPlan } from "types/plan";

type PlansModalProps = {
  plan: TPlan;
};

export function PlansTableOptions({ plan }: PlansModalProps) {
  const { isOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const navigate = useNavigate();
  const { showErrorToast } = useShowToastErrorHandler();
  const toast = useToast();

  const handleViewDetails = () => {
    openModal();
  };

  const deletePlanMutation = useMutation({
    mutationFn: () => new PlanService().deletePlanById(plan.planId || 0),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast({
        title: "Sucesso",
        description: "O plano foi excluído com êxito.",
        status: "success",
        duration: 3000,
        isClosable: true
      });
    },
    onError: (error) => {
      toast.closeAll();
      showErrorToast({
        error,
        toastAttributes: {
          title: "Erro ao excluir plano",
          description: "Ocorreu um erro ao excluir o plano, tente novamente mais tarde",
          status: "error",
          duration: 3000,
          isClosable: true
        }
      })
    }
  });

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
            isLoading={deletePlanMutation.isPending}
            deleteFn={deletePlanMutation.mutate}
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
