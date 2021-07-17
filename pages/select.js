import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Center, Stack } from "@chakra-ui/layout";
import { Formik, Form, useField, useFormikContext } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import Select from "../components/chakra-react-select";


const SelectInput = ({ label, options, ...props }) => {
  const [field, meta, helper] = useField(props);
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    field.value 
    && !options.find(opt => opt === field.value)
    && setFieldValue(field.name, options.slice(-1)[0])
  },[values.month])

  return (
    <FormControl id={props.id} isInvalid={meta.touched && meta.error}>
      <FormLabel>{label}</FormLabel>
      <Select
        {...field}
        {...props}
        options={options}
        onBlur={helper.setTouched}
        value={values[field.name]}
        onChange={(value) => setFieldValue(field.name, value)}
      />
      <FormErrorMessage>{meta.error?.value}</FormErrorMessage>
    </FormControl>
  );
};

const lastMonthDay = (month, year) => {

  if (
    month === 1 
    && year%4 === 0 
    && year%400 !== 0
  )
    return 29
  
  if (month === 1)
    return 28

  if (
    month < 7 && month%2===1 
    || month >= 7 && month%2===0
  )
    return 30

  return 31
}

const range = (start, end) => [...Array(end+1).keys()].slice(start)

const SignupForm = () => {
 
  const days = ({ month, year }) => 
    range(1, lastMonthDay(month.value, year.value))
      .map( day => ({value: day, label: day}))
    
  
  const months = [
    {value: 0, label: "January"},
    {value: 1, label: "February"},
    {value: 2, label: "March"},
    {value: 3, label: "April"},
    {value: 4, label: "May"},
    {value: 5, label: "June"}, 
    {value: 6, label: "July"},
    {value: 7, label: "August"},
    {value: 8, label: "September"},
    {value: 9, label: "October"},
    {value: 10, label: "November"},
    {value: 11, label: "December"}
  ];

  const thisYear = new Date().getFullYear()
  const years = range(thisYear - 100, thisYear).map( year => ({value: year, label: year}))

  return (
    <Formik
      initialValues={{
        day: "",
        month: "",
        year: "",
      }}
      validationSchema={Yup.object({
        day: Yup.object()
          .shape({
            value: Yup.number().required(),
            label: Yup.string().required(),
          })
          .when("month", {
            is: (month) => {
              return month?.value === 1;
            },
            then: Yup.object().shape({
              value: Yup.number()
                .required()
                .max(29, `This month has only 29 days`),
              label: Yup.string().required(),
            }),
          }),
        month: Yup.object().shape({
          value: Yup.number().required(),
          label: Yup.string().required(),
        }),
        year: Yup.object().shape({
          value: Yup.number().required(),
          label: Yup.string().required(),
        }),
      })}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >{({values}) => (
      <Form>
        <Center>
          <Stack
            spacing={4}
            padding={4}
            width="50%"
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
            <Button type="submit"> Register </Button>
            <FormLabel>{JSON.stringify(values)}</FormLabel>
          </Stack>
        </Center>
      </Form>
    )}
    </Formik>
  );
};

export default SignupForm;
