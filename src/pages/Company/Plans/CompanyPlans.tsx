import { SimpleGrid, VStack } from "@chakra-ui/react";
import { TableCard } from "@shared/components/Card/TableCard";
import { ActualPlanCard } from "./components/ActualPlanCard";
import { CompanyPaymentsTableAntd } from "./components/CompanyPaymentsTableAntd";
import { DueDateCard } from "./components/DueDateCard";
import { StatusCard } from "./components/StatusCard";

export function CompanyPlans() {
  return (
    <>
      <SimpleGrid w={"full"} gap={8} columns={[1, 1, 1, 3]} alignContent={"space-between"}>
        <StatusCard />
        <ActualPlanCard />
        <DueDateCard />
      </SimpleGrid>
      <TableCard title={"Pagamentos de assinatura"}>
        <VStack width={"full"}>
          <CompanyPaymentsTableAntd />
        </VStack>
      </TableCard>
    </>
  );
}
