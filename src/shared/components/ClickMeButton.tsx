import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

type TClickMeButtonProps = {
  text: string;
  onClick: () => void;
} & ChakraButtonProps;

export function ClickMeButton({ onClick, text, ...props }: TClickMeButtonProps) {
  return (
    <Button
      px={8}
      bg={"brand.700"}
      color={'white'}
      rounded={'md'}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  )
}
