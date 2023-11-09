import { Text, VStack } from "@chakra-ui/react";
import { BsCalendar2Week } from "react-icons/bs";
import { MiniInfoCard } from "../../../../shared/components/Card/MiniInfoCard";

export function DueDateCard() {
  const dueDate = new Date("2023-11-27");
  return (
    <MiniInfoCard title={"Data de Vencimento"} icon={<BsCalendar2Week />}>
      <VStack w={"full"} spacing={3} align="flex-start">
        <Text >
          {dueDate.toLocaleDateString()}
        </Text>
      </VStack>
    </MiniInfoCard>
  );
}