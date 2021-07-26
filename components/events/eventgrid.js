import Image from "next/image";
import NextLink from "next/link";
import { LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Flex, Text, Heading, Grid, GridItem } from "@chakra-ui/layout";
import { useTranslations } from "next-intl";
import { useTime } from "hooks/useTime";

const EventGrid = ({ title, events, ...props }) => {
  if (!events) return null;

  const t = useTranslations("Event");
  const { formatTime } = useTime();

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
        {events.map(({ id, name, picture, start, end, price }) => (
          <LinkBox key={id}>
            <GridItem
              borderWidth="1px"
              borderRadius={{ base: 0, md: "lg" }}
              overflow="hidden"
              position="relative"
              height="20rem"
            >
              {picture && (
                <Image
                  src={picture}
                  alt={`Event ${name} cover picture`}
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
                    query: { id },
                  }}
                >
                  <LinkOverlay>
                    <Heading paddingTop="15rem" color="white">
                      {name}
                    </Heading>
                  </LinkOverlay>
                </NextLink>
                <Text color="white">{`${t("date")}: ${formatTime(
                  start
                )}`}</Text>
                {end && <Text color="white">{`End: ${formatTime(end)}`}</Text>}
                <Text color="white">{`${t("price")}: $${price}`}</Text>
              </Flex>
            </GridItem>
          </LinkBox>
        ))}
      </Grid>
    </>
  );
};

export { EventGrid };
