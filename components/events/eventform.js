import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button } from "@chakra-ui/button";
import { Stack } from "@chakra-ui/layout";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { fetcher, imageUpload, patchEvent, postEvent } from "lib";
import { ImageInput, DateInput, TextInput, TimeInput } from "components";
import { useTranslations } from "next-intl";

const EventForm = () => {
  const t = useTranslations("EventForm");

  const {
    push,
    query: { id },
  } = useRouter();

  const [savedPicture, setSavedPicture] = useState();
  const [newPicture, setNewPicture] = useState();
  const [hasEndDate, setHasEndDate] = useState(false);
  const [info, setInfo] = useState("");

  const isAddMode = !id;

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
    const cloudinaryImage = newPicture && (await imageUpload(newPicture));
    const newEvent = {
      name: values.name,
      description: values.description,
      price: values.price,
      picture: cloudinaryImage?.url || savedPicture || null,
      start: values.startDate
        ? setTimeToDate(values.startDate, values.startTime)
        : null,
      end: hasEndDate ? setTimeToDate(values.endDate, values.endTime) : null,
    };

    const { ok, json } = isAddMode
      ? await postEvent(newEvent)
      : await patchEvent(id, newEvent);

    setSubmitting(false);

    ok
      ? push(`/events/${json.id}`)
      : setInfo(
          typeof json === "string"
            ? json
            : Object.values(json[0]) || "Can't create event"
        );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting, setFieldValue }) => {
        useEffect(async () => {
          if (!isAddMode) {
            const event = await fetcher(`http://localhost:8000/events/${id}`);

            setHasEndDate(!!event.end);

            const fieldValues = {
              ...event,
              startDate: new Date(event.start),
              startTime: new Date(event.start),
              endDate: event?.end ? new Date(event.end) : "",
              endTime: event?.end ? new Date(event.end) : "",
            };
            setSavedPicture(event.picture);
            Object.keys(initialValues).forEach((field) =>
              setFieldValue(field, fieldValues[field], false)
            );
          }
        }, []);

        return (
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
              label={t("picture")}
              savedPicture={savedPicture}
              picture={newPicture}
              setPicture={setNewPicture}
            />
            <TextInput
              label={t("name")}
              name="name"
              placeholder="Type the event name here"
            />
            <TextInput
              label={t("description")}
              name="description"
              placeholder="Type the event description here"
            />
            <TextInput
              label={t("price")}
              name="price"
              placeholder="Type the event price here"
            />
            <Stack direction="row">
              <DateInput label={t("startDate")} name="startDate" />
              <TimeInput label={t("startTime")} name="startTime" />
            </Stack>
            {hasEndDate && (
              <Stack direction="row">
                <DateInput label={t("endDate")} name="endDate" />
                <TimeInput label={t("endTime")} name="endTime" />
              </Stack>
            )}
            <Button variant="link" onClick={() => setHasEndDate(!hasEndDate)}>
              {hasEndDate ? t("removeEndDate") : t("addEndDate")}
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {isAddMode ? t("addEvent") : t("updateEvent")}
            </Button>
          </Stack>
        );
      }}
    </Formik>
  );
};

export { EventForm };
