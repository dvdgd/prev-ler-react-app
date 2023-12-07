import { supabaseClient } from '@config/supabase';
import { TableCard } from '@shared/components/Card/TableCard';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

type Data = {
  idplano: number,
  qtdassinaturaplano: number,
  nomeplano: string,
}

export const BarChart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data[]>();

  useEffect(() => {
    fetchTotalPlansPerStatusSubscription()
  }, []);


  const fetchTotalPlansPerStatusSubscription = async () => {
    try {
      setIsLoading(true);
      const { data } = await supabaseClient.from('qtd_assinatura_plano').select('*');
      console.log(data);
      setData(data ?? [] as Data[]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <TableCard title="Total de assinaturas ativas por plano" titleSize={'lg'} minH='505px'>
        {data && !isLoading ? <Chart
          series={[
            {
              name: 'Quantidade',
              data: data?.map(item => item.qtdassinaturaplano) ?? [0]
            }
          ]}
          options={{
            chart: {
              id: 'bar',
            },
            xaxis: {
              categories: data?.map(plano => `${plano.nomeplano}`) ?? 'Vazio',
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '50%',
                distributed: true
              },
            },
          }}
          type="bar"
          height="350"
        /> : <></>}
      </TableCard>
    </>
  );
};