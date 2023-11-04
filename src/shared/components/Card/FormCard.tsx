import { BaseCard, BaseCardProps } from "./BaseCard";

export function FormCard({ title, children, ...props }: Omit<BaseCardProps, "minW">) {
  return (
    <BaseCard title={title} w={["auto", "auto", "2xl"]} {...props}>
      {children}
    </BaseCard>
  )
}
