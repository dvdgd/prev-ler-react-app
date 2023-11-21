import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { features } from "../data";

export default function FeaturesSection() {

  return (
    <VStack id="features" w={"full"} py={[18, 28]} mt={100} >
      <SimpleGrid spacingX={10} spacingY={20} minChildWidth={["full", "300px"]}>
        {features.map(({ title, description, icon }, i: number) => (
          <Box rounded="md" key={`highlight_${i}`}>
            <Text fontSize="4xl">{icon}</Text>

            <Text fontWeight={500}>{title}</Text>

            <Text color="gray.500" mt={4}>
              {description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
}