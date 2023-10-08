import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { features } from "../data";

export default function FeaturesSection() {

  return (
    <Container id="features" maxW="container.md" centerContent py={[8, 28]}>
      <SimpleGrid spacingX={10} spacingY={20} minChildWidth="300px">
        {features.map(({ title, description, icon }, i: number) => (
          <Box p={4} rounded="md" key={`highlight_${i}`}>
            <Text fontSize="4xl">{icon}</Text>

            <Text fontWeight={500}>{title}</Text>

            <Text color="gray.500" mt={4}>
              {description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}