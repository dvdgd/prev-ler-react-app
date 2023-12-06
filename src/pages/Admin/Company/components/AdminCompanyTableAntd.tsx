import { formatCnpj } from "@shared/functions/Formatters";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TCompany } from "types/company";
import { useCompany } from "../hooks/useCompany";
import { AdminCompanyTableOptions } from "./AdminCompanyTableOptions";

const columns = (): ColumnsType<TCompany> => {
  return [
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      key: "cnpj",
      width: 35,
      fixed: true,
      render: (_value, record) => {
        const maskedCnpj = formatCnpj(record.cnpj);
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
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      width: 70,
    },
    {
      title: "Telefone",
      key: "phoneContact",
      dataIndex: "",
      width: 55,
      render: (_value, company) => {
        const { ddd, number } = company.phone;
        return (
          <>
            ({ddd}) {number}
          </>
        )
      }
    },
    {
      title: "Localização",
      key: "location",
      dataIndex: "",
      width: 55,
      render: (_value, company) => {
        const { uf, city } = company.address;
        return (
          <>
            {city} - {uf.toUpperCase()}
          </>
        )
      }
    },
    {
      title: "Opções",
      key: "options",
      dataIndex: "",
      width: 50,
      align: "center",
      render(_value, company) {
        return (
          <>
            <AdminCompanyTableOptions company={company} />
          </>
        )
      },
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
          pageSize: 5,
          position: ["bottomRight"],
        }}
      />
    </>
  )
}
