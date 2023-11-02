import { Card, CardBody, CardHeader, CardProps, Heading, VStack } from "@chakra-ui/react";

export type BaseCardProps = {
  children: React.ReactNode;
  title: string;
  spacing?: number;
} & CardProps;

export function BaseCard({ children, title, ...props }: BaseCardProps) {
  return (
    <Card
      p={2}
      m={8}
      direction={"column"}
      align={"start"}
      justifyContent={"space-around"}
      {...props}
    >
      <CardHeader>
        <Heading fontSize={"4xl"} textOverflow={"clip"}>
          {title}
        </Heading>
      </CardHeader>
      <CardBody w={"full"}>
        <VStack spacing={8}>
          {children}
        </VStack>
      </CardBody>
    </Card>
  )
}
