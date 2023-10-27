import { Button, VStack } from "@chakra-ui/react"
import { PlansTableAntd } from "./components/PlansTableAntd"

export function AdminPlans() {
  return (
    <>
      <VStack>
        <PlansTableAntd />
        <Button colorScheme="brand" size={"lg"}>
          Novo
        </Button>
      </VStack>
    </>
  )
}
