import { Text, VStack } from "@chakra-ui/react";
import { useAuth } from "@hooks/useCurrentUser";
import { MiniInfoCard } from "@shared/components/Card/MiniInfoCard";
import { getSubscriptionStatusText } from "@shared/functions/SubscriptionStatusMap";
import { BsCheckAll } from "react-icons/bs";

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

  const statusText = getSubscriptionStatusText(subscription.status);
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