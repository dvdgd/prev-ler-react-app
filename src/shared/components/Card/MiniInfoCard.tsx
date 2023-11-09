import { Box, Card, CardBody, CardProps, Flex, FlexProps, Stat, StatLabel } from "@chakra-ui/react";
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
    <Box w={"full"} minW={minW ?? "200px"}>
      <Card size={["lg"]} >
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
              <Flex
                fontSize={["xl", "2xl"]}
                fontWeight="medium"
              >
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
    </Box>
  );
}