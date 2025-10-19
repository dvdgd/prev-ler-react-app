import { SubscriptionRepositorySupabase } from "@adapters/supabase/SubscriptionRepositorySupabase";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useSubscriptionsCompanyByParams() {
  const subscriptionService = new SubscriptionRepositorySupabase();
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
