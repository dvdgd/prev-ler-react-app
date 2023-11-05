import { Card, CardBody, CardProps, Flex, FlexProps, Stat, StatLabel } from "@chakra-ui/react";
import { IChildrenProps } from "../../../@types/react-base-props";

type MiniStatisticsCardProps = {
  title: string,
  icon: React.ReactNode,
  minW?: CardProps["minW"]
} & IChildrenProps

function IconBox({ children, ...props }: IChildrenProps & FlexProps) {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"12px"}
      {...props}
    >
      {children}
    </Flex>
  )
}

export function MiniInfoCard({ title, icon, children, minW }: MiniStatisticsCardProps) {
  return (
    <Card minH='83px' w={"full"} minW={minW ?? "200px"}>
      <CardBody>
        <Flex flexDirection='row' align='center' justify='center' columnGap={[4]}>
          <Stat me='auto'>
            <StatLabel
              fontSize='sm'
              color='gray.400'
              fontWeight='bold'
              pb='.1rem'
            >
              {title}
            </StatLabel>
            <Flex>
              {children}
            </Flex>
          </Stat>
          <IconBox
            h={"45px"} w={"45px"} bg={"brand.300"}
          >
            {icon}
          </IconBox>
        </Flex>
      </CardBody>
    </Card>
  );
}