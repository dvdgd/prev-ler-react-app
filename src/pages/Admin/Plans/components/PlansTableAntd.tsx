import { HStack } from "@chakra-ui/react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { TPlan } from "../../../../@types/plan";
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler";
import { DeleteIconAction } from "../../../../shared/components/DeleteIconAction";
import { EditIconAction } from "../../../../shared/components/EditIconAction";
import { PlanService } from "../../../../shared/services/PlanService";

const columns = (): ColumnsType<TPlan> => {
  return [
    {
      title: "#",
      dataIndex: "planId",
      key: "planId",
      width: "5%",
    },
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Usuários máximos",
      dataIndex: "maxUsers",
      key: "maxUsers",
      width: "20%",
    },
    {
      title: "Periodicidade",
      dataIndex: "periodicy",
      key: "periodicy",
    },
    {
      title: "Valor",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Ativo",
      dataIndex: "active",
      key: "active",
    },
    {
      title: "Opções",
      dataIndex: "",
      key: "",
      align: "center",
      render: () => {
        return (
          <>
            <HStack alignContent={"space-between"} w="full" paddingX={10}>
              <EditIconAction
                color={"blue.600"}
                onClick={() => { }}
                cursor="pointer"
              />
              <DeleteIconAction
                color={"red.600"}
                cursor="pointer"
                onClick={() => { }}
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
        const newPlans = await new PlanService().getAllPlans();

        setPlans([...newPlans]);
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
      virtual
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
