
import { container } from "tsyringe";
import { ICompanyPort } from "@core/ports/company.port";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useCompanyByParam() {
  const companyService = container.resolve<ICompanyPort>("CompanyRepository");
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
