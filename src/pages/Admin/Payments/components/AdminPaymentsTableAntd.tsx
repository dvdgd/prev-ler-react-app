import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Center, HStack } from "@chakra-ui/react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { EPaymentStatus, TPayment } from "../../../../@types/payment";
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler";
import { MyIconButton } from "../../../../shared/components/MyIconButton";
import { PaymentService } from "../../../../shared/services/PaymentService";

const columns = (): ColumnsType<TPayment> => {
  return [
    {
      title: "# ID",
      dataIndex: "paymentId",
      key: "paymentId",
      width: 60,
      fixed: true,
      render(_value, payment) {
        const paymentId = payment.paymentId?.toString().padStart(2, "0");
        return <>{paymentId}</>;
      },

    },
    {
      title: "Plano",
      dataIndex: "title",
      key: "title",
      width: 110,
      render(_value, Title) {
        const title = Title.subscription?.plan?.title
        return <>{title}</>
      }
    },
    {
      title: "Data",
      dataIndex: "paymentDate",
      key: "paymentDate",
      width: 120,
      render(_value, Data) {
        const date = new Date(Data.paymentDate!)
        const formattedDate = date.toLocaleDateString('pt-BR')
        return <>{formattedDate}</>
      }
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pago", value: EPaymentStatus.paid },
        { text: "Não Pago", value: EPaymentStatus.notPaid },
        { text: "Aberto", value: EPaymentStatus.open },
        { text: "Aguardando Aprovação", value: EPaymentStatus.processing },
      ],
      filterMode: 'menu',
      filterSearch: true,
      width: 180,
      onFilter: (value, record) => {
        return Boolean(record.status.toString() === value);
      },
      render(_value, { status }) {
        const statusConfigMap = {
          [EPaymentStatus.paid]: { colorTag: "green", statusText: "Pago" },
          [EPaymentStatus.open]: { colorTag: "gray", statusText: "Aberto" },
          [EPaymentStatus.processing]: { colorTag: "yellow", statusText: "Aguardando Aprovação" },
          [EPaymentStatus.notPaid]: { colorTag: "red", statusText: "Não Pago" },
        };

        const statusConfig = statusConfigMap[status]
        return <Tag color={statusConfig.colorTag}>{statusConfig.statusText}</Tag>;
      }
    },
    {
      title: "Opções",
      dataIndex: "",
      key: "",
      align: "center",
      width: 200,
      render: () => {
        return (
          <>
            <Center>
              <HStack alignContent={"space-around"} paddingX={3}>
                <MyIconButton
                  onClick={() => { }}
                  icon={<CheckIcon />}
                  color={"green.600"}
                  aria-label="Reconhecer pagamento"
                >
                  Aprovar
                </MyIconButton>
                <MyIconButton
                  onClick={() => { }}
                  icon={<CloseIcon />}
                  color={"red.600"}
                  aria-label="Contestar Pagamento"
                >
                  Recusar
                </MyIconButton>
              </HStack>
            </Center>
          </>
        );
      },
    },
  ];
};

export const AdminPaymentsTableAntd = () => {
  const [payments, setPayments] = useState<TPayment[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const { showErrorToast } = useShowToastErrorHandler();

  const fetchPayments = async () => {
    try {
      setIsloading(true);
      const allPayments = await new PaymentService().getAllPayments();
      setPayments(allPayments);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Table
      loading={isLoading}
      dataSource={payments}
      columns={columns()}
      rowKey="paymentId"
      scroll={{ x: 800, y: 300 }}
      bordered
      pagination={{
        position: ["none"],
      }}
    >
    </Table>
  );
};
