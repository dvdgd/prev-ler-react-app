import { Text, VStack } from "@chakra-ui/react";
import { BsCheckAll } from "react-icons/bs";
import { useAuth } from "../../../../hooks/useCurrentUser";
import { MiniInfoCard } from "../../../../shared/components/Card/MiniInfoCard";

export function StatusCard() {
  const { userSession } = useAuth();
  return (
    <MiniInfoCard title={"Status da Assinatura"} icon={<BsCheckAll />}>
      <VStack w={"full"} spacing={3} align="flex-start">
        <Text fontSize="3xl" fontWeight="medium">
          {userSession?.user?.company?.subscriptions?.at(0)?.status}
        </Text>
      </VStack>
    </MiniInfoCard>
  );
}