import { useEffect, useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import NextImage from "next/image";
import { useTranslations } from "next-intl";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { Box, Flex, Text, Heading } from "@chakra-ui/layout";
import { Alert, AlertIcon, Button, Textarea } from "@chakra-ui/react";

import { useTime, useUser } from "hooks";
import { TextEditModal } from "components";
import {
  fetcher,
  patchComment,
  patchPresence,
  postComment,
  postPresence,
} from "lib";

function Event({ event }) {
  if (!event) return null;

  const t = useTranslations("Event");
  const { relativeTime, formatTime } = useTime();
  const [info, setInfo] = useState("");
  const [comment, setComment] = useState("");
  const [presence, setPresence] = useState(undefined);
  const { data: user, mutate: refreshUser } = useUser();
  const isAuthenticated = user?.id;
  const isOwner = isAuthenticated && user.id === event?.owner?.id;
  const comments = useSWR(
    `http://localhost:8000/events/${event.id}/comments`,
    fetcher
  );

  useEffect(() => {
    setPresence(
      isAuthenticated &&
        user.event_presences?.find(({ event: id }) => id === event.id)
    );
  }, [user]);

  const toogleInterest = async () => {
    const { ok, json } = presence
      ? await patchPresence(presence.id, {
          is_interested: !presence.is_interested,
          is_confirmed: !presence.is_interested && presence.is_confirmed,
        })
      : await postPresence({
          user: user.id,
          event: event.id,
          is_interested: true,
        });
    ok ? refreshUser() : setInfo(json || "Can't edit presence");
  };

  const toogleConfirmation = async () => {
    const { ok, json } = presence
      ? await patchPresence(presence.id, {
          is_interested: !presence.is_confirmed || presence.is_interested,
          is_confirmed: !presence.is_confirmed,
        })
      : await postPresence({
          user: user.id,
          event: event.id,
          is_confirmed: true,
        });

    ok ? refreshUser() : setInfo(json || "Can't edit presence");
  };

  const sendComment = async () => {
    const { ok, json } = await postComment({
      event: event.id,
      body: comment,
    });
    ok
      ? comments.mutate() && setComment("")
      : setInfo(json || "Can't send comment");
  };

  const editComment = async (commentId, body) => {
    const { ok, json } = await patchComment(commentId, {
      body: body,
    });
    ok ? comments.mutate() : setInfo(json || "Can't edit comment");
  };

  return (
    <>
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
      <Text>{`${t("date")}: ${formatTime(event.start)}`}</Text>
      <Text>{`${t("price")}: $${event.price}`}</Text>
      <Text>{`${t("description")}: ${event.description}`}</Text>
      <Text>{`${t("comments")}:`}</Text>
      {comments?.data &&
        comments.data.map((comment, key) => (
          <Box
            key={key}
            backgroundColor="blackAlpha.100"
            margin={2}
            padding={2}
            rounded="md"
          >
            {user.id === comment.user.id && (
              <TextEditModal
                username={comment.user.username}
                postId={comment.id}
                previousComment={comment.body}
                editComment={editComment}
                float="right"
              />
            )}
            <Text fontWeight="bold" display="inline-block">
              {comment.user.username}
            </Text>
            <Text fontSize="smaller" display="inline-block" marginLeft={3}>
              {relativeTime(comment.created)}
            </Text>
            <Text>{comment.body}</Text>
          </Box>
        ))}
      {user?.id && (
        <>
          <Textarea
            width="unset"
            margin={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button margin={2} onClick={sendComment}>
            {t("addComment")}
          </Button>
        </>
      )}
    </>
  );
}

export async function getStaticPaths({ locales }) {
  const res = await fetch(`http://127.0.0.1:8000/events/`);
  const events = await res.json();

  const paths = locales
    .map((locale) =>
      events.map(({ id }) => ({ params: { id: id.toString() }, locale }))
    )
    .flat();

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ locale, params }) {
  const res = await fetch(`http://127.0.0.1:8000/events/${params.id}`);
  const event = await res.json();
  return {
    props: {
      event,
      messages: {
        ...require(`messages/shared/${locale}.json`),
        ...require(`messages/events/${locale}.json`),
      },
    },
  };
}

export default Event;
