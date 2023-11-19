import { getUserTypeText } from "@shared/functions/UserTypeMap";
import { CompanyUserService } from "@shared/services/CompanyUserService";
import { useQuery } from "@tanstack/react-query";
import Table, { ColumnsType } from "antd/es/table";
import { TCompanyUser } from "types/company-user";
import { EUserType } from "types/profile";
import { CompanyUsersTableOptions } from "./CompanyUsersTableOptions";

const columns = (): ColumnsType<TCompanyUser> => {
  return [
    {
      title: "# ID",
      dataIndex: "userId",
      key: "userId",
      width: 60,
      fixed: true,
      render(_value, { userId }) {
        const userIdText = userId.toString().padStart(2, "0");
        return <>{userIdText}</>;
      },
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      width: 120,
    },
    {
      title: "Nome Completo",
      dataIndex: "fullname",
      key: "fullname",
      width: 120,
      responsive: ["xl"],
      render: (_value, { firstname, lastname }) => {
        const fullname = firstname + " " + lastname;
        return fullname;
      }
    },
    {
      title: "Cargo",
      dataIndex: "jobRole",
      key: "jobRole",
      responsive: ["md"],
      width: 120,
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "jobRole",
      width: 120,
      filters: [
        { text: 'Representante', value: EUserType.representante },
        { text: 'Funcionario', value: EUserType.funcionario },
        { text: 'Profissional de Saúde', value: EUserType.profissional_saude },
      ],
      onFilter: (value, { type }) => type === value,
      render: (_value, { type }) => {
        const userTypeText = getUserTypeText(type);
        return (
          <>
            {userTypeText}
          </>
        )
      }
    },
    {
      title: "Situacao",
      dataIndex: "isAuthorized",
      key: "isAuthorized",
      width: 120,
      filters: [
        { text: 'Autorizado', value: true },
        { text: 'Não Autorizado', value: false },
      ],
      onFilter: (value, record: TCompanyUser) => record.isAuthorized === value,
      render: (_value, { isAuthorized }) => {
        return (
          <>{isAuthorized ? "Autorizado" : "Não Autorizado"}</>
        )
      }
    },
    {
      title: "Opções",
      dataIndex: "",
      key: "",
      width: 120,
      render: (_value, user) => {
        return (
          <>
            <CompanyUsersTableOptions userCompany={user} />
          </>
        )
      }
    }
  ];
};

export function CompanyUsersTable() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["company", "users"],
    queryFn: () => new CompanyUserService().getCompanyUsers()
  });

  return (
    <>
      <Table
        loading={isLoading}
        dataSource={users}
        columns={columns()}
        rowKey="userId"
        scroll={{ x: 800, y: 300 }}
        bordered
        pagination={{
          pageSize: 5,
          position: ["bottomRight"],
        }}
      />
    </>
  )
}