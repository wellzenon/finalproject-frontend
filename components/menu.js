import React, { useEffect } from "react";
import Link from "next/link";
import { Flex, Box, Text } from "@chakra-ui/react";
import LogoVai from "./logo";
import { useUser } from "../hooks/useUser";

const MenuItem = ({ children, to = "/", ...rest }) => {
  return (
    <Box marginX={3} display="block" cursor="pointer" {...rest}>
      <Link href={to}>{children}</Link>
    </Box>
  );
};

const Menu = (props) => {
  const { data: user, logOut } = useUser();

  const login = <MenuItem to="/login">LOGIN</MenuItem>;
  const signup = <MenuItem to="/signup">SIGN UP</MenuItem>;
  const profile = <MenuItem to="/profile">{user?.username}</MenuItem>;
  const logout = (
    <MenuItem to="/" onClick={logOut}>
      LOGOUT
    </MenuItem>
  );

  return (
    <Flex
      //as="menu"
      width="100%"
      zIndex={1}
      bottom={0}
      align="center"
      position={{ base: "fixed", md: "relative" }}
      justify={{ base: "space-evenly", md: "flex-end" }}
      {...props}
    >
      <MenuItem
        to="/"
        marginRight={{
          base: null,
          md: "auto",
        }}
      >
        <LogoVai color="black" height="2em" padding={3} />
      </MenuItem>
      <MenuItem to="/search">SEARCH</MenuItem>
      {user?.id ? profile : login}
      {user?.id ? logout : signup}
    </Flex>
  );
};

export default Menu;
