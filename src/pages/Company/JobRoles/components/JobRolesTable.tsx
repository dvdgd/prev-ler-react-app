import { useJobRoles } from "@hooks/useJobRoles";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { TJobRole } from "types/job-role";
import { JobRolesTableOptions } from "./JobRolesTableOptions";

const columns = (): ColumnsType<TJobRole> => {
  return [
    {
      title: "# ID",
      dataIndex: "planId",
      key: "planId",
      width: 55,
      fixed: true,
      render(_value, record) {
        const planId = record.jobRoleId?.toString().padStart(2, "0");
        return <>{planId}</>;
      },
    },
    {
      title: "Cargo",
      dataIndex: "jobName",
      key: "jobName",
      width: 55,
    },
    {
      title: "Opções",
      dataIndex: "",
      key: "",
      width: 55,
      render: (_value, jobRole) => {
        return (
          <>
            <JobRolesTableOptions jobRole={jobRole} />
          </>
        )
      }
    }
  ];
};


export function JobRolesTable() {
  const {
    jobRoles,
    isLoading
  } = useJobRoles();

  return (
    <>
      <Table
        scroll={{
          x: 800,
          y: 300,
        }}
        bordered={true}
        loading={isLoading}
        dataSource={jobRoles}
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
