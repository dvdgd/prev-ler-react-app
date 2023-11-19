import { Center, HStack } from "@chakra-ui/react"
import { DeleteIconAction } from "@shared/components/DeleteIconAction"
import { EditIconAction } from "@shared/components/EditIconAction"
import { ViewIconAction } from "@shared/components/ViewIconAction"
import { useNavigate } from "react-router-dom"
import { TCompanyUser } from "types/company-user"

type CompanyUsersTableOptionsProps = {
  userCompany: TCompanyUser
}

export function CompanyUsersTableOptions({ userCompany }: CompanyUsersTableOptionsProps) {
  const navigate = useNavigate();

  const onEditClick = () => {
    const route = `create/${userCompany.userId}`
    navigate(route);
  }

  return (
    <>
      <Center>
        <HStack alignContent={"space-around"} paddingX={3}>
          <ViewIconAction onClick={() => { console.log(userCompany) }} aria-label={"Visualizar"} />
          <EditIconAction onClick={onEditClick} aria-label={"Editar"} />
          <DeleteIconAction deleteFn={() => { }} aria-label={"Excluir"} />
        </HStack>
      </Center>
    </>
  )
}
