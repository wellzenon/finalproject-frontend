import Router from "next/router";
import Layout from "../components/layout";
import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form } from "formik";
import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { Center, Stack } from "@chakra-ui/layout";
import { Alert, AlertIcon, Icon } from "@chakra-ui/react";
import { HiUserCircle } from "react-icons/hi";
import { signUp } from "../lib/auth";
import { TextInput, SelectInput } from "../components/forms-inputs";

const SignupForm = () => {
  const [info, setInfo] = useState("");

  const lastMonthDay = (month, year) => {
    //calculates the last day of the month based on the month(0-11) and year

    if (month === 1 && year % 4 === 0 && year % 400 !== 0) return 29;

    if (month === 1) return 28;

    if ((month < 7 && month % 2 === 1) || (month >= 7 && month % 2 === 0))
      return 30;

    return 31;
  };

  //creates an array of integers starting from start to end
  const range = (start, end) => [...Array(end + 1).keys()].slice(start);

  //builds the array of {value, label} from day 1 to last day
  const days = ({ month, year }) =>
    range(1, lastMonthDay(month.value, year.value)).map((day) => ({
      value: day,
      label: day,
    }));

  const months = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
  ];

  //builds the array of {value, label} from the current year to 100 years back
  const thisYear = new Date().getFullYear();
  const years = range(thisYear - 100, thisYear)
    .map((year) => ({
      value: year,
      label: year,
    }))
    .reverse();

  //Formik fields initial values
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm: "",
    day: "",
    month: "",
    year: "",
  };

  //Formik fields validation rules
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    confirm: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    day: Yup.object().shape({
      value: Yup.number().required("Required"),
      label: Yup.string().required("Required"),
    }),
    month: Yup.object().shape({
      value: Yup.number().required("Required"),
      label: Yup.string().required("Required"),
    }),
    year: Yup.object().shape({
      value: Yup.number().required("Required"),
      label: Yup.string().required("Required"),
    }),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const {
      day: { value: day },
      month: { value: month },
      year: { value: year },
      ...data
    } = values;

    data.birthday = new Date(year, month, day);

    const { ok, json } = await signUp(data);
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
        {({ values, handleSubmit }) => (
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
              label="Email Address"
              name="email"
              type="email"
              placeholder="example@site.com"
            />
            <TextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Insert password here"
            />
            <TextInput
              label="Confirm Password"
              name="confirm"
              type="password"
              placeholder="Confirm password here"
            />
            <FormLabel>Birthday</FormLabel>
            <Stack
              direction="row"
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              padding={3}
            >
              <SelectInput
                label="Day"
                name="day"
                type="text"
                options={days(values)}
                instanceId="unique"
              />
              <SelectInput
                label="Month"
                name="month"
                type="text"
                options={months}
                instanceId="unique"
              />
              <SelectInput
                label="Year"
                name="year"
                type="text"
                options={years}
                instanceId="unique"
              />
            </Stack>
            <Button type="submit"> Register </Button>
          </Stack>
        )}
      </Formik>
    </Layout>
  );
};

export default SignupForm;
