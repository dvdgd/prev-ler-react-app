import { Text, VStack } from "@chakra-ui/react";
import { PiClipboardDuotone } from "react-icons/pi";
import { useAuth } from "../../../../hooks/useCurrentUser";
import { MiniInfoCard } from "../../../../shared/components/Card/MiniInfoCard";

export function ActualPlanCard() {
  const { userSession } = useAuth();
  return (
    <MiniInfoCard title={"Plano Atual"} icon={<PiClipboardDuotone />}>
      <VStack w={"full"} spacing={3} align="flex-start">
        <Text>
          R$ {userSession?.user?.company?.subscriptions?.at(0)?.plan?.value} {userSession?.user?.company?.subscriptions?.at(0)?.plan?.periodicy}
        </Text>
      </VStack>
    </MiniInfoCard>
  );
}