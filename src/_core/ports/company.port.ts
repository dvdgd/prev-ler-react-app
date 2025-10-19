import { TCompany } from "@core/entities/company";
import { TCompanyUser } from "@core/entities/company-user";

export interface ICompanyPort {
  create(company: TCompany, userId: string, planId: number): Promise<TCompany>;
  getAllCompanies(): Promise<TCompany[]>;
  getCompanyById(companyId: string): Promise<TCompany>;
  getCompanyUsers(): Promise<TCompanyUser[]>;
}