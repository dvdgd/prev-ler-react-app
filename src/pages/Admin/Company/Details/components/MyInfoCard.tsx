import { Box, BoxProps, Card, CardBody, Stat, StatLabel, VStack } from "@chakra-ui/react";
import { IChildrenProps } from "types/react-base-props";

type MyCardProps = IChildrenProps & {
  title: string;
  minH?: BoxProps["minH"]
};

export function MyInfoCard({ title, children, minH }: MyCardProps) {
  return (
    <>
      <Box w={"full"} minW={"200px"}>
        <Card size={["lg"]}  >
          <CardBody>
            <VStack alignItems={"flex-start"}>
              <Stat me='auto'>
                <StatLabel
                  fontSize='sm'
                  color='gray.400'
                  fontWeight='bold'
                  pb='.1rem'
                >
                  {title}
                </StatLabel>
              </Stat>
              <Box
                w={"full"}
                minH={minH || "132px"}
              >
                {children}
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </>
  )
}