export interface IAdminDashboardPort {
  getPaymentsGroupByMonthAndStatus(date: Date): Promise<{ paymentStatus: string; qtdStatus: number }[]>;
}
