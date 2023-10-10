import { Box, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";

interface FormCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  spacing?: number;
}

export function FormCard({ children, title, subtitle, spacing }: FormCardProps) {
  return (
    <Flex
      marginY={8}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            {title}
          </Heading>
          {
            subtitle &&
            <Heading fontSize={'2xl'}>
              {subtitle}
            </Heading>
          }
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={spacing || 10}>
            {children}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
