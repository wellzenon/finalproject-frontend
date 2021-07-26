import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { NextIntlProvider } from "next-intl";
import { Layout } from "components";

// const formats = {
//   dateTime: {
//     short: {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     },
//   },
// };

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS>
      <NextIntlProvider
        //formats={formats}
        messages={pageProps.messages}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>{" "}
      </NextIntlProvider>
    </ChakraProvider>
  );
}

export default MyApp;
