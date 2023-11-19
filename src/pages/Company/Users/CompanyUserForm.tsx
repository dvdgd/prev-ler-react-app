import { Box, Button, FormControl, FormLabel, HStack, Input, Select, SimpleGrid, Switch, Text } from "@chakra-ui/react";
import { Controller, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { EUserType } from "types/profile";
import { FormCard } from "../../../shared/components/Card/FormCard";
import { useCompanyUserForm } from "./hooks/useCompanyUserForm";
import { useJobRoles } from "./hooks/useJobRoles";

const usersTypeOptions = [
  { value: EUserType.funcionario, label: "Funcionário" },
  { value: EUserType.profissional_saude, label: "Profissional de Saúde" },
]

export function CompanyUserForm() {
  const { userId } = useParams();
  const title = userId ? "Editar Usuário" : "Criar Usuário"

  const { formMethods, isLoading, onFormSubmit } = useCompanyUserForm();
  const { register, control } = formMethods;

  const { jobRoles } = useJobRoles();

  return (
    <>
      <Box>
        <FormProvider {...formMethods}>
          <form onSubmit={onFormSubmit}>
            <FormCard title={title}>
              <FormControl>
                <FormLabel htmlFor="isAuthorized">Ativo</FormLabel>
                <Controller
                  name="isAuthorized"
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
                  <FormLabel htmlFor="firstname">Nome</FormLabel>
                  <Input id="firstname" type="text" {...register("firstname")} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="lastname">Sobrenome</FormLabel>
                  <Input id="lastname" type="text" {...register("lastname")} />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input id="email" type="text" {...register("email")} />
              </FormControl>

              <SimpleGrid w="full" columns={[1, 2]} spacingX={4} spacingY={8}>
                <FormControl isRequired>
                  <FormLabel>Cargo</FormLabel>
                  <Controller
                    name="jobRole.jobRoleId"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} placeholder="Selecione">
                        {jobRoles.map((jobRole) => {
                          return (
                            <option key={jobRole.jobRoleId} value={jobRole.jobRoleId}>
                              {jobRole.jobName}
                            </option>
                          );
                        })}
                      </Select>
                    )}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Tipo</FormLabel>
                  <Controller
                    name="type"
                    control={control}
                    // defaultValue={EUserType.funcionario}
                    render={({ field }) => (
                      <Select {...field} placeholder="Selecione">
                        {usersTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
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
      </Box>
    </>
  )
}
