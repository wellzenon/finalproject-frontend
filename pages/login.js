import { useState } from "react";
import Router from "next/router";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { Alert, AlertIcon, Icon } from "@chakra-ui/react";
import { HiUserCircle } from "react-icons/hi";
import { login } from "lib";
import { TextInput } from "components";
import { useUser } from "hooks";

const LoginForm = () => {
  const [info, setInfo] = useState("");
  const { mutate } = useUser();

  //Formik fields initial values
  const initialValues = {
    username: "",
    password: "",
  };

  //Formik fields validation rules
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const { ok, json } = await login(values);
    setSubmitting(false);
    mutate();
    ok ? Router.push(`/`) : setInfo(json?.info);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Stack
          as="form"
          spacing={4}
          padding={4}
          width="100%"
          maxWidth="50rem"
          alignSelf="center"
          onSubmit={handleSubmit}
        >
          <Icon as={HiUserCircle} boxSize={100} margin="auto" />
          {info && (
            <Alert status="warning" variant="solid" borderRadius={5}>
              <AlertIcon />
              {info}
            </Alert>
          )}
          <TextInput
            label="User name"
            name="username"
            type="text"
            placeholder="Type your username here"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Insert password here"
          />
          <Button type="submit"> Log in </Button>
        </Stack>
      )}
    </Formik>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`messages/shared/${locale}.json`),
        ...require(`messages/signup/${locale}.json`),
      },
    },
    revalidate: 10,
  };
}

export default LoginForm;
