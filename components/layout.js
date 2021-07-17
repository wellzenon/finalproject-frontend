import Head from "next/head";
import Menu from "../components/menu";
import Footer from "../components/footer";
import { Flex, Grid } from "@chakra-ui/react";

export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home }) {
  //const [search, setSearch] = useState('');
  //function handleSearch (val) {setSearch(val)};

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="manifest" href="/manifest.json" />
        <title>{siteTitle}</title>
      </Head>
      <Grid>
        <Menu
          paddingX={{
            base: 0,
            sm: "10%",
            md: "15%",
            lg: "20%",
          }}
          bgColor="yellow"
        />
        <Flex
          paddingTop={4}
          width={{
            base: "100%",
            sm: "80%",
            md: "70%",
            lg: "60%",
          }}
          as="main"
          justifySelf="center"
          direction="column"
        >
          {children}
        </Flex>
        <Footer />
      </Grid>
    </>
  );
}
