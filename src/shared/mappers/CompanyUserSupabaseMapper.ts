import { TCompanyUser, TUserCompanyInsert, TuserCompanyRow } from "../../@types/company-user";
import { EUserType } from "../../@types/profile";
import { JobRoleFromSupabase } from "./JobRoleSupabaseMapper";

export function UserCompanyToSupabase(user: TCompanyUser): TUserCompanyInsert {
  return {
    id_usuario: user.userId || undefined,
    id_empresa: user.companyId,
    id_cargo: user.jobRole.jobRoleId || 0,
    email: user.email,
    primeiro_nome: user.firstname,
    ultimo_nome: user.lastname,
    autorizado: user.isAuthorized,
    tipo: user.type,
  };
}

export function UserCompanyFromSupabase(userCompany: TuserCompanyRow): TCompanyUser {
  return {
    companyId: userCompany.id_empresa,
    jobRole: JobRoleFromSupabase(userCompany.cargo),
    userId: userCompany.id_usuario || 0,
    email: userCompany.email,
    firstname: userCompany.primeiro_nome,
    lastname: userCompany.ultimo_nome,
    isAuthorized: userCompany.autorizado,
    type: userCompany.tipo as EUserType
  };
}
