import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useAuth } from "@hooks/useCurrentUser";
import { FormCard } from "@shared/components/Card/FormCard";
import { formatCnpj } from "@shared/functions/Formatters";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import MaskedInput from "react-input-mask";
import { useParams } from "react-router-dom";
import { useJobRoleForm } from "./hooks/useJobRoleForm";

export function JobRolesForm() {
  const { jobRoleId } = useParams();
  const title = jobRoleId ? "Editar Cargo" : "Criar Cargo";
  const { formMethods, isLoading, onFormSubmit } = useJobRoleForm();
  const { register } = formMethods;

  const { userSession } = useAuth();
  useEffect(() => {
    const cnpjFormatted = formatCnpj(userSession?.user?.company?.cnpj || "");
    formMethods.setValue("companyId", cnpjFormatted);
  }, [])

  return (
    <>
      <Box>
        <FormProvider {...formMethods}>
          <form onSubmit={onFormSubmit}>
            <FormCard title={title}>
              <FormControl isRequired>
                <FormLabel htmlFor="title">CNPJ</FormLabel>
                <Input
                  id="title"
                  as={MaskedInput}
                  mask="99.999.999/9999-99"
                  maskChar={null}
                  type="text"
                  isDisabled
                  {...register("companyId")}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="title">Nome</FormLabel>
                <Input id="title" type="text" {...register("jobName", {
                  onChange(e) {
                    formMethods.setValue('jobName', e.target.value.toUpperCase());
                  },
                })} />
              </FormControl>
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