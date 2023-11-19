import { Button } from "@chakra-ui/react";
import { Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { EPaymentStatus, TPayment } from "../../../../../@types/payment";
import { TableCard } from "../../../../../shared/components/Card/TableCard";
import { AdminPaymentTableOptions } from "../../../Payments/components/AdminPaymentsTableOptions";
import { useSubscriptionsCompanyByParams } from "../../hooks/useSubscriptionsCompanyByParams";

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
          [EPaymentStatus.canceled]: { colorTag: "gray", statusText: "Cancelado" },
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

export function SubscriptionPaymentsTable() {
  const { subscriptions, isLoading } = useSubscriptionsCompanyByParams();

  return (
    <>
      {subscriptions?.map((s) => (
        <>
          <TableCard title={`Pagamentos Assinatura ${s.subscriptionId}`} titleSize={"lg"}>

            <Table
              loading={isLoading}
              dataSource={s.payments}
              columns={columns()}
              rowKey="paymentId"
              scroll={{ x: 800, y: 300 }}
              bordered
              pagination={{
                pageSize: 5,
                position: ["bottomRight"],
              }}
            />
            <Button size={"md"} onClick={(() => { })}>
              Detalhes da assinatura
            </Button>
          </TableCard>
        </>
      ))}
    </>
  )
}