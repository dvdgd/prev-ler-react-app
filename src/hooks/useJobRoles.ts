import { JobRoleRepositorySupabase } from "@adapters/supabase/JobRoleRepositorySupabase";
import { useQuery } from "@tanstack/react-query";

export function useJobRoles() {
  const jobRoleService = new JobRoleRepositorySupabase();
  const { data: jobRoles, isPending } = useQuery({
    queryKey: ["company", "jobroles"],
    queryFn: jobRoleService.getAllJobsRoles
  });

  return {
    isLoading: isPending,
    jobRoles: jobRoles || [],
  }
}