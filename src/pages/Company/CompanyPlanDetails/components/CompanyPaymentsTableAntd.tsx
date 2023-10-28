import { Box, HStack } from "@chakra-ui/react";
import { Table } from "antd";
import Column from "antd/es/table/Column";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { TPayment } from "../../../../@types/payment";
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler";
import { ViewIconAction } from "../../../../shared/components/ViewIconAction";
import { PaymentService } from "../../../../shared/services/PaymentService";

const columns = (): ColumnsType<TPayment> => {
  return [
    {
      title: "Identificador pagamento",
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
      title: "Data do pagamento",
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
    {
      title: "Status pagamento",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Detalhes",
      render: () => {
        return (
          <>
            <HStack alignContent={"space-between"} w="full" paddingX={10}>
              <ViewIconAction
                color={"black"}
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

export const CompanyPaymentsTableAntd = () => {
  const [payments, setPayments] = useState<TPayment[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const { showErrorToast } = useShowToastErrorHandler();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsloading(true);
        const newPayments = await new PaymentService().getAllPayments();

        setPayments([...newPayments]);
      } catch (error) {
        showErrorToast({
          error, toastAttributes: {
            title: 'Desculpe, ocorreu um erro ao buscar os pagamentos',
            status: 'error',
            duration: 3000,
          }
        });
      } finally {
        setIsloading(false);
      }
    }
    fetchPayments();
  }, []);

  return (
    <Box m="20px" mt="100px">
      <Table
        loading={isLoading}
        dataSource={payments}
        columns={columns()}
        rowKey={(data) => data.paymentId || 0}
      >
        <Column title="" />
      </Table>
    </Box>
  );
};
