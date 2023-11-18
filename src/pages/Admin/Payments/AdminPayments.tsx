import { usePayments } from "../../../hooks/usePayments";
import { TableCard } from "../../../shared/components/Card/TableCard";
import { AdminPaymentsTableAntd } from "./components/AdminPaymentsTableAntd";

export function AdminPayments() {
  const {
    allPayments,
    isLoading,
  } = usePayments();

  return (
    <>
      <TableCard title={"Pagamentos"}>
        <AdminPaymentsTableAntd allPayments={allPayments || []} isLoading={isLoading} />
      </TableCard>
    </>
  );
}
