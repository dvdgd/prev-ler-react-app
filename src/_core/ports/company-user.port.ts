import { TCompanyUser } from "@core/entities/company-user";

export interface ICompanyUserPort {
  getCompanyUsers(): Promise<TCompanyUser[]>;
  getUserById(userId: number): Promise<TCompanyUser>;
  deleteCompanyUser(userId: number): Promise<void>;
  createOrUpdateUser(companyUser: TCompanyUser): Promise<void>;
}
