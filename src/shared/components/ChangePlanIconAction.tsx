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
  useMediaQuery
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TPlan } from "../../@types/plan";
import { useAuth } from "../../hooks/useCurrentUser";
import { usePlans } from "../../hooks/usePlans";
import { useShowToastErrorHandler } from "../../hooks/useShowToastErrorHandler";
import { SubscriptionService } from "../services/SubscriptionService";
import { MyIconButton } from "./MyIconButton";

type TChangePlanForm = {
  newPlanId: number,
}

export function ChangePlanIconAction({ ...props }) {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorToast } = useShowToastErrorHandler();
  const { handleSubmit, control } = useForm<TChangePlanForm>();
  const { fetchAllPlans } = usePlans();
  const [plans, setPlans] = useState<TPlan[]>([]);
  const { userSession } = useAuth();
  const companyPlan = userSession?.user?.company?.subscriptions?.at(0)?.plan

  const getPlans = async () => {
    const allPlans = await fetchAllPlans();
    const plansWithoutActualPlan = allPlans?.filter(({ planId }) => {
      return planId !== companyPlan?.planId
    })
    setPlans(plansWithoutActualPlan || []);
  }

  useEffect(() => {
    getPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlanChange: SubmitHandler<TChangePlanForm> = async ({ newPlanId }) => {
    try {
      setIsLoading(true);
      await new SubscriptionService().changeSubscription(
        userSession?.user?.company?.cnpj || "",
        newPlanId,
        companyPlan?.planId || 0
      );

    } catch (error) {
      showErrorToast({
        error,
        toastAttributes: {
          title: "Erro inesperado.",
          description: "Desculpe, não foi possível alterar seu plano.",
          status: "error",
          duration: 3000,
        },
      });
    } finally {
      onClose()
      setIsLoading(false);
    }
  };

  return (
    <>
      <MyIconButton
        aria-label={""}
        onClick={onOpen}
        cursor="pointer"
        {...props}
        size={"md"}>
      </MyIconButton>

      <Modal isCentered size={isLargerThan900 ? "lg" : "xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(9px)" />

        <form onSubmit={handleSubmit(handlePlanChange)}>
          <ModalContent>
            <ModalHeader>Seleção de plano</ModalHeader>
            <ModalCloseButton />
            <ModalBody marginBottom={8}>
              <Stack spacing={5}>
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

              </Stack>
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
                loadingText="Excluindo..."
                isLoading={isLoading}
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
