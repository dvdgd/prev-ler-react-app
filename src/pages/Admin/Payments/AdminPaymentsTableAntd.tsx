import { Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { EPaymentStatus, TPayment } from "../../../@types/payment";
import { useShowToastErrorHandler } from "../../../hooks/useShowToastErrorHandler";
import { PaymentService } from "../../../shared/services/PaymentService";

const columns = (): ColumnsType<TPayment> => {
  return [
    {
      title: "# ID",
      dataIndex: "paymentId",
      key: "paymentId",
      width: "%55",
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
        { text: "Processando", value: EPaymentStatus.processing },
      ],
      filterMode: 'menu',
      filterSearch: true,
      onFilter: (value, record) => {
        return Boolean(record.status.toString() === value);
      },
      render(_value, { status }) {
        const colorMapping = {
          [EPaymentStatus.paid]: "green",
          [EPaymentStatus.open]: "gray",
          [EPaymentStatus.processing]: "yellow",
          [EPaymentStatus.notPaid]: "red",
        };

        const color = colorMapping[status]
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: "Opções",
      dataIndex: "",
      key: "",
      align: "center",
      width: 300,
      render: (_value, record) => {
        return (
          <>
            <a>Opcoes</a>
            <a>Opcoes</a>
            <a>Opcoes</a>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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