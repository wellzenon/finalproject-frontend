import React from "react";
import Head from "next/head";
import { HiPlus } from "react-icons/hi";
import { Button, Center, IconButton } from "@chakra-ui/react";
import { Layout, EventGrid, Link } from "components";

const AddEventButton = ({ boxSize, href, children, ...props }) => (
  <Center justifyContent={{ base: "right", md: "center" }}>
    <Link href={href}>
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
    </Link>
  </Center>
);

export default function Index({ events }) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <EventGrid title="Events" events={events} />
      <AddEventButton href="/events/add" margin={4} />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const res = await fetch("http://127.0.0.1:8000/events/");
  const events = await res.json();

  return {
    props: {
      events,
      messages: {
        ...require(`../messages/shared/${locale}.json`),
        ...require(`../messages/index/${locale}.json`),
      },
    },
    revalidate: 10,
  };
}
