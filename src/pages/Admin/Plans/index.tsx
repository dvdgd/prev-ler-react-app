import { Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { TableCard } from "../../../shared/components/Card/TableCard";
import { PlansTableAntd } from "./components/PlansTableAntd";

export function AdminPlans() {
  const navigate = useNavigate();

  return (
    <>
      <TableCard
        title="Planos"
      // shadow={"xl"}
      // size={"lg"}
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
