import { UseToastOptions, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TCompany } from "../../../../@types/company";
import { useAuth } from "../../../../hooks/useCurrentUser";
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler";
import { CompanyService } from "../../../../shared/services/CompanyService";

export function useCompanyForm() {
  const toast = useToast();
  const navigate = useNavigate();

  const { userSession, setUserSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm<TCompany>();
  const { showErrorToast } = useShowToastErrorHandler();

  const toastErrorAttributes: UseToastOptions = {
    title: "Erro ao salvar",
    description: "Não foi possível recuperar a sessão do usuario, tente novamente mais tarde.",
    status: "error",
    duration: 5000,
    isClosable: true
  };

  const handleNewCompany: SubmitHandler<TCompany> = async (formAttributes) => {
    try {
      setIsLoading(true);
      if (!userSession?.user?.id) {
        return toast(toastErrorAttributes);
      }

      const companyService = new CompanyService();
      const newCompany = await companyService.create(formAttributes, userSession?.user?.id);
      const user = Object.assign({}, {
        ...userSession,
        user: {
          ...userSession.user,
          company: newCompany
        },
      });
      setUserSession(user);

      toast({
        title: "Cadastro concluído.",
        description: "Você se associou como representate da empresa " + newCompany?.fantasyName,
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      navigate("/check/login");
    } catch (error) {
      toast.closeAll();
      showErrorToast({
        error,
        toastAttributes: toastErrorAttributes
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    register,
    handleSubmit,
    setValue,
    getValues,
    handleNewCompany,
  }
}
