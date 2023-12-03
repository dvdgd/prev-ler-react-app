import { BrDateStringToDateInstance } from "@shared/mappers/DatePtBrMapper";
import { UseFormGetValues, UseFormResetField, UseFormSetValue } from "react-hook-form";
import { TCompanyCreateForm } from "./useCompanyForm";

interface IUseGetCompanyApi {
  setValue: UseFormSetValue<TCompanyCreateForm>;
  getValues: UseFormGetValues<TCompanyCreateForm>;
  resetField: UseFormResetField<TCompanyCreateForm>;
}

type TGetCompanyByCnpjHttp = {
  "fantasia": string;
  "nome": string;
  "cnpj": string;
  "status": string;
  "cep": string;
  "abertura": string;
  "telefone": string;
  "email": string;
  "TIPO LOGRADOURO": string;
  "logradouro": string;
  "numero": string;
  "complemento": string;
  "bairro": string;
  "municipio": string;
  "uf": string;
}

export const useGetCompanyApi = ({
  setValue, getValues, resetField
}: IUseGetCompanyApi) => {
  const verifyCnpj = () => {
    const { cnpj } = getValues();
    const cnpjNumber = cnpj.replace(/[^0-9]/g, '');
    return {
      cnpjNumber,
      isLenghtCorrect: cnpjNumber.length === 14
    }
  }

  const getCompanyByCnpjApi = async () => {
    const { cnpjNumber, isLenghtCorrect } = verifyCnpj();
    if (!isLenghtCorrect) return;

    const result = await fetch(`https://receitaws.com.br/v1/cnpj/${cnpjNumber}`, {
      mode: 'no-cors'
    });

    const companyAttributesHttp = await result.json() as TGetCompanyByCnpjHttp;
    if (!companyAttributesHttp?.cnpj) return;

    const openAtText = companyAttributesHttp.abertura;
    const openAt = BrDateStringToDateInstance(openAtText);
    if (openAt)
      isNaN(openAt.getMilliseconds())
        ? resetField('openAt')
        : setValue("openAt", openAt);

    setValue("address.cep", companyAttributesHttp.cep);
    setValue("address.city", companyAttributesHttp.municipio);
    setValue("address.uf", companyAttributesHttp.uf);
    setValue("phone.ddd", parseInt(companyAttributesHttp.telefone.split(' ')[0]));
    setValue("phone.number", companyAttributesHttp.telefone.split(' ')[1]);
    setValue("companyName", companyAttributesHttp.nome);
    setValue("fantasyName", companyAttributesHttp.fantasia);
    setValue("email", companyAttributesHttp.email);
  }

  return {
    getCompanyByCnpjApi
  }
}
