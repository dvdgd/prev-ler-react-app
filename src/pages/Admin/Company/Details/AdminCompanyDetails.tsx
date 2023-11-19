import { Divider, Progress } from "@chakra-ui/react";
import { useCompanyByParam } from "../hooks/useCompanyByParam";
import { useSubscriptionsCompanyByParams } from "../hooks/useSubscriptionsCompanyByParams";
import { CompanyCards } from "./components/CompanyCards";
import { SubscriptionPaymentsTable } from "./components/SubscriptionPaymentsTable";

export function AdminCompanyDetails() {
  const { company, isLoading: isCompanyLoading } = useCompanyByParam();
  const { subscriptions, isLoading: isSubscriptionsLoading } = useSubscriptionsCompanyByParams();


  if (isCompanyLoading || !company) {
    return (
      <Progress size='xs' isIndeterminate />
    )
  }

  return (
    <>
      <CompanyCards company={company} />
      <Divider />
      {subscriptions?.map((s, index) => (
        <SubscriptionPaymentsTable
          key={`payments-subscription-${index}`}
          isLoading={isSubscriptionsLoading}
          subscription={s}
        />
      ))}
    </>
  )
}