import { useQuery } from "@tanstack/react-query";
import { container } from "tsyringe";
import { IJobRolePort } from "@core/ports/job-role.port";

export function useJobRoles() {
  const { data: jobRoles, isPending } = useQuery({
    queryKey: ["company", "jobroles"],
    queryFn: () => container.resolve<IJobRolePort>("JobRoleRepository").getAllJobsRoles()
  });

  return {
    isLoading: isPending,
    jobRoles: jobRoles || [],
  }
}