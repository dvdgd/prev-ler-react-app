import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, Wrap } from "@chakra-ui/react";
import { Controller, FormProvider } from "react-hook-form";
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

  const { register, control } = formMethods;
  return (
    <Box>
      <FormProvider {...formMethods}>
        <form onSubmit={onFormSubmit}>
          <FormCard title={"Cadastrar Plano"}>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Título</FormLabel>
              <Input id="title" type="text" {...register("title")} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="description">Descricao</FormLabel>
              <Textarea id="description" {...register("description")} />
            </FormControl>
            <Wrap>
              <Box w="192px">
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
              </Box>
              <Box w="192px">
                <FormControl isRequired>
                  <FormLabel htmlFor="value">Valor</FormLabel>
                  <Input
                    id="value"
                    type="number"
                    {...register("value")}
                  />
                </FormControl>
              </Box>
            </Wrap>
            <FormControl isRequired>
              <FormLabel htmlFor="maxUsers">Qtd. de Usuários</FormLabel>
              <Input id="maxUsers" type="number" {...register("maxUsers")} />
            </FormControl>
            <Button
              colorScheme="brand"
              size="md"
              w="100%"
              mt="5"
              type="submit"
              isLoading={isLoading}
            >
              Salvar
            </Button>
          </FormCard>
        </form>
      </FormProvider>
    </Box>
  );
};
