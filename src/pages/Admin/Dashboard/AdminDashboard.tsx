import { Divider, SimpleGrid } from "@chakra-ui/react";
import { ActiveCompaniesCard } from "./components/ActiveCompaniesCard";
import { BarChart } from "./components/charts/BarChart";
import { PieChart } from "./components/charts/PieChart";

const state2 = {
  series: [33, 44, 20, 12, 50],
  options: {
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  },
};

const state = {
  options: {
    chart: {
      id: 'apexchart-example'
    },
  },
  series: [
    {
      name: 'Series 1',
      data: [
        { x: 1, y: 30 },
        { x: 2, y: 40 },
        { x: 3, y: 35 },
        { x: 4, y: 50 },
        { x: 5, y: 49 },
        { x: 6, y: 60 },
        { x: 7, y: 70 },
        { x: 8, y: 91 },
        { x: 9, y: 150 },
      ],
    },
  ],
};

export function AdminDashboard() {

  return (
    <>
      <ActiveCompaniesCard />
      <SimpleGrid w={"full"} gap={8} columns={[1, 1, 1, 3]} alignContent={"space-between"}>
        <ActiveCompaniesCard />
        <ActiveCompaniesCard />
        <ActiveCompaniesCard />
      </SimpleGrid>
      <Divider height={0.4} bgColor={"blackAlpha.300"} />
      <SimpleGrid h={"400px"} columns={[1, 1, 1, 2]} spacing={8} width={"full"}>
        <BarChart chartData={state.series} chartOptions={state.options} />
        <PieChart chartData={state2.series} chartOptions={state2.options} />;
      </SimpleGrid>
    </>
  );
}

