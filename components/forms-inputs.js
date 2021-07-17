import { useEffect } from "react";
import { useField, useFormikContext } from "formik";
import Select from "../components/chakra-react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

const TextInput = ({ label, type, ...props }) => {
  //Text input component using chakra form components

  const [field, meta] = useField(props);

  return (
    <FormControl id={props.id} isInvalid={meta.touched && meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} {...props} type={type || "text"} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

const ImageInput = ({ label, type, children, ...props }) => {
  //Text input component using chakra form components

  const [field, meta] = useField(props);
  const { values, setFieldValue } = useFormikContext();

  const onChange = (e) => {
    debugger;
    console.log(e.target.files[0]);
    return setFieldValue(field.name, e.target.files[0]);
  };

  return (
    <FormControl id={props.id} isInvalid={meta.touched && meta.error}>
      <FormLabel>
        <FormLabel>{label}</FormLabel>
        {children}
      </FormLabel>
      <Input
        {...field}
        {...props}
        //display="none"
        type={type || "file"}
        //value={values[field.name]}
        onChange={(value) => {
          console.log(value);
          return setFieldValue(field.name, value.currentTarget.files[0]);
        }}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

const SelectInput = ({ label, type, options, ...props }) => {
  // Select component based on chakra-react-select and
  // using chakra form components

  const [field, meta, helper] = useField(props);
  const { values, setFieldValue } = useFormikContext();

  // set field value to last option if current value is no longer an option
  useEffect(() => {
    field.value &&
      !options.find((opt) => opt.value === field.value.value) &&
      setFieldValue(field.name, options.slice(-1)[0]);
  }, [values.month]);

  return (
    <FormControl id={props.id} isInvalid={meta.touched && meta.error}>
      <FormLabel>{label}</FormLabel>
      <Select
        {...field}
        {...props}
        openMenuOnFocus
        type={type || "text"}
        options={options}
        onBlur={helper.setTouched}
        value={values[field.name]}
        onChange={(value) => setFieldValue(field.name, value)}
      />
      <FormErrorMessage>{meta.error?.value}</FormErrorMessage>
    </FormControl>
  );
};

const DateInput = ({ label, type, ...props }) => {
  //Text input component using chakra form components

  const [field, meta] = useField(props);
  const { values, setFieldValue } = useFormikContext();

  const DateCustomInput = forwardRef(
    ({ name, value, onClick, onChange }, ref) => (
      <Input
        {...props}
        ref={ref}
        name={name}
        type={type || "text"}
        value={value}
        onClick={onClick}
        onChange={onChange}
      />
    )
  );

  return (
    <FormControl id={props.id} isInvalid={meta.touched && meta.error}>
      <FormLabel>{label}</FormLabel>
      <DatePicker
        {...props}
        showPopperArrow={false}
        selected={values[field.name]}
        onChange={(date) => setFieldValue(field.name, date)}
        customInput={<DateCustomInput />}
        dateFormat="MMMM d, yyyy"
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

const TimeInput = ({ label, type, ...props }) => {
  //Text input component using chakra form components

  const [field, meta] = useField(props);
  const { values, setFieldValue } = useFormikContext();

  const TimeCustomInput = forwardRef(
    ({ name, value, onClick, onChange }, ref) => (
      <Input
        {...props}
        ref={ref}
        name={name}
        type={type || "text"}
        value={value}
        onClick={onClick}
        onChange={onChange}
      />
    )
  );

  return (
    <FormControl id={props.id} isInvalid={meta.touched && meta.error}>
      <FormLabel>{label}</FormLabel>
      <DatePicker
        {...props}
        showPopperArrow={false}
        selected={values[field.name]}
        onChange={(date) => setFieldValue(field.name, date)}
        customInput={<TimeCustomInput />}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        timeFormat="HH:mm"
        dateFormat="HH:mm"
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export { DateInput, ImageInput, SelectInput, TextInput, TimeInput };
