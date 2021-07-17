import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Center,
  FormErrorMessage,
} from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";
import Layout from "../components/layout";
import { useUserContext } from "../components/context/state";
import { login } from "../lib/auth";

export default function LogIn() {
  const [info, setInfo] = useState("");
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = await login(formValues);

    const { ok, json } = await login(formValues);
    ok ? Router.push(`/`) : setInfo(json);
  };

  return (
    <Layout>
      <Stack
        as="form"
        spacing={4}
        padding={4}
        width="100%"
        maxWidth="50rem"
        alignSelf="center"
        onSubmit={handleLogin}
      >
        <FormControl isInvalid={info || false}>
          <FormErrorMessage justifyContent="center">{info}</FormErrorMessage>
        </FormControl>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            placeholder="Insert username here"
            value={formValues["username"]}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Insert password here"
            value={formValues["password"]}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit"> Login </Button>
      </Stack>
    </Layout>
  );
}
