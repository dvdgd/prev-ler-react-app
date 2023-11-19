import { Tooltip } from "@chakra-ui/react";
import { usePayments } from "@hooks/usePayments";
import { getCompanyPaymnetConfig } from "@shared/functions/PaymentStatusMap";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TPayment } from "types/payment";
import { PaymentsTableOptions } from "./PaymentsTableOptions";

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
      title: "Data Abertura",
      dataIndex: "openAt",
      key: "openAt",
      width: 120,
      render(_value, { openAt }) {
        if (openAt) {
          return <>{openAt.toLocaleDateString()}</>
        }
        return <>--</>
      }
    },
    {
      title: "Data Notificado",
      dataIndex: "paymentDate",
      key: "paymentDate",
      width: 120,
      render(_value, { paymentDate }) {
        if (paymentDate) {
          return <>{paymentDate.toLocaleDateString()}</>
        }
        return <>--</>
      }
    },
    {
      title: "Data Aprovado",
      dataIndex: "approvedAt",
      key: "approvedAt",
      width: 120,
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
      width: 180,
      render(_value, { status }) {
        const statusConfig = getCompanyPaymnetConfig(status);
        return (
          <>
            <Tooltip label={statusConfig.tooltipText}>
              <Tag color={statusConfig.colorTag}>{statusConfig.statusText}</Tag>
            </Tooltip>
          </>
        )
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
            <PaymentsTableOptions payment={record} />
          </>
        );
      },
    },
  ];
};

export const CompanyPaymentsTableAntd = () => {
  const { allPayments, isLoading } = usePayments();

  return (
    <Table
      loading={isLoading}
      dataSource={allPayments}
      columns={columns()}
      rowKey="paymentId"
      scroll={{ x: 900, y: 300 }}
      bordered
      pagination={{
        position: ["bottomRight"],
        pageSize: 4
      }}
    >
    </Table>
  );
};
