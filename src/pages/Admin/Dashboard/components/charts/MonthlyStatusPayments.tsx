import { Box, Button, Center, FormControl, FormLabel, Select, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { TableCard } from "@shared/components/Card/TableCard";
import { getCompanyPaymnetConfig } from "@shared/functions/PaymentStatusMap";
import { AdminDashboardService } from "@shared/services/AdminDashboardService";
import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import {
  Controller,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { EPaymentStatus } from "types/payment";

const dashboardService = new AdminDashboardService();

const monthsConfig = [
  { text: 'Jan', value: 0 },
  { text: 'Fev', value: 1 },
  { text: 'Mar', value: 2 },
  { text: 'Abr', value: 3 },
  { text: 'Mai', value: 4 },
  { text: 'Jun', value: 5 },
  { text: 'Jul', value: 6 },
  { text: 'Ago', value: 7 },
  { text: 'Set', value: 8 },
  { text: 'Out', value: 9 },
  { text: 'Nov', value: 10 },
  { text: 'Dez', value: 11 },
];

const year = (new Date()).getFullYear();
const years = Array.from(new Array(5), (_val, index) => year - index);

type TPieData = {
  series: number[],
  options: {
    labels: string[],
  }
}

type YearMonthSelector = {
  month: number;
  year: number;
};

const dateNow = new Date();
const date = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);

export function MonthlyStatusPayments() {
  const formMethods = useForm<YearMonthSelector>();
  const [selectedDate, setSelectedDate] = useState(date);
  const [isLoading, setIsLoading] = useState(true);
  const [pieData, setPieData] = useState<TPieData | undefined>();

  useEffect(() => {
    fetchPaymentsGroupByMonthAndStatus(selectedDate);
  }, [selectedDate]);

  const fetchPaymentsGroupByMonthAndStatus = async (date: Date) => {
    try {
      setIsLoading(true);
      const paymentsStatus = await dashboardService.getPaymentsGroupByMonthAndStatus(date);
      const pieData: TPieData = {
        series: [],
        options: {
          labels: []
        }
      }

      paymentsStatus.forEach((p) => {
        pieData.series.push(p.qtdStatus);
        pieData.options.labels.push(getCompanyPaymnetConfig(p.paymentStatus as EPaymentStatus).statusText);
      })
      setPieData(pieData);
    } catch (error) {
      setPieData(undefined);
    } finally {
      setIsLoading(false);
    }
  }

  const onFormSubmit: SubmitHandler<YearMonthSelector> = (yearMonth) => {
    const year = yearMonth.year;
    const month = yearMonth.month;
    const date = new Date(year, month, 1);
    setSelectedDate(date);
  }

  return (
    <>
      <TableCard title={"Pagamentos por Status no mês"} titleSize={'lg'} minH='505px' alignContent={'center'}>
        <Box w="full">
          {isLoading ? <Box w="full" h="full">
            <Center>
              <Spinner size="xl" />
            </Center>
          </Box> : pieData ? <Chart
            series={pieData.series}
            options={{
              ...pieData.options,
              dataLabels: {
                offsetX: 0,
                offsetY: 0,
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        show: true,
                      }
                    }
                  }
                }
              }
            }}
            type='donut'
            height={"130%"}
          /> : <Center>
            <Text>Não foram encontrados resultados.</Text>
          </Center>}
        </Box>
        <form onSubmit={formMethods.handleSubmit(onFormSubmit)}>
          <SimpleGrid alignSelf={"self-start"} columns={[1, 2, 3]} gap={6} alignItems={'end'} h='full'>
            <FormControl>
              <FormLabel>Mês</FormLabel>
              <Controller
                control={formMethods.control}
                name="month"
                defaultValue={new Date().getUTCMonth()}
                render={({ field }) => {
                  return (
                    <>
                      <Select {...field} placeholder="Selecione">
                        {monthsConfig.map((config) => (
                          <option key={config.value} value={config.value}>
                            {config.text}
                          </option>
                        ))}
                      </Select>
                    </>
                  );
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Ano</FormLabel>
              <Controller
                control={formMethods.control}
                name="year"
                defaultValue={new Date().getFullYear()}
                render={({ field }) => {
                  return (
                    <>
                      <Select {...field} placeholder="Selecione">
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Select>
                    </>
                  );
                }}
              />
            </FormControl>
            <Button type="submit" isLoading={isLoading} w="full">
              Buscar
            </Button>
          </SimpleGrid>
        </form>
      </TableCard>
    </>
  )
}
