import { Box, Button, FormControl, FormLabel, HStack, Input, Select, SimpleGrid, Switch, Text, Textarea } from "@chakra-ui/react";
import { Controller, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FormCard } from "../../../../shared/components/Card/FormCard";
import { usePlanForm } from "../hooks/usePlanForm";

export const PlansForm = () => {
  const {
    isLoading,
    formMethods,
    onFormSubmit
  } = usePlanForm();

  const periodicyOptions = [
    { value: 'mensais', label: 'Mensal' },
    { value: 'anual', label: 'Anual' },
  ];

  const { idPlan: idPlanParam } = useParams();
  const idPlan = parseInt(idPlanParam ?? '');

  const title = isNaN(idPlan) ? 'Criar novo plano' : 'Editar plano';

  const { register, control } = formMethods;
  return (
    <Box>
      <FormProvider {...formMethods}>
        <form onSubmit={onFormSubmit}>
          <FormCard title={title}>
            <FormControl>
              <FormLabel htmlFor="active">Ativo</FormLabel>
              <Controller
                name="active"
                control={control}
                defaultValue={true}
                render={({ field }) => (
                  <HStack>
                    <Switch isChecked={field.value} onChange={field.onChange} />
                    <Text>{field.value ? "Sim" : "Não"}</Text>
                  </HStack>
                )}
              />
            </FormControl>
            <SimpleGrid w="full" columns={[1, 2]} spacingX={4} spacingY={8}>
              <FormControl isRequired>
                <FormLabel htmlFor="title">Título</FormLabel>
                <Input id="title" type="text" {...register("title")} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Periodicidade</FormLabel>
                <Controller
                  name="periodicy"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} placeholder="Selecione">
                      {periodicyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </SimpleGrid>
            <FormControl isRequired>
              <FormLabel htmlFor="description">Descricao</FormLabel>
              <Textarea id="description" {...register("description")} />
            </FormControl>
            <SimpleGrid w="full" columns={[1, 2]} spacingX={4} spacingY={8}>
              <FormControl isRequired>
                <FormLabel htmlFor="value">Valor (R$)</FormLabel>
                <Input
                  id="value"
                  type="number"
                  {...register("value")}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="maxUsers">Qtd. de Usuários</FormLabel>
                <Input id="maxUsers" type="number" {...register("maxUsers")} />
              </FormControl>
            </SimpleGrid>
            <Button
              colorScheme="brand"
              size="md"
              mt="5"
              type="submit"
              isLoading={isLoading}
            >
              Salvar
            </Button>
          </FormCard>
        </form>
      </FormProvider>
    </Box >
  );
};
