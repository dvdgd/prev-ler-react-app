
import { BoxProps, HStack, Text } from "@chakra-ui/react";
import { supabaseClient } from "@config/supabase";
import { ViewIconAction } from "@shared/components/ViewIconAction";
import { UserProfileFromSupabase } from "@shared/mappers/UserProfileSupabaseMappers";
import { useQuery } from "@tanstack/react-query";
import { BsBuildings } from "react-icons/bs";
import { MdDoubleArrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { DashInfoCard } from "../../../../../shared/components/Card/DashInfoCard";

type ActiveCompanyCardProps = BoxProps & {
  qtd: number;
}

function BaseCard({ qtd, ...props }: ActiveCompanyCardProps) {
  const navigate = useNavigate();

  return (
    <DashInfoCard title={"Usuários sem empresa"} icon={<BsBuildings />}{...props}>
      <HStack spacing={4} alignItems={"center"}>
        <Text>
          {qtd} {qtd > 1 ? 'usuários' : 'usuário'}
        </Text>
        <ViewIconAction
          aria-label={"Visualizar usuários"}
          size={"md"}
          rounded={'xl'}
          icon={<MdDoubleArrow />}
          isDisabled={qtd === 0}
          onClick={() => navigate('business-controllers?complete-onboarding=false')}
        />
      </HStack>
    </DashInfoCard>
  )
}

function BlankCard() {
  return (
    <BaseCard qtd={0} />
  )
}

export function UsersWithoutCompanyCard(props: BoxProps) {
  const query = useQuery({
    queryKey: ['dashboard', 'users', 'business_type'],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from('usuarios_representantes')
        .select('*');

      return data?.map((d) => UserProfileFromSupabase(d));
    }
  });

  const filteredUsers = query.data?.filter((up) => !up.idCompany);

  return (
    <>
      {query.isLoading ? <BlankCard /> : <>
        <BaseCard qtd={filteredUsers?.length ?? 0} {...props} />
      </>}
    </>
  )
}