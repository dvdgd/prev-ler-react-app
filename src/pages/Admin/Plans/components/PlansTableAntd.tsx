import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TPlan } from "../../../../@types/plan";
import { usePlans } from "../../../../hooks/usePlans";
import { PlanActiveToggleButton } from "./PlanActiveToggleButton";
import { PlansTableOptions } from "./PlansTableOptions";

const columns = (): ColumnsType<TPlan> => {
  return [
    {
      title: "# ID",
      dataIndex: "planId",
      key: "planId",
      width: 55,
      fixed: true,
      render(_value, record) {
        const planId = record.planId?.toString().padStart(2, "0");
        return <>{planId}</>;
      },
    },
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
      width: 100,
    },
    {
      title: "Qtd. usuários",
      dataIndex: "maxUsers",
      key: "maxUsers",
      width: 120,
    },
    {
      title: "Periodicidade",
      dataIndex: "periodicy",
      key: "periodicy",
      width: 110,
      render(_value, plan) {
        const periodicy = plan.periodicy === "mensais" ? "Mensal" : "Anual";
        return <>{periodicy}</>;
      },
    },
    {
      title: "Valor",
      dataIndex: "value",
      key: "value",
      width: 100,
      render(_value, { value }) {
        const price = `R$ ${value}`
        return <>{price}</>
      }
    },
    {
      title: "Ativo",
      dataIndex: "active",
      key: "active",
      responsive: ["md"],
      width: 100,
      render(_value, plan) {
        return (
          <>
            <PlanActiveToggleButton plan={plan} />
          </>
        )
      },
    },
    {
      title: "Opções",
      dataIndex: "",
      key: "",
      align: "center",
      width: 150,
      render: (_value, record) => {
        return (
          <>
            <PlansTableOptions plan={record} />
          </>
        );
      },
    },
  ];
};

export const PlansTableAntd = () => {
  const {
    isLoading,
    allPlans
  } = usePlans();

  return (
    <>
      <Table
        scroll={{
          x: 800,
          y: 300,
        }}
        bordered={true}
        loading={isLoading}
        dataSource={allPlans}
        columns={columns()}
        rowKey="planId"
        pagination={{
          position: ["none"],
        }}
      />
    </>
  );
};
