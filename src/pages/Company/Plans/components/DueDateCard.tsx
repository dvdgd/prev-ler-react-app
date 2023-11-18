import { Text, VStack } from "@chakra-ui/react";
import { BsCalendar2Week } from "react-icons/bs";
import { useAuth } from "../../../../hooks/useCurrentUser";
import { MiniInfoCard } from "../../../../shared/components/Card/MiniInfoCard";

export function DueDateCard() {
  const { userSession } = useAuth();
  const dueDate = userSession?.user?.company?.subscriptions?.at(0)?.expirationDate;
  const dueDateText = dueDate ? new Date(dueDate).toLocaleDateString() : "--"

  return (
    <MiniInfoCard title={"Data de Expiração"} icon={<BsCalendar2Week />}>
      <VStack w={"full"} spacing={3} align="flex-start">
        <Text >
          {dueDateText}
        </Text>
      </VStack>
    </MiniInfoCard>
  );
}