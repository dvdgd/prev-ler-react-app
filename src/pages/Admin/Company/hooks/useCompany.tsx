import { useToast } from "@chakra-ui/react";
import { useShowToastErrorHandler } from "@hooks/useShowToastErrorHandler";
import { container } from "tsyringe";
import { ICompanyPort } from "@core/ports/company.port";
import { useQuery } from "@tanstack/react-query";


export function useCompany() {
  const toast = useToast();
  const { showErrorToast } = useShowToastErrorHandler();
  const toastErrorId = "getCompanies-error";
  
  const companyService = container.resolve<ICompanyPort>("CompanyRepository");

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
