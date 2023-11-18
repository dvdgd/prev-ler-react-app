import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SubscriptionService } from "../../../../shared/services/SubscriptionService";

export function useSubscriptionsCompanyByParams() {
  const subscriptionService = new SubscriptionService();
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
