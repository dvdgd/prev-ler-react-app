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
    <DashInfoCard title={"Duração média da assinatura"} icon={<BsBuildings />}{...props}>
      <HStack spacing={4} alignItems={"end"}>
        <Text>
          ~ {qtd.toFixed(2)} Dias
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

export function AvgSubscriptionDurations(props: BoxProps) {
  const query = useQuery({
    queryKey: ['dashboard', 'subscription', 'avg_duration'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('duracao_media_assinatura')
        .select('*')
        .single();

      return data.duracao;
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
