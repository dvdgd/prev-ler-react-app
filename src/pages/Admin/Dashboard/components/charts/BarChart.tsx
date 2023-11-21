import { ApexOptions } from "apexcharts";
import Chart from 'react-apexcharts';

type ChartProps = {
  chartData: ApexAxisChartSeries;
  chartOptions: ApexOptions;
};

export const BarChart = (props: ChartProps) => {

  return (
    <Chart
      options={props.chartOptions}
      series={props.chartData}
      type='bar'
      width='100%'
      height='100%'
    />
  );
};