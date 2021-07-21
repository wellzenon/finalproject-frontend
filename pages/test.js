import React from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

const friendlyTime = (time, locale) => {
  const rtl = new Intl.RelativeTimeFormat(locale);
  const format = rtl.format(new Date(time));
  console.log({ format, time, locale });

  return time;
};
export default function Index({ events }) {
  const { locale } = useRouter();
  return events.map((event, key) => (
    <Text key={key}>{friendlyTime(event.start, locale)}</Text>
  ));
}

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/events/");
  const events = await res.json();

  return {
    props: { events },
    revalidate: 10,
  };
}
