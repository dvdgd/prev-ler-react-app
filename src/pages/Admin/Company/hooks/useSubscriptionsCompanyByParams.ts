import { container } from "tsyringe";
import { ISubscriptionPort } from "@core/ports/subscription.port";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useSubscriptionsCompanyByParams() {
  const subscriptionService = container.resolve<ISubscriptionPort>("SubscriptionRepository");
  const { companyId } = useParams();

  const {
    data: subscriptions,
    isLoading
  } = useQuery({
    queryKey: ["company", "subscriptions", companyId],
    queryFn: () => subscriptionService.getAllSubscriptionsByCompanyId(companyId || "")
  });

  return {
    subscriptions,
    isLoading
  }
}
