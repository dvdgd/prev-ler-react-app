import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TCompany } from "../../../../@types/company";
import { useCompany } from "../hooks/useCompany";

const columns = (): ColumnsType<TCompany> => {
  return [
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      key: "cnpj",
      width: 55,
      fixed: true,
      render: (_value, record) => {
        const maskedCnpj = record.cnpj.replace(/\D+/g, '')
          .replace(/(\d{2})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1/$2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1')
        return (
          <>
            {maskedCnpj}
          </>
        )
      },
    },
    {
      title: "Nome Fantasia",
      dataIndex: "fantasyName",
      key: "fantasyName",
      width: 55,
      fixed: true,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      width: 55,
    },
    {
      title: "Contato",
      width: 55,
      render: (_value, company) => {
        const { ddd, number } = company.phone;
        return (
          <>
            ({ddd}) {number}
          </>
        )
      }
    }
  ]
}

export function AdminCompanyTableAntd() {
  const { isLoading, allCompanies } = useCompany();

  return (
    <>
      <Table
        scroll={{
          x: 800,
          y: 300,
        }}
        bordered={true}
        loading={isLoading}
        dataSource={allCompanies}
        columns={columns()}
        rowKey="planId"
        pagination={{
          position: ["none"],
        }}
      />
    </>
  )
}
