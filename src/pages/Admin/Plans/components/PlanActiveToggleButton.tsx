import { HStack, Switch, Text, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { TPlan } from "../../../../@types/plan";
import { queryClient } from "../../../../config/tanStackQueryClient";
import { useShowToastErrorHandler } from "../../../../hooks/useShowToastErrorHandler";
import { PlanService } from "../../../../shared/services/PlanService";

type PlanActiveToggleButtonProps = {
  plan: TPlan,
}

export function PlanActiveToggleButton({ plan }: PlanActiveToggleButtonProps) {
  const [isChecked, setIsChecked] = useState(plan.active);
  const { showErrorToast } = useShowToastErrorHandler();
  const toast = useToast();

  const onSwitch = async () => {
    try {
      const active = !isChecked
      const updatedPlan = await new PlanService().setPlanActive(plan.planId || 0, active);
      setIsChecked(updatedPlan.active);
      toast({
        title: `Plano #${plan.planId} ${active ? "ativado" : "desativado"} com sucesso`,
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast.closeAll();
      showErrorToast({
        error,
        toastAttributes: {
          title: "Erro ao atualizar plano",
          description: "Ocorreu um erro ao desativar/ativar o plano.",
        }
      });
    }
  }

  const mutation = useMutation({
    mutationFn: onSwitch,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["plans"] }),
  })

  const onChange = useCallback(
    () => mutation.mutate(),
    [mutation]
  );

  return (
    <>
      <HStack spacing={2}>
        <Text>Não</Text>
        <Switch isChecked={isChecked} onChange={onChange} />
        <Text>Sim</Text>
      </HStack>
    </>
  );
}