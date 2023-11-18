import { Center } from "@chakra-ui/react";
import { MdDoubleArrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TCompany } from "../../../../@types/company";
import { MyIconButton } from "../../../../shared/components/MyIconButton";

type OptionsProps = {
  company: TCompany
}

export function AdminCompanyTableOptions({ company }: OptionsProps) {
  const navigate = useNavigate();

  return (
    <>
      <Center>
        <MyIconButton
          aria-label={"Detalhes"}
          color="brand.600"
          icon={<MdDoubleArrow />}
          buttonFn={() => {
            navigate(company.cnpj);
          }}
        />
      </Center>
    </>
  )
}