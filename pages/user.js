import {
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  Stack,
  Button,
  Center,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import Layout from "../components/layout";
import { subYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function NewUser({ ...props }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirm: "",
    birth: new Date(),
    birthday: {value:0, error: ""},
    birthmonth:0,
    birthyear:0,
    name: "",
    picture: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value })
  }

  const handleChangeX = ({ target: { name, value } }) => {
    const error = name === "birthday" && 0 < value && value <=31 ? "" : "invalid day" 
    setFormValues({ ...formValues, [name]: {value: value, error: error} })
    console.log(formValues)
  }

  const saveEvent = async (event) => {
    event.preventDefault();

    const res = await fetch("api/events/", {
      method: "POST",
      body: JSON.stringify(formValues),
    });
  };

  const isOverAge = (date) => date <= subYears(new Date(), 18);

  return (
    <Layout>
      <Center>
        <Stack
          padding={4}
          width={{ md: "60%", lg: "50%" }}
          as="form"
          onSubmit={saveEvent}
        >
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
              placeholder="Insert password here"
              value={formValues["password"]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="confirm">
            <FormLabel>Confirm password</FormLabel>
            <Input
              name="confirm"
              placeholder="Confirm pasword here"
              value={formValues["confirm"]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="birth">
            <FormLabel>Birth date</FormLabel>
            <Stack direction="row">
              <InputGroup>
                <InputLeftAddon>Day</InputLeftAddon>
                <Input
                  name="birthday"
                  value={formValues.birthday.value}
                  onChange={handleChangeX}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Month</InputLeftAddon>
                <Input
                  name="birthmonth"
                  value={formValues.birthmonth}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Year</InputLeftAddon>
                <Input
                  name="birthyear"
                  value={formValues.birthyear}
                  onChange={handleChange}
                />
              </InputGroup>
            </Stack>
            <FormErrorMessage>{formValues.birthday.error}</FormErrorMessage>
          </FormControl>
          <Button type="submit"> Register </Button>
        </Stack>
      </Center>
    </Layout>
  );
}
