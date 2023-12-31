import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { queryClient } from "../../config/tanStackQueryClient";
import { useAuth } from "../../hooks/useCurrentUser";
import { usePlans } from "../../hooks/usePlans";
import { useShowToastErrorHandler } from "../../hooks/useShowToastErrorHandler";
import { SubscriptionService } from "../services/SubscriptionService";
import { MyIconButton } from "./MyIconButton";

type TChangePlanForm = {
  newPlanId: number,
}

export function ChangePlanIconAction({ ...props }) {
  const formMethods = useForm<TChangePlanForm>();
  const { handleSubmit, control } = formMethods

  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { showErrorToast } = useShowToastErrorHandler();
  const { allPlans } = usePlans();
  const { userSession } = useAuth();

  const companyPlan = userSession?.user?.company?.subscriptions?.at(0)?.plan
  const toast = useToast();

  const plans = allPlans?.filter(({ planId }) => {
    return planId !== companyPlan?.planId
  }) || [];

  const changePlanMutation = useMutation({
    mutationFn: async () => {
      const formValues = formMethods.getValues();
      await new SubscriptionService().changeSubscription(
        userSession?.user?.company?.cnpj || "",
        formValues.newPlanId,
        companyPlan?.planId || 0
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      onClose();
      toast({
        title: "Você mudou de plano com sucesso.",
        duration: 3000,
        status: "success",
      });
    },
    onError: (error) => {
      onClose();
      showErrorToast({
        error,
        toastAttributes: {
          title: "Erro inesperado.",
          description: "Desculpe, não foi possível alterar seu plano.",
          status: "error",
          duration: 3000,
          isClosable: true,
        },
      });
    }
  })

  const onSubmit = useCallback(
    () => changePlanMutation.mutate(),
    [changePlanMutation]
  )

  return (
    <>
      <MyIconButton
        aria-label={""}
        buttonFn={onOpen}
        cursor="pointer"
        {...props}
        size={"md"}>
      </MyIconButton>

      <Modal isCentered size={isLargerThan900 ? "lg" : "xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(9px)" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Seleção de plano</ModalHeader>
            <ModalCloseButton />
            <ModalBody marginBottom={8}>
              {companyPlan ? <Stack spacing={5}>
                <Text fontSize={"lg"} color={"red.500"} marginBottom={5}>
                  Atenção! Ao trocar de plano, o mesmo só estará disponível para uso após a efetuação do pagamento deste novo plano.
                </Text>
                <Text fontWeight={600} fontSize={"lg"}>
                  Plano Atual
                </Text>
                <Stack spacing={-1}>
                  <Text fontSize={"md"}>
                    Plano
                  </Text>
                  <Text fontWeight={500}>
                    {companyPlan?.title}
                  </Text>
                </Stack>

                <Stack spacing={-1}>
                  <Text fontSize={"md"}>
                    Descrição
                  </Text>
                  <Text fontWeight={500}>
                    {companyPlan?.description}
                  </Text>
                </Stack>

                <Stack spacing={-1}>
                  <Text fontSize={"md"}>
                    Valor
                  </Text>
                  <Text fontWeight={500}>
                    {companyPlan?.value}{"/"}{companyPlan?.periodicy}
                  </Text>
                </Stack>

                <Stack spacing={-1} marginBottom={5}>
                  <Text fontSize={"md"}>
                    Quantidade máxima de usuários
                  </Text>
                  <Text fontWeight={500}>
                    {companyPlan?.maxUsers} {"usuários"}
                  </Text>
                </Stack>
              </Stack> : ""}
              <FormControl isRequired marginTop={8}>
                <FormLabel>Selecione abaixo o novo plano</FormLabel>
                <Controller
                  name="newPlanId"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} placeholder="Selecione">
                      {plans.map((plan) => {
                        const periodicyText = plan.periodicy === "mensais" ? "mês" : "ano";
                        return (
                          <option key={plan.planId} value={plan.planId}>
                            {plan.title}, R${plan.value}/{periodicyText}, {plan.maxUsers} usuários
                          </option>
                        );
                      })}
                    </Select>
                  )}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                loadingText="Aguarde..."
                isLoading={changePlanMutation.isPending}
                mr={3}
                type="submit"
              >
                Trocar plano
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
