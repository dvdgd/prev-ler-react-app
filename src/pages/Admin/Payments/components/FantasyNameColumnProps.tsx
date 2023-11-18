import {
  Link,
  Text,
  Tooltip
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type FantasyNameColumnProps = {
  fantasyName: string;
  companyId: string;
}

export function FantasyNameColumnProps({ fantasyName, companyId }: FantasyNameColumnProps) {
  const navigate = useNavigate();
  const companyRoute = `/auth/admin/dashboard/companies/${companyId}`

  return (
    <Tooltip label={fantasyName}>
      <Link onClick={() => navigate(companyRoute)}>
        <Text textOverflow={"clip"} overflow={"hidden"} whiteSpace={"nowrap"}>
          {fantasyName}
        </Text>
      </Link>
    </Tooltip>
  )
}
