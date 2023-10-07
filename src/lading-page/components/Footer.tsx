import { Box, Container, Text } from '@chakra-ui/react'

export function Footer() {
  return (
    <Box py={4}>
      <Container maxW="container.md" textAlign="center">
        <Text color="black">&copy; 2023 PrevlerLabs. Todos os direitos reservados.</Text>
      </Container>
    </Box >
  )
}
