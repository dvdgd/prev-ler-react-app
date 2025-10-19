import { TJobRole } from "@core/entities/job-role";

export interface IJobRolePort {
  getAllJobsRoles(): Promise<TJobRole[]>;
  getJobRoleById(jobRoleId: number): Promise<TJobRole>;
  deleteJobroleById(jobRoleId: number): Promise<void>;
  createOrUpdate(jobRole: TJobRole): Promise<void>;
}