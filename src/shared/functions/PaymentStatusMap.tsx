import { EPaymentStatus } from "types/payment";

const adminStatusConfigMap = {
  [EPaymentStatus.paid]: { colorTag: "green", statusText: "Aprovado" },
  [EPaymentStatus.open]: { colorTag: "gray", statusText: "Aberto" },
  [EPaymentStatus.processing]: { colorTag: "yellow", statusText: "Aguardando Aprovação" },
  [EPaymentStatus.notPaid]: { colorTag: "red", statusText: "Não Pago" },
  [EPaymentStatus.canceled]: { colorTag: "gray", statusText: "Cancelado" },
};
export function getAdminPaymnetConfig(status: EPaymentStatus) {
  return adminStatusConfigMap[status];
}

const companyStatusConfigMap = {
  [EPaymentStatus.paid]: { colorTag: "green", statusText: "Pago", tooltipText: "Esse pagamento já foi pago" },
  [EPaymentStatus.open]: { colorTag: "gray", statusText: "Aberto", tooltipText: "Esse pagamento está aguardando pagamento" },
  [EPaymentStatus.processing]: { colorTag: "yellow", statusText: "Aguardando Aprovação", tooltipText: "Esperando a aprovação de um administrador" },
  [EPaymentStatus.notPaid]: { colorTag: "red", statusText: "Não Pago", tooltipText: "Aguardando pagamento" },
  [EPaymentStatus.canceled]: { colorTag: "gray", statusText: "Cancelado", tooltipText: "Pagamento cancelado" },
};

export function getCompanyPaymnetConfig(status: EPaymentStatus) {
  return companyStatusConfigMap[status];
}
