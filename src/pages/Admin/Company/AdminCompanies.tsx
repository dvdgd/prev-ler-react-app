import { TableCard } from "@shared/components/Card/TableCard";
import { AdminCompanyTableAntd } from "./components/AdminCompanyTableAntd";

export function AdminCompanies() {
  return (
    <>
      <TableCard title="Empresas">
        <AdminCompanyTableAntd />
      </TableCard>
    </>
  )
}