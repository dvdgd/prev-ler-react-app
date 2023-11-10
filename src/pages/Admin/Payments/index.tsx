import { TableCard } from "../../../shared/components/Card/TableCard";
import { AdminPaymentsTableAntd } from "./AdminPaymentsTableAntd";

export function AdminPayments() {
  return (
    <>
      <TableCard title={"Pagamentos"}>
        <AdminPaymentsTableAntd/>
      </TableCard>
    </>
  );
}
