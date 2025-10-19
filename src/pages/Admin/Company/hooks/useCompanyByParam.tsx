
import { CompanyRepositorySupabase } from "@adapters/supabase/CompanyRepositorySupabase";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useCompanyByParam() {
  const companyService = new CompanyRepositorySupabase();
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
