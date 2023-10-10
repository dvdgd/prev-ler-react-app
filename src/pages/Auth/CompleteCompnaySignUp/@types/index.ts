export type TFormCompanyInput = {
  fantasyName: string;
  cnpj: string;
  companyName: string;
  cep: string;
  openAt: string;
  ddd: number;
  phoneNumber: string;
  mail: string;
  city: string;
  uf: string;
  email: string;
}

export type TGetCompanyByCnpjHttp = {
  "NOME FANTASIA": string;
  "RAZAO SOCIAL": string;
  "CNPJ": string;
  "STATUS": string;
  "CNAE PRINCIPAL DESCRICAO": string;
  "CNAE PRINCIPAL CODIGO": string;
  "CEP": string;
  "DATA ABERTURA": string;
  "DDD": string;
  "TELEFONE": string;
  "EMAIL": string;
  "TIPO LOGRADOURO": string;
  "LOGRADOURO": string;
  "NUMERO": string;
  "COMPLEMENTO": string;
  "BAIRRO": string;
  "MUNICIPIO": string;
  "UF": string;
}