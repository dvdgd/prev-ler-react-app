import { ESubscriptionStatus } from "@core/entities/subscription";

const statusTextMap = {
  [ESubscriptionStatus.active]: "Ativa",
  [ESubscriptionStatus.canceled]: "Cancelada",
  [ESubscriptionStatus.notPaid]: "Não paga",
}

export function getSubscriptionStatusText(status: ESubscriptionStatus) {
  return statusTextMap[status];
} 