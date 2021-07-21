import { useState } from "react";
import Router from "next/router";
import Layout from "../components/layout";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Button } from "@chakra-ui/button";
import { Center, Stack } from "@chakra-ui/layout";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { DateInput, TextInput, TimeInput } from "../components/forms-inputs";
import { ImageInput } from "../components/image-input";
import { imageUpload, postEvent } from "../lib/eventHelpers";
import { useUserContext } from "../components/context/state";

const EventForm = () => {
  const [picture, setPicture] = useState();
  const [hasEndDate, setHasEndDate] = useState(false);
  const [info, setInfo] = useState("");

  //Formik fields initial values
  const initialValues = {
    name: "",
    description: "",
    price: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  };

  //Formik fields validation rules
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.string().required("Required"),
    startDate: Yup.date().required("Required"),
    startTime: Yup.date().required("Required"),
    endDate: Yup.date().when("startDate", (startDate, schema) =>
      hasEndDate && startDate
        ? schema
            .required("Required")
            .min(startDate, "End date must be greater than start date")
        : schema
    ),
    endTime: Yup.date().when(
      ["startDate", "startTime", "endDate"],
      (startDate, startTime, endDate, schema) =>
        hasEndDate && startTime && startDate.getTime() === endDate.getTime()
          ? schema
              .required("Required")
              .min(startTime, "End time must be greater than start time")
          : schema
    ),
  });

  const setTimeToDate = (date, time) => {
    const result = new Date(date);
    if (time) {
      result.setHours(time.getHours());
      result.setMinutes(time.getMinutes());
    }
    return result;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const cloudinaryImage = picture && (await imageUpload(picture));
    const newEvent = {
      name: values.name,
      description: values.description,
      price: values.price,
      picture: cloudinaryImage?.url || null,
      start: values.startDate
        ? setTimeToDate(values.startDate, values.startTime)
        : null,
      end: hasEndDate ? setTimeToDate(values.endDate, values.endTime) : null,
    };

    const { ok, json } = await postEvent(newEvent);
    setSubmitting(false);
    ok
      ? Router.push(`/events/${json.id}`)
      : setInfo(json || "Can't create event");
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
            {info && (
              <Alert status="warning" variant="solid" borderRadius={5}>
                <AlertIcon />
                {info}
              </Alert>
            )}
            <ImageInput
              label="Event picture"
              picture={picture}
              setPicture={setPicture}
            />
            <TextInput
              label="Event name"
              name="name"
              placeholder="Type the event name here"
            />
            <TextInput
              label="Description"
              name="description"
              placeholder="Type the event description here"
            />
            <TextInput
              label="Price"
              name="price"
              placeholder="Type the event price here"
            />
            <Stack direction="row">
              <DateInput label="Start date" name="startDate" />
              <TimeInput label="Start time" name="startTime" />
            </Stack>
            {hasEndDate && (
              <Stack direction="row">
                <DateInput label="End date" name="endDate" />
                <TimeInput label="End time" name="endTime" />
              </Stack>
            )}
            <Button variant="link" onClick={() => setHasEndDate(!hasEndDate)}>
              {hasEndDate ? "-" : "+"} End date
            </Button>
            <Button type="submit"> Register </Button>
          </Stack>
        )}
      </Formik>
    </Layout>
  );
};

export default EventForm;
