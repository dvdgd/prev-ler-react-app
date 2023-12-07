import { Divider, SimpleGrid } from "@chakra-ui/react";
import { AvgPaymentsRecievesMonthly } from "./components/cards/AvgPaymentsRecievesMonthly";
import { AvgSubscriptionDurations } from "./components/cards/AvgSubscriptionDurations";
import { UsersWithoutCompanyCard } from "./components/cards/UsersWithoutCompanyCard";
import { BarChart } from "./components/charts/BarChart";
import { MonthlyStatusPayments } from "./components/charts/MonthlyStatusPayments";

export function AdminDashboard() {

  return (
    <>
      <SimpleGrid w={"full"} gap={8} columns={[1, 1, 1, 3]} alignContent={"space-between"}>
        <AvgPaymentsRecievesMonthly />
        <AvgSubscriptionDurations />
        <UsersWithoutCompanyCard />
      </SimpleGrid>
      <Divider height={0.4} bgColor={"blackAlpha.300"} />
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={8} width={"full"}>
        <BarChart />
        <MonthlyStatusPayments />
      </SimpleGrid>
    </>
  );
}

