import { JobRoleService } from "@shared/services/JobRoleService";
import { useQuery } from "@tanstack/react-query";

export function useJobRoles() {
  const jobRoleService = new JobRoleService();
  const { data: jobRoles, isPending } = useQuery({
    queryKey: ["company", "jobrole"],
    queryFn: jobRoleService.getAllJobsRoles
  });

  return {
    isLoading: isPending,
    jobRoles: jobRoles || [],
  }
}