import { useToast } from "@chakra-ui/react";
import { queryClient } from "@config/tanStackQueryClient";
import { useAuth } from "@hooks/useCurrentUser";
import { useShowToastErrorHandler } from "@hooks/useShowToastErrorHandler";
import { CompanyUserService } from "@shared/services/CompanyUserService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { TCompanyUser } from "types/company-user";

type TCompanyUserForm = TCompanyUser

export function useCompanyUserForm() {
  const { showErrorToast } = useShowToastErrorHandler();
  const toast = useToast();
  const navigate = useNavigate();

  const formMethods = useForm<TCompanyUserForm>();
  const { setValue } = formMethods;
  const { userSession } = useAuth();

  const { userId } = useParams();
  const { data: user, isLoading } = useQuery({
    queryKey: ["company", "users", userId],
    queryFn: () => companyUserService.getUserById(parseInt(userId || "0")),
  })

  useEffect(() => {
    if (!user || isLoading) return;
    setValue("firstname", user.firstname);
    setValue("lastname", user.lastname);
    setValue("email", user.email);
    setValue("isAuthorized", user.isAuthorized);
    setValue("type", user.type);
    setValue("jobRole.jobRoleId", user.jobRole.jobRoleId);
  }, [user]);

  const companyUserService = new CompanyUserService();
  const createOrUpdateMutation = useMutation({
    mutationFn: async () => {
      const companyId = userSession?.user?.company?.cnpj;
      const userAttributes = formMethods.getValues();
      return await companyUserService.createOrUpdateUser({
        ...userAttributes,
        userId: parseInt(userId || "0"),
        companyId: companyId || "0",
      });
    },
    onSuccess: () => {
      toast.closeAll();
      queryClient.invalidateQueries({ queryKey: ["company", "users"] });
      toast({
        title: "Sucesso",
        description: "O usuário foi salvo com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(-1);
    },
    onError: (error) => {
      showErrorToast({
        error,
        toastAttributes: {
          title: "Erro inesperado",
          description: "Ops.. Desculpe, ocorreu um erro inesperado ao salvar o usuário",
          duration: 3000,
          isClosable: true
        }
      });
    }
  });

  const onSubmit: SubmitHandler<TCompanyUser> = useCallback(
    () => createOrUpdateMutation.mutate(),
    [createOrUpdateMutation]
  );

  return {
    isLoading: createOrUpdateMutation.isPending,
    onFormSubmit: formMethods.handleSubmit(onSubmit),
    formMethods,
  }
}