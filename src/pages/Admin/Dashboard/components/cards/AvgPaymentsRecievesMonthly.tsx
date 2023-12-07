import { BoxProps, HStack, Text } from "@chakra-ui/react";
import { supabaseClient } from "@config/supabase";
import { DashInfoCard } from "@shared/components/Card/DashInfoCard";
import { useQuery } from "@tanstack/react-query";
import { BsBuildings } from "react-icons/bs";

type UsersWithoutCompanyCard = BoxProps & {
  qtd: number;
}

function BaseCard({ qtd, ...props }: UsersWithoutCompanyCard) {
  return (
    <DashInfoCard title={"Média de recebimento mensal"} icon={<BsBuildings />}{...props}>
      <HStack spacing={4} alignItems={"end"}>
        <Text>
          ~ R$ {qtd}
        </Text>
      </HStack>
    </DashInfoCard>
  )
}

function BlankCard() {
  return (
    <BaseCard qtd={0} />
  )
}

export function AvgPaymentsRecievesMonthly(props: BoxProps) {
  const query = useQuery({
    queryKey: ['dashboard', 'subscription', 'avg_recieves'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('media_recebimentos_mes')
        .select('*')
        .single();

      return data.media.toFixed(2);
    }
  });

  return (
    <>
      {query.isLoading ? <BlankCard /> : <>
        <BaseCard qtd={query.data ?? 0} {...props} />
      </>}
    </>
  )
}
