import { Button, VStack } from "@chakra-ui/react";
import { TableCard } from "@shared/components/Card/TableCard";
import { useNavigate } from "react-router-dom";
import { JobRolesTable } from "./components/JobRolesTable";

export function JobRoles() {
  const navigate = useNavigate();

  return (
    <>
      <TableCard title="Cargos">
        <VStack spacing={8} w="full">
          <JobRolesTable />
          <Button
            colorScheme="brand"
            size={"lg"}
            onClick={() => navigate("create")}
          >
            Novo
          </Button>
        </VStack>
      </TableCard>
    </>
  )
}