import { useMediaQuery } from "@chakra-ui/react";
import { BaseCard, BaseCardProps } from "./BaseCard";

export function FormCard({ title, children }: Omit<BaseCardProps, "minW">) {
  const [isLargerThan48em] = useMediaQuery("(min-width: 500px)");

  return (
    <BaseCard title={title} maxW={"md"} minW={isLargerThan48em ? "md" : ""}>
      {children}
    </BaseCard>
  )
}
