import Head from "next/head";
import NextImage from "next/image";
import NextLink from "next/link";
import { Box, Flex, Text, Heading, HStack } from "@chakra-ui/layout";
import {
  Alert,
  AlertIcon,
  Button,
  IconButton,
  Tag,
  TagLabel,
  Textarea,
} from "@chakra-ui/react";
import { HiQuestionMarkCircle } from "react-icons/hi";

import Layout from "../../components/layout";
import { useUser } from "../../hooks/useUser";
import {
  delPresence,
  patchPresence,
  postComment,
  postPresence,
  putPresence,
} from "../../lib/eventHelpers";
import { useEffect, useState } from "react";
import { useComments } from "../../hooks/useComments";
import { fetcher } from "../../lib/fetcher";

function Event({ event }) {
  const [info, setInfo] = useState("");
  const [comment, setComment] = useState("");
  const [presence, setPresence] = useState(undefined);
  const { user, mutate } = useUser();
  const isAuthenticated = user?.id;
  const isOwner = isAuthenticated && user.id === event?.owner?.id;
  // const { data, error, mutate } = useSWR(
  //   `http://localhost:8000/comments/?event=${event}`,
  //   fetcher
  // );
  // const { comments, mutate: mutateComments } = useComments({ event: event.id });

  useEffect(() => {
    console.log({
      user,
      isAuthenticated,
      presence,
    });
    isAuthenticated &&
      setPresence(
        user.event_presences?.find(({ event: id }) => id === event.id)
      );
    console.log({ presence });
  }, [user]);

  const toogleInterest = async () => {
    const { ok, json } = presence
      ? await patchPresence(presence.id, {
          is_interested: (!presence.is_interested && true) || false,
          // is_confirmed: !presence.is_interested && presence.is_confirmed,
        })
      : await postPresence({
          user: user.id,
          event: event.id,
          is_interested: true,
        });

    ok ? mutate() : setInfo(json || "Can't edit presence");
  };

  const toogleConfirmation = async () => {
    const response = interest.presenceId
      ? await patchPresence(interest.presenceId, {
          is_confirmed: !interest.isConfirmed,
        })
      : await postPresence({
          user: user.id,
          event: event.id,
          is_confirmed: true,
        });

    response.ok ? mutate() : setInfo(response?.json || "Can't edit presence");
  };

  const sendComment = async () => {
    const response = await postComment({
      user: user.id,
      event: event.id,
      body: comment,
    });
    response.ok
      ? mutateComments()
      : setInfo(response?.json || "Can't edit presence");
  };

  return (
    <Layout>
      <Head>
        <title>{event.name}</title>
      </Head>
      {info && (
        <Alert status="warning" variant="solid" borderRadius={5}>
          <AlertIcon />
          {info}
        </Alert>
      )}
      <Box overflow="hidden" height="70vh" position="relative">
        {event.picture && (
          <NextImage
            src={event.picture}
            alt={`Event ${event.name} cover picture`}
            layout="fill"
            objectFit="cover"
          />
        )}
      </Box>
      <Flex>
        {isAuthenticated && (
          <Button
            margin={2}
            colorScheme={presence?.is_interested ? "green" : "gray"}
            leftIcon={<HiQuestionMarkCircle />}
            onClick={toogleInterest}
          >
            {`MAYBE ${presence?.is_interested ? "!" : "?"}`}
          </Button>
        )}
        {isAuthenticated && (
          <Button
            margin={2}
            colorScheme={presence?.is_confirmed ? "green" : "gray"}
            onClick={toogleConfirmation}
          >
            {`CONFIRM${presence?.is_confirmed ? "ED" : " ?"}`}
          </Button>
        )}
      </Flex>
      <Heading>{event.name}</Heading>
      <Text>{`Date: ${event.start}`}</Text>
      <Text>{`Price: $${event.price}`}</Text>
      <Text>{`Description: ${event.description}`}</Text>
      <Text>{`Comments:`}</Text>
      {/* {comments &&
        comments.map((comment, key) => (
          <Box key={key}>
            <Text>{`User: ${comment.user.user_name}`}</Text>
            <Text>{`Body: ${comment.body}`}</Text>
          </Box>
        ))}
      {user?.id && (
        <>
          <Textarea
            margin={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button margin={2} onClick={sendComment}>
            {`ADD COMMENT`}
          </Button>
        </>
      )} */}
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`http://127.0.0.1:8000/events/`);
  const events = await res.json();

  const paths = events.map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://127.0.0.1:8000/events/${params.id}`);
  const event = await res.json();

  return {
    props: { event },
  };
}

export default Event;
