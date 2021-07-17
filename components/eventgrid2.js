import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { BoxProps ,forwardRef, LinkBox, LinkOverlay, Tag, TagLabel } from '@chakra-ui/react';
import { Flex, Text, Heading, HStack, Grid, GridItem, Box } from '@chakra-ui/layout';

const EventGrid = ({ title, events, children, ...props }) => {
  if (!events.length) {
    return null;
  }

  return (
    <Box overflow="hidden" >
      <Heading>{title}</Heading>
      <Box overflowX="scroll" whiteSpace="nowrap">
        {events.map((event, key) => (
          <Flex
            key={key}
            display="inline-block"
            //grow={1}
            //basis={0}
            width="20em"
            direction="column"
            justifyContent="flex-end"
            bottom={0}
            position="relative"
            bgGradient="linear(to-t, blackAlpha.800 30%, transparent 70%)"
          >
            <NextLink
              passHref
              href={{
                pathname: '/event/[slug]',
                query: { slug: event.slug },
              }}
            >
              <LinkOverlay>
                <Heading paddingTop="15rem" color="white">
                  {event.name}
                </Heading>
              </LinkOverlay>
            </NextLink>
            <HStack spacing={4}>
              {event.tags.map((tag, key) => (
                <Tag size="sm" key={key}>
                  <TagLabel>{tag.name}</TagLabel>
                </Tag>
              ))}
            </HStack>
            <Text color="white">{`Date: ${event.time}`}</Text>
            <Text color="white">{`Price: $${event.price}`}</Text>
            <Text color="white">
              {`Location: ${event.address.street}, ${event.address.number} - ${event.address.city.name} / ${event.address.city.state.code}`}
            </Text>
          </Flex>
        ))}
        {children}
      </Box>
    </Box>
  );
};

export default EventGrid;
