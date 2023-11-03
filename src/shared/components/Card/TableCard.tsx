import { useMediaQuery } from "@chakra-ui/react";
import { BaseCard, BaseCardProps } from "./BaseCard";

export function TableCard({ title, children }: Omit<BaseCardProps, "minW">) {
  const [isLargerThan940] = useMediaQuery("(min-width: 62em)");

  return (
    <BaseCard title={title} maxW={isLargerThan940 ? "62em" : ""}>
      {children}
    </BaseCard>
  )
}
