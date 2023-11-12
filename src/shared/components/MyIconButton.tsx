import { IconButton, IconButtonProps, Tooltip } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

type MyIconButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
} & IconButtonProps;

export function MyIconButton({ onClick, ...props }: MyIconButtonProps) {
  return (
    <>
      <Tooltip label={props["aria-label"]}>
        <IconButton
          onClick={onClick}
          cursor="pointer"
          {...props}
        />
      </Tooltip>
    </>
  )
}
