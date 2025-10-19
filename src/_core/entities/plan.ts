export type TPlan = {
  planId?: number;
  createdAt?: Date;
  endDate?: Date;
  active: boolean;
  description: string;
  periodicy: string;
  maxUsers: number;
  title: string;
  value: number;
}
