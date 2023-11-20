import { Center, HStack, useToast } from "@chakra-ui/react";
import { queryClient } from "@config/tanStackQueryClient";
import { useShowToastErrorHandler } from "@hooks/useShowToastErrorHandler";
import { DeleteIconAction } from "@shared/components/DeleteIconAction";
import { EditIconAction } from "@shared/components/EditIconAction";
import { JobRoleService } from "@shared/services/JobRoleService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { TJobRole } from "types/job-role";

type JobRolesTableOptionsProps = { jobRole: TJobRole }

export function JobRolesTableOptions({ jobRole }: JobRolesTableOptionsProps) {
  const { showErrorToast } = useShowToastErrorHandler();
  const toast = useToast();
  const navigate = useNavigate();

  const onEditClick = () => {
    navigate("create/" + jobRole.jobRoleId)
  }

  const jobRoleService = new JobRoleService();
  const deleteJobRoleMutation = useMutation({
    mutationFn: () => jobRoleService.deleteJobroleById(jobRole.jobRoleId || 0),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", "jobroles"] })
      toast({
        title: "Sucesso.",
        description: "O Cargo foi deletado com sucesso.",
        duration: 3000,
        status: "success",
        isClosable: true,
      });
    },
    onError: (error) => {
      showErrorToast({
        error,
        toastAttributes: {
          title: "Erro inesperado",
          description: "Desculpe, ocorreu um erro inesperado.",
          duration: 3000,
          status: "error",
          isClosable: true,
        }
      });
    }
  })

  return (
    <>
      <Center>
        <HStack alignContent={"space-around"} paddingX={3}>
          <EditIconAction
            aria-label={"Editar Cargo"}
            onClick={onEditClick}
          />
          <DeleteIconAction
            isLoading={deleteJobRoleMutation.isPending}
            aria-label={"Excluir Cargo"}
            deleteFn={deleteJobRoleMutation.mutate}
          />
        </HStack>
      </Center>
    </>
  )
}
