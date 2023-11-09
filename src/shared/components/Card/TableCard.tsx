import { BaseCard, BaseCardProps } from "./BaseCard";

export function TableCard({ title, children }: Omit<BaseCardProps, "minW">) {
  return (
    <BaseCard title={title}>
      {children}
    </BaseCard>
  )
}
