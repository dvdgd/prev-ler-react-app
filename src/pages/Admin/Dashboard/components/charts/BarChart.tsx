import { ApexOptions } from "apexcharts";
import Chart from 'react-apexcharts';

type ChartProps = {
  chartData: ApexOptions["series"];
  chartOptions: ApexOptions;
};

export const BarChart = (props: ChartProps) => {

  return (
    <Chart
      series={props.chartData}
      options={props.chartOptions}
      type='bar'
      width='100%'
      height='100%'
    />
  );
};