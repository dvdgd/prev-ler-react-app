import { Text, VStack } from "@chakra-ui/react";
import { useAuth } from "@hooks/useCurrentUser";
import { MiniInfoCard } from "@shared/components/Card/MiniInfoCard";
import { BsCheckAll } from "react-icons/bs";
import { ESubscriptionStatus } from "types/subscription";

function BlankStatusCard() {
  return (
    <MiniInfoCard title={"Status da Assinatura"} icon={<BsCheckAll />}>
      <Text>
        --
      </Text>
    </MiniInfoCard>
  );
}

export function StatusCard() {
  const { userSession } = useAuth();

  const subscription = userSession?.user?.company?.subscriptions?.at(0);
  if (!subscription) {
    return <BlankStatusCard />;
  }

  if (!subscription.status) {
    return <BlankStatusCard />;
  }

  const statusTextMap = {
    [ESubscriptionStatus.active]: "Ativa",
    [ESubscriptionStatus.canceled]: "Cancelada",
    [ESubscriptionStatus.notPaid]: "Não paga",
  }

  const statusText = statusTextMap[subscription.status];

  return (
    <MiniInfoCard title={"Status da Assinatura"} icon={<BsCheckAll />}>
      <VStack w={"full"} align="flex-start">
        <Text>
          {statusText}
        </Text>
      </VStack>
    </MiniInfoCard>
  );
}