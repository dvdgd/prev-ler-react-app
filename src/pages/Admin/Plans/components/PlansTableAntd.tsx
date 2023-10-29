import { HStack, Tag } from "@chakra-ui/react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { TPlan } from "../../../../@types/plan";
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler";
import { PlanService } from "../../../../shared/services/PlanService";
import { PlansTableOptions } from "./PlansTableOptions";

const columns = (): ColumnsType<TPlan> => {
  return [
    {
      title: "# ID",
      dataIndex: "planId",
      key: "planId",
      width: 50,
      render(_value, record) {
        const planId = record.planId?.toString().padStart(2, "0");
        return (
          <>
            {planId}
          </>
        )
      }
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
      width: 100,
      render(_value, plan) {
        const periodicy = plan.periodicy === "mensais" ? "Mensal" : "Anual";
        return (
          <>{periodicy}</>
          )
      }
    },
    {
      title: "Valor",
      dataIndex: "value",
      key: "value",
      width: 100,
    },
    {
      title: "Ativo",
      dataIndex: "active",
      key: "active",
      responsive: ["md"],
      width: 100,
      render(_value, { active }) {
        const activeStr = active ? "SIM" : "NÃO";
        const color = active ? "green" : "red";
        return (
          <Tag color={color}>
            {activeStr}
          </Tag>
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
            <HStack alignContent={"space-around"} paddingX={3}>
              <PlansTableOptions
                plan={record}
              />
            </HStack>
          </>
        );
      },
    },
  ];
};

export const PlansTableAntd = () => {
  const [plans, setPlans] = useState<TPlan[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const { showErrorToast } = useShowToastErrorHandler();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsloading(true);
        const allPlans = await new PlanService().getAllPlans();
        setPlans(allPlans);
      } catch (error) {
        showErrorToast({
          error, toastAttributes: {
            title: 'Desculpe, ocorreu um erro ao buscar os planos',
            status: 'error',
            duration: 3000,
          }
        });
      } finally {
        setIsloading(false);
      }
    }
    fetchPlans();
  }, []);

  return (
    <Table
      scroll={{
        x: 800,
        y: 300
      }}
      bordered={true}
      loading={isLoading}
      dataSource={plans}
      columns={columns()}
      rowKey="planId"
      pagination={{
        position: ["bottomRight"]
      }}
    />
  );
};
