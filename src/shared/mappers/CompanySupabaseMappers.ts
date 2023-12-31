import { TCompany, TCompanySupabaseInsert, TCompanySupabaseRow, TPartialCompany } from "../../@types/company";
import { PartialSubscriptionFromSupabase } from "./SubscriptionSupabaseMapper";
import { PartialUserProfileFromSupabase } from "./UserProfileSupabaseMappers";

export function CompanyToSupabase(company: TCompany): TCompanySupabaseInsert {
  return {
    cep: company.address.cep,
    municipio: company.address.city,
    uf: company.address.uf,
    telefone: company.phone.number,
    ddd: parseInt(company.phone.ddd),
    id_cnpj: company.cnpj.replace(/\D/g, ''),
    razao_social: company.companyName,
    nome_fantasia: company.fantasyName,
    email: company.email,
    data_abertura: company.openAt.toISOString(),
  }
}

export function CompanyFromSupabase(company: TCompanySupabaseRow): TCompany {
  return {
    address: {
      cep: company.cep,
      city: company.municipio,
      uf: company.uf
    },
    phone: {
      number: company.telefone,
      ddd: company.ddd.toString(),
    },
    users: company.profiles?.map((user) => PartialUserProfileFromSupabase(user ?? {})),
    subscriptions: company.assinatura?.map((subscription) => PartialSubscriptionFromSupabase(subscription)),
    cnpj: company.id_cnpj,
    companyName: company.razao_social,
    fantasyName: company.nome_fantasia,
    email: company.email,
    openAt: new Date(company.data_abertura.toString()),
  }
}

export function PartialCompanyFromSupabase(company: Partial<TCompanySupabaseRow> | undefined): TPartialCompany {
  return {
    address: {
      cep: company?.cep,
      city: company?.municipio,
      uf: company?.uf
    },
    phone: {
      number: company?.telefone,
      ddd: company?.ddd?.toString(),
    },
    cnpj: company?.id_cnpj,
    companyName: company?.razao_social,
    fantasyName: company?.nome_fantasia,
    email: company?.email,
    openAt: company?.data_abertura ? new Date(company.data_abertura) : undefined,
  }
}
