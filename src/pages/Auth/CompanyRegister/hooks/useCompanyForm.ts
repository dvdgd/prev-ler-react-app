import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TCompany } from "../../../../@types/company";
import { useAuth } from "../../../../hooks/useCurrentUser";
import { NewCompany } from "../../../../shared/services/auth/NewCompanyService";

export function useCompanyForm() {
  const { userSession, setUserSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm<TCompany>();

  const handleNewCompany: SubmitHandler<TCompany> = async (formAttributes) => {
    try {
      setIsLoading(true);
      const newCompany = await NewCompany(formAttributes);
      if (!userSession?.user?.id) return;
      const user = Object.assign(userSession, {
        user: {
          company: newCompany
        }
      });
      setUserSession(user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    register,
    handleSubmit,
    setValue,
    getValues,
    handleNewCompany,
  }
}
