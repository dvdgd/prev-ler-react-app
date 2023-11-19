import { useToast } from "@chakra-ui/react";
import { useShowToastErrorHandler } from "@hooks/useShowToastErrorHandler";
import { CompanyService } from "@shared/services/CompanyService";
import { useQuery } from "@tanstack/react-query";

const companyService = new CompanyService();

export function useCompany() {
  const toast = useToast();
  const { showErrorToast } = useShowToastErrorHandler();
  const toastErrorId = "getCompanies-error";

  const getCompanies = async () => {
    try {
      return await companyService.getAllCompanies();
    } catch (error) {
      if (!toast.isActive(toastErrorId)) {
        showErrorToast({
          error,
          toastAttributes: {
            id: toastErrorId,
            title: "Erro ao recuperar as informações de empresas",
            description: "Desculpe, tente novamente mais tarde.",
            status: "error",
            isClosable: true,
            duration: 3000,
          }
        });
      }
    }
  }

  const {
    data: allCompanies,
    isLoading
  } = useQuery({
    queryKey: ["company"],
    queryFn: getCompanies,
  });

  return {
    allCompanies,
    isLoading,
  }
}
