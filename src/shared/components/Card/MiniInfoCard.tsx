import { Card, CardBody, Flex, FlexProps, Stat, StatLabel } from "@chakra-ui/react";
import { IChildrenProps } from "../../../@types/react-base-props";

type MiniStatisticsCardProps = {
  title: string,
  icon: React.ReactNode,
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

export function MiniInfoCard({ title, icon, children }: MiniStatisticsCardProps) {
  return (
    <Card minH='83px'>
      <CardBody>
        <Flex flexDirection='row' align='center' justify='center' w='100%' columnGap={10}>
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