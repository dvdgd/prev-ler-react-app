import { Box, Button, Center, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure, useToast } from "@chakra-ui/react"
import { queryClient } from "@config/tanStackQueryClient"
import { useShowToastErrorHandler } from "@hooks/useShowToastErrorHandler"
import { DeleteIconAction } from "@shared/components/DeleteIconAction"
import { EditIconAction } from "@shared/components/EditIconAction"
import { ViewIconAction } from "@shared/components/ViewIconAction"
import { getUserTypeText } from "@shared/functions/UserTypeMap"
import { CompanyUserService } from "@shared/services/CompanyUserService"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { TCompanyUser } from "types/company-user"

type CompanyUsersTableOptionsProps = {
  userCompany: TCompanyUser
}

export function CompanyUsersTableOptions({ userCompany }: CompanyUsersTableOptionsProps) {
  const modal = useDisclosure();
  const navigate = useNavigate();

  const onEditClick = () => {
    const route = `create/${userCompany.userId}`
    navigate(route);
  }

  const { showErrorToast } = useShowToastErrorHandler();
  const toast = useToast();

  const companyUserService = new CompanyUserService();
  const deleteMutation = useMutation({
    mutationFn: () => companyUserService.deleteCompanyUser(userCompany.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", "users"] });
      toast({
        title: "Sucesso",
        description: "O usuário foi exlcuído com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      showErrorToast({
        error,
        toastAttributes: {
          title: "Ops, um erro inesperado aconteceu.",
          description: "Por favor, tente novamente mais tarde.",
          duration: 3000,
          isClosable: true,
          status: "error"
        }
      })
    },
  })

  return (
    <>
      <Center>
        <HStack alignContent={"space-around"} paddingX={3}>
          <ViewIconAction onClick={modal.onOpen} aria-label={"Visualizar Usuário"} />
          <EditIconAction onClick={onEditClick} aria-label={"Editar Usuário"} />
          <DeleteIconAction
            aria-label={"Excluir Usuário"}
            deleteFn={deleteMutation.mutate}
            isLoading={deleteMutation.isPending}
          />
        </HStack>
      </Center>

      <Modal isCentered size="xs" isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay backdropFilter="blur(9px)" />
        <ModalContent>
          <ModalHeader>Usuário {userCompany.firstname}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} alignItems={"flex-start"}>
              <Box>
                <Text fontWeight={"medium"}>Nome Completo</Text>
                <Text>{userCompany.firstname} {userCompany.lastname}</Text>
              </Box>
              <Box>
                <Text fontWeight={"medium"}>Email</Text>
                <Text>{userCompany.email}</Text>
              </Box>
              <Box>
                <Text fontWeight={"medium"}>Cargo</Text>
                <Text>{userCompany.jobRole.jobName}</Text>
              </Box>
              <Box>
                <Text fontWeight={"medium"}>Tipo</Text>
                <Text>{getUserTypeText(userCompany.type)}</Text>
              </Box>
              <Box>
                <Text fontWeight={"medium"}>Situação</Text>
                <Text>{userCompany.isAuthorized ? "Autorizado" : "Não autorizado"}</Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={modal.onClose}>Sair</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
