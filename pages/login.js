import { useState } from "react";
import Router from "next/router";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { Alert, AlertIcon, Icon } from "@chakra-ui/react";
import { HiUserCircle } from "react-icons/hi";
import { login } from "../lib/auth";
import Layout from "../components/layout";
import { TextInput } from "../components/forms-inputs";

const LoginForm = () => {
  const [info, setInfo] = useState("");

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
    ok ? Router.push(`/`) : setInfo(json?.info);
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default LoginForm;
