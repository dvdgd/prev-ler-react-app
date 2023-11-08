import { Box, Card, CardBody, CardHeader, CardProps, Heading, HeadingProps, VStack } from "@chakra-ui/react";

export type BaseCardProps = {
  children: React.ReactNode;
  title: string;
  titleSize?: HeadingProps["size"];
  spacing?: number;
} & CardProps;

export function BaseCard({ children, title, titleSize, ...props }: BaseCardProps) {
  return (
    <Box w={"full"}>
      <Card
        p={2}
        direction={"column"}
        align={"start"}
        justifyContent={"space-around"}
        {...props}
      >
        <CardHeader>
          <Heading textOverflow={"clip"} size={titleSize}>
            {title}
          </Heading>
        </CardHeader>
        <CardBody w={"full"}>
          <VStack spacing={8}>
            {children}
          </VStack>
        </CardBody>
      </Card>
    </Box>
  )
}
