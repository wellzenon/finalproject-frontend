import React from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useUser } from "hooks";
import { Link, LanguageSelect, LogoVai } from "components";

const MenuItem = ({ children, to = "/", hasSubPath, ...rest }) => {
  const { pathname } = useRouter();
  const isActive = hasSubPath ? pathname.startsWith(to) : pathname === to;

  return (
    <Link
      href={to}
      margin={3}
      borderBottom={`0.2rem solid ${isActive ? "" : "transparent"}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

const Menu = (props) => {
  const { data: user, logOut } = useUser();
  const { push } = useRouter();
  const t = useTranslations("Menu");

  const logUserOut = () => {
    logOut();
    push("/");
  };

  const login = <MenuItem to="/login">{t(`login`).toUpperCase()}</MenuItem>;
  const signup = <MenuItem to="/signup">{t(`signup`).toUpperCase()}</MenuItem>;
  const profile = <MenuItem to="/profile">{user?.username}</MenuItem>;
  const logout = (
    <MenuItem to="" onClick={logUserOut}>
      {t(`logout`).toUpperCase()}
    </MenuItem>
  );

  return (
    <Flex
      //as="menu"
      width="100%"
      zIndex={1}
      bottom={0}
      alignItems="center"
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
      <MenuItem to="/search">{t(`search`).toUpperCase()}</MenuItem>
      {user?.id ? profile : login}
      {user?.id ? logout : signup}
      <LanguageSelect />
    </Flex>
  );
};

export { Menu };
