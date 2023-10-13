import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

type TMyLinkAttributes = {
  children: React.ReactNode;
} & ReactRouterLinkProps & ChakraLinkProps;

export const MyLink = ({ children, ...linkProps }: TMyLinkAttributes) => {
  return (
    <ChakraLink as={ReactRouterLink} {...linkProps}>
      {children}
    </ChakraLink>
  )
}
