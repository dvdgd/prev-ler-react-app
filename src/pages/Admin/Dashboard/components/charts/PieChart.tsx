import { ApexOptions } from "apexcharts";
import Chart from 'react-apexcharts';

type ChartProps = {
  chartData: ApexAxisChartSeries;
  chartOptions: ApexOptions;
};

export const PieChart = (props: ChartProps) => {

  return (
    <Chart
      series={props.chartData}
      options={props.chartOptions}
      type='pie'
      width='100%'
      height='100%'
    />
  );
};