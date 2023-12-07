import Chart from 'react-apexcharts';


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

export const BarChart = () => {

  return (
    <Chart
      series={state.series}
      options={state.options}
      type='bar'
      width='100%'
      height='100%'
    />
  );
};