import { Button, VStack } from "@chakra-ui/react";
import { TableCard } from "@shared/components/Card/TableCard";
import { useNavigate } from "react-router-dom";
import { PlansTableAntd } from "./components/PlansTableAntd";

export function AdminPlansPage() {
  const navigate = useNavigate();

  return (
    <>
      <TableCard
        title="Planos"
      >
        <VStack spacing={8} w="full">
          <PlansTableAntd />
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
  );
}
