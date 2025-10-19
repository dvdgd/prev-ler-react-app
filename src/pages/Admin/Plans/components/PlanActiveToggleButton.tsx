import { HStack, Switch, Text, useToast } from "@chakra-ui/react";
import { queryClient } from "@config/tanStackQueryClient";
import { useShowToastErrorHandler } from "@hooks/useShowToastErrorHandler";
import { PlanRepositorySupabase } from "@adapters/supabase/PlanRepositorySupabase";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { TPlan } from "@core/entities/plan";

type PlanActiveToggleButtonProps = {
  plan: TPlan,
}

export function PlanActiveToggleButton({ plan }: PlanActiveToggleButtonProps) {
  const { showErrorToast } = useShowToastErrorHandler();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      const active = !plan.active;
      await new PlanRepositorySupabase().setPlanActive(plan.planId || 0, active);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast({
        title: `Plano #${plan.planId} ${plan.active ? "ativado" : "desativado"} com sucesso`,
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast.closeAll();
      showErrorToast({
        error,
        toastAttributes: {
          title: "Erro ao atualizar plano",
          description: "Ocorreu um erro ao desativar/ativar o plano.",
        }
      });
    }
  })

  const onChange = useCallback(
    () => mutation.mutate(),
    [mutation]
  );

  return (
    <>
      <HStack spacing={2}>
        <Switch isChecked={plan.active} onChange={onChange} />
        <Text>{plan.active ? "Sim" : "Não"}</Text>
      </HStack>
    </>
  );
}