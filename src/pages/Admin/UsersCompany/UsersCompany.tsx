import { useQueryParams } from "@hooks/useQueryParams";
import { TableCard } from "@shared/components/Card/TableCard";
import { formatCnpj } from "@shared/functions/Formatters";
import { Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { useSearchParams } from "react-router-dom";
import { TUserProfile } from "types/profile";
import { useUsersCompany } from "./hooks/useUsersCompany";

export function UsersCompany() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useQueryParams();
  const queryText = query.get('complete-onboarding')
  const filterQuery = queryText ? JSON.parse(queryText) : undefined;

  const columns = (): ColumnsType<TUserProfile> => {
    return [
      {
        title: "# ID",
        dataIndex: "userId",
        key: "userId",
        width: 110,
        fixed: true,
        render(_value, { userId }) {
          const userIdText = userId?.split('-');
          return <>{userIdText?.at(0)} ... {userIdText?.at(4)}</>;
        },
      },
      {
        title: "E-mail",
        dataIndex: "email",
        key: "email",
        width: 80,
      },
      {
        title: "Nome Completo",
        dataIndex: "fullname",
        key: "fullname",
        width: 80,
        responsive: ["xl"],
        render: (_value, { firstName, lastName }) => {
          const fullname = firstName + " " + lastName;
          return fullname;
        }
      },
      {
        title: "Data Cadastro",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 50,
        render: (_value, { createdAt }) => {
          return createdAt?.toLocaleDateString();
        }
      },
      {
        title: "CNPJ",
        dataIndex: "idCompany",
        key: "idCompany",
        filteredValue: filterQuery != undefined ? [Boolean(filterQuery)] : undefined,
        width: 60,
        filterMultiple: false,
        filters: [
          {
            text: 'Cadastrado',
            value: true,
          },
          {
            text: 'Não Cadastrado',
            value: false,
          }
        ],
        onFilter: (value, record) => {
          if (value) {
            return !!record.idCompany;
          }
          return !record.idCompany;
        },
        render: (_value, { idCompany }) => {
          return idCompany ? formatCnpj(idCompany) : null;
        }
      }
    ];
  };

  const { data, isLoading } = useUsersCompany();
  const onTableChange: TableProps<TUserProfile>['onChange'] = (_pagination, filters) => {
    if (!Array.isArray(filters.idCompany)) {
      searchParams.delete('complete-onboarding');
      setSearchParams(searchParams);
      return;
    }

    const filter = filters.idCompany?.at(0);
    setSearchParams({ 'complete-onboarding': filter ? 'true' : 'false' });
  }

  return (
    <>
      <TableCard title="Usuários representantes">
        <Table
          loading={isLoading}
          dataSource={data}
          columns={columns()}
          rowKey="userId"
          scroll={{ x: 800, y: 300 }}
          bordered
          onChange={onTableChange}
          pagination={{
            pageSize: 5,
            position: ["bottomRight"],
          }}
        />
      </TableCard>
    </>
  )
}