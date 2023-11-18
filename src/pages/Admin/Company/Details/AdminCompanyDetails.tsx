import { Divider, Progress } from "@chakra-ui/react";
import { useCompanyByParam } from "../hooks/useCompanyByParam";
import { CompanyCards } from "./components/CompanyCards";
import { SubscriptionPaymentsTable } from "./components/SubscriptionPaymentsTable";

export function AdminCompanyDetails() {
  const { company, isLoading } = useCompanyByParam();

  if (isLoading || !company) {
    return (
      <Progress size='xs' isIndeterminate />
    )
  }

  return (
    <>
      <CompanyCards company={company} />
      <Divider />
      <SubscriptionPaymentsTable />
    </>
  )
}