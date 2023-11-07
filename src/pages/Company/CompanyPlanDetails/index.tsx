import { SimpleGrid, VStack } from "@chakra-ui/react";
import { TableCard } from "../../../shared/components/Card/TableCard";
import { ActualPlanCard } from "./components/ActualPlanCard";
import { CompanyPaymentsTableAntd } from "./components/CompanyPaymentsTableAntd";
import { DueDateCard } from "./components/DueDateCard";
import { StatusCard } from "./components/StatusCard";

export function CompanyPlanDetailsPage() {
  return (
    <VStack width={"full"} spacing={8} style={{ paddingTop: 30 }}>
      <SimpleGrid p={8} spacing={8} columns={3}>
        <StatusCard />
        <ActualPlanCard />
        <DueDateCard />
      </SimpleGrid>
      <TableCard title={"Pagamentos de assinatura"}>
        <VStack width={"full"}>
          <CompanyPaymentsTableAntd />
        </VStack>
      </TableCard>
    </VStack>
  );
}
