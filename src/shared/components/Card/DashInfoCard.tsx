import { Box, BoxProps, Card, CardBody, CardProps, Flex, FlexProps, Stat, StatLabel } from "@chakra-ui/react";
import { IChildrenProps } from "../../../@types/react-base-props";

type DashInfoCardProps = {
  title: string,
  icon: React.ReactNode,
  minW?: CardProps["minW"]
} & IChildrenProps & BoxProps

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

export function DashInfoCard({ title, icon, children, minW, ...props }: DashInfoCardProps) {
  return (
    <Box w={"full"} minW={minW ?? "200px"} {...props}>
      <Card size={["lg"]} >
        <CardBody>
          <Flex flexDirection='row' align='center' justify='center' columnGap={[4]}>
            <Stat me='auto'>
              <StatLabel
                fontSize='xl'
                color='black'
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
              h={"45px"} w={"45px"} bg={"blue.300"}
            >
              {icon}
            </IconBox>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
}