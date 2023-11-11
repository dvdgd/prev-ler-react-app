
import { EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Text } from "@chakra-ui/react";
import { PiClipboardDuotone } from "react-icons/pi";
import { useAuth } from "../../../../hooks/useCurrentUser";
import { MiniInfoCard } from "../../../../shared/components/Card/MiniInfoCard";

function BlankPlanCard() {
  return (
    <MiniInfoCard title={"Plano Atual"} icon={<PiClipboardDuotone />}>
      <Text>
        R$ 0,00
      </Text>
    </MiniInfoCard>
  )
}

export function ActualPlanCard() {
  const { userSession } = useAuth();

  const plan = userSession?.user?.company?.subscriptions?.at(0)?.plan;
  if (!plan) {
    return <BlankPlanCard />
  }

  const { value, periodicy } = plan;
  if (!value || !periodicy) {
    return <BlankPlanCard />
  }

  const periodicyText = periodicy === 'mensais' ? "mês" : "ano";

  return (
    <MiniInfoCard title={"Plano Atual"} icon={<PiClipboardDuotone />}>
      <HStack spacing={4} alignItems={"center"}>
        <Text>
          R$ {value}/{periodicyText}
        </Text>
        <IconButton
          aria-label={"Mudar plano"}
          size={"sm"}
          isRound={true}
          variant='outline'
          icon={<EditIcon />}
        />
      </HStack>
    </MiniInfoCard>
  );
}