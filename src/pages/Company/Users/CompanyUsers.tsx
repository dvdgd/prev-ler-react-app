import { Button } from "@chakra-ui/react";
import { TableCard } from "@shared/components/Card/TableCard";
import { useNavigate } from "react-router-dom";
import { CompanyUsersTable } from "./components/CompanyUsersTable";

export function CompanyUsers() {
  const navigate = useNavigate();

  return (
    <>
      <TableCard title={"Usuários"}>
        <CompanyUsersTable />
        <Button
          colorScheme="brand"
          size="lg"
          onClick={() => { navigate('create') }}
        >
          Novo
        </Button>
      </TableCard>
    </>
  )
}