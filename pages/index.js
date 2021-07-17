import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import Layout from "../components/layout";
import EventGrid from "../components/eventgrid";
import { HiPlus } from "react-icons/hi";
import {
  Button,
  Center,
  Circle,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";

const AddEventButton = ({ boxSize, href, children, ...props }) => (
  <Center justifyContent={{ base: "right", md: "center" }}>
    <NextLink href={href}>
      <Center
        cursor="pointer"
        borderRadius="full"
        position="fixed"
        bottom={{ base: 14, md: 2 }}
      >
        <IconButton
          display={{ md: "none" }}
          aria-label="Add Event"
          size="lg"
          fontSize="3rem"
          borderRadius="full"
          icon={<HiPlus />}
          {...props}
        />
        <Button
          display={{ base: "none", md: "block" }}
          borderRadius="full"
          size="lg"
          fontSize="1.5rem"
          {...props}
        >
          ADD EVENT
        </Button>
      </Center>
    </NextLink>
  </Center>
);

export default function Index({ events }) {
  return (
    <Layout home>
      <Head>
        <title>Home</title>
      </Head>
      <EventGrid title="Events" events={events} />
      <AddEventButton href="/event" margin={4} />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/events/");
  const events = await res.json();

  return {
    props: { events },
    revalidate: 10,
  };
}
