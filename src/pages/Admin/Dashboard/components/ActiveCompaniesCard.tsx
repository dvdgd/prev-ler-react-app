
import { BoxProps, HStack, Text } from "@chakra-ui/react";
import { BsBuildings } from "react-icons/bs";
import { useAuth } from "../../../../hooks/useCurrentUser";
import { DashInfoCard } from "../../../../shared/components/Card/DashInfoCard";

type ActiveCompanyCardProps = BoxProps

function BlankActiveCompaniesCard(props: ActiveCompanyCardProps) {
  return (
    <DashInfoCard title={"Empresas Ativas"} icon={<BsBuildings />}{...props}>
      <HStack spacing={4} alignItems={"center"}>
        <Text>
          R$ --
        </Text>
      </HStack>
    </DashInfoCard>
  )
}

export function ActiveCompaniesCard(props: ActiveCompanyCardProps) {
  const { userSession } = useAuth();

  const plan = userSession?.user?.company?.subscriptions?.at(0)?.plan;
  if (!plan) {
    return <BlankActiveCompaniesCard {...props} />
  }

  const { value, periodicy } = plan;
  if (!value || !periodicy) {
    return <BlankActiveCompaniesCard {...props} />
  }

  const periodicyText = periodicy === 'mensais' ? "mês" : "ano";

  return (
    <DashInfoCard title={"Empresas Ativas"} icon={<BsBuildings />} {...props}>
      <HStack spacing={3} alignItems={"center"}>
        <Text>
          R$ {value}/{periodicyText}
        </Text>
      </HStack>
    </DashInfoCard>
  );
}