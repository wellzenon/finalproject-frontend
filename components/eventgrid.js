import React, { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Button, LinkBox, LinkOverlay, Tag, TagLabel } from "@chakra-ui/react";
import {
  Flex,
  Text,
  Heading,
  HStack,
  Grid,
  GridItem,
  Divider,
  Box,
} from "@chakra-ui/layout";
import { eachWeekendOfYear } from "date-fns";

const dateString = (date) => {
  const fullDate = new Date(date);
  const [weekDay, month, day, year, time] = fullDate.toString().split(" ");
  const [hour, min, sec] = time.split(":");
  return `${month}, ${day} ${year} at ${hour}h${min}`;
};

const EventGrid = ({ title, events, ...props }) => {
  if (!events) return null;

  return (
    <>
      <Heading margin={4}>{title}</Heading>
      <Grid
        rowGap={4}
        margin={{ base: 0, md: 4 }}
        columnGap={{ base: 0, md: 4 }}
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        {...props}
      >
        {events.map((event, key) => (
          <LinkBox key={key}>
            <GridItem
              borderWidth="1px"
              borderRadius={{ base: 0, md: "lg" }}
              overflow="hidden"
              position="relative"
              height="20rem"
            >
              {event.picture && (
                <Image
                  src={event.picture}
                  alt={`Event ${event.name} cover picture`}
                  layout="fill"
                  objectFit="cover"
                />
              )}
              <Flex
                width="100%"
                p={3}
                direction="column"
                justifyContent="flex-end"
                bottom={0}
                position="absolute"
                bgGradient="linear(to-t, blackAlpha.800 30%, transparent 70%)"
              >
                <NextLink
                  passHref
                  href={{
                    pathname: "/events/[id]",
                    query: { id: event.id },
                  }}
                >
                  <LinkOverlay>
                    <Heading paddingTop="15rem" color="white">
                      {event.name}
                    </Heading>
                  </LinkOverlay>
                </NextLink>
                <Text color="white">{`Start: ${dateString(event.start)}`}</Text>
                <Text color="white">{`End: ${dateString(event.end)}`}</Text>
                <Text color="white">{`Price: $${event.price}`}</Text>
              </Flex>
            </GridItem>
          </LinkBox>
        ))}
      </Grid>
    </>
  );
};

export default EventGrid;
