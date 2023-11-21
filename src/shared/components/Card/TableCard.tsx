import { BaseCard, BaseCardProps } from "./BaseCard";

export function TableCard({ children, ...props }: Omit<BaseCardProps, "minW">) {
  return (
    <BaseCard {...props}>
      {children}
    </BaseCard>
  )
}
