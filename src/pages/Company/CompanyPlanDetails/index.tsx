import { HStack, VStack } from "@chakra-ui/react";
import { TableCard } from "../../../shared/components/Card/TableCard";
import { ActualPlanCard } from "./components/ActualPlanCard";
import { CompanyPaymentsTableAntd } from "./components/CompanyPaymentsTableAntd";
import { DueDateCard } from "./components/DueDateCard";
import { StatusCard } from "./components/StatusCard";

export function CompanyPlanDetailsPage() {
  return (
    <VStack spacing={8} style={{ paddingTop: 30 }}>
      <HStack spacing={8}>
        <StatusCard />
        <ActualPlanCard />
        <DueDateCard />
      </HStack>
      <TableCard title={"Pagamentos de assinatura"}>
        <CompanyPaymentsTableAntd />
      </TableCard>
    </VStack>
  );
}
