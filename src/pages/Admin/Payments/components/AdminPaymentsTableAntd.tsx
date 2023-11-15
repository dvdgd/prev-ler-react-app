import { Text, Tooltip } from "@chakra-ui/react";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { EPaymentStatus, TPayment } from "../../../../@types/payment";
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler";
import { PaymentService } from "../../../../shared/services/PaymentService";
import { AdminPaymentTableOptions } from "./AdminPaymentsTableOptions";

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
      responsive: ["md"],
      render(_value, Title) {
        const title = Title.subscription?.plan?.title
        return <>{title}</>
      }
    },
    {
      title: "Empresa",
      dataIndex: "fantasyName",
      key: "fantasyName",
      width: 155,
      render(_value, { subscription }) {
        const companyFantasyName = subscription?.company?.fantasyName
        return (
          <Tooltip label={companyFantasyName}>
            <Text textOverflow={"clip"} overflow={"hidden"} whiteSpace={"nowrap"} >
              {companyFantasyName}
            </Text>
          </Tooltip>
        )
      },
    },
    {
      title: "Data Notificação",
      dataIndex: "paymentDate",
      key: "paymentDate",
      width: 120,
      render(_value, { paymentDate }) {
        const paymentDateTxt = paymentDate ? paymentDate.toLocaleDateString() : "--";
        return <>{paymentDateTxt}</>
      }
    },
    {
      title: "Data Aprovação",
      dataIndex: "approvedAt",
      key: "approvedAt",
      width: 120,
      responsive: ["md"],
      render(_value, { aproovedAt }) {
        if (aproovedAt) {
          return <>{aproovedAt.toLocaleDateString()}</>
        }
        return <>--</>
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
        { text: "Aprovado", value: EPaymentStatus.paid },
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
          [EPaymentStatus.paid]: { colorTag: "green", statusText: "Aprovado" },
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
      render: (_value, payment) => {
        return (
          <>
            <AdminPaymentTableOptions payment={payment} />
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
