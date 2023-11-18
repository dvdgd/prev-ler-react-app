
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CompanyService } from "../../../../shared/services/CompanyService";

export function useCompanyByParam() {
  const companyService = new CompanyService();
  const { companyId } = useParams();

  const {
    data: company,
    isLoading
  } = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => companyService.getCompanyById(companyId || "")
  });

  return {
    company,
    isLoading
  }
}
