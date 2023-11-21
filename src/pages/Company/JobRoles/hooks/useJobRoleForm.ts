import { useToast } from "@chakra-ui/react";
import { queryClient } from "@config/tanStackQueryClient";
import { useAuth } from "@hooks/useCurrentUser";
import { useShowToastErrorHandler } from "@hooks/useShowToastErrorHandler";
import { JobRoleService } from "@shared/services/JobRoleService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

type TJobRoleForm = {
  jobName: string;
  companyId: string;
}

export function useJobRoleForm() {
  const { userSession } = useAuth();
  const formMethods = useForm<TJobRoleForm>();

  const jobRoleService = new JobRoleService();

  const { jobRoleId } = useParams();
  const { data: jobRole } = useQuery({
    queryKey: ["company", "jobroles", jobRoleId],
    queryFn: () => jobRoleService.getJobRoleById(parseInt(jobRoleId || "0"))
  })

  const { setValue } = formMethods;
  useEffect(() => {
    if (!jobRole) return;
    setValue("jobName", jobRole.jobName);
  }, [jobRole]);

  const { showErrorToast } = useShowToastErrorHandler();
  const toast = useToast();
  const navigate = useNavigate();

  const createOrUpdateJobRoleMutation = useMutation({
    mutationFn: () => {
      const jobRoleAttributes = formMethods.getValues();
      const companyId = userSession?.user?.company?.cnpj || "0";
      return jobRoleService.createOrUpdate({
        ...jobRoleAttributes,
        companyId,
        jobRoleId: parseInt(jobRoleId || '0'),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", "jobroles"] })
      toast({
        title: "Sucesso",
        description: "O Cargo foi salvo com sucesso.",
        duration: 3000,
        isClosable: true,
        status: "success",
      });
      navigate(-1);
    },
    onError: (error) => {
      showErrorToast({
        error,
        toastAttributes: {
          title: "Erro inesperado",
          description: "Ops.. Desculpe, ocorreu um erro inesperado ao salvar o cargo",
          duration: 3000,
          isClosable: true
        }
      })
    }
  });

  const onSubmit: SubmitHandler<TJobRoleForm> = useCallback(
    () => createOrUpdateJobRoleMutation.mutate(),
    [createOrUpdateJobRoleMutation]
  );

  return {
    isLoading: createOrUpdateJobRoleMutation.isPending,
    onFormSubmit: formMethods.handleSubmit(onSubmit),
    formMethods,
  }

}