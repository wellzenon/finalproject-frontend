import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { UserWrapper } from "../components/context/state";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS>
      <UserWrapper>
        <Component {...pageProps} />
      </UserWrapper>
    </ChakraProvider>
  );
}

export default MyApp;
