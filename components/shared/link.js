import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

const Link = ({ children, href = "/", hasSubPath, ...rest }) => (
  <NextLink href={href} passHref>
    <ChakraLink {...rest}>{children}</ChakraLink>
  </NextLink>
);

export { Link };
