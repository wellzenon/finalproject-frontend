import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import { HiPhotograph } from "react-icons/hi";
import {
  Center,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";

const ImageInput = ({ label, savedPicture, picture, setPicture, ...props }) => {
  const [url, setUrl] = useState();

  const handlePicture = (e) => setPicture(e.target.files[0]);

  useEffect(() => {
    url && URL.revokeObjectURL(url);
    picture && setUrl(URL.createObjectURL(picture));
    return URL.revokeObjectURL(url);
  }, [picture]);

  const clearPicture = () => {
    setUrl();
    setPicture();
  };

  return (
    <>
      <FormControl id={props.id}>
        <FormLabel cursor="pointer">
          <Center>
            {url || savedPicture ? (
              <Image
                src={url || savedPicture}
                objectFit="contain"
                maxHeight="20rem"
              />
            ) : (
              <Icon as={HiPhotograph} boxSize={100} />
            )}
          </Center>
          <Text
            padding={2}
            fontWeight="bold"
            textAlign="center"
            _hover={{
              "text-decoration": "underline",
            }}
          >
            {picture ? "Change" : "Select"} Event Picture
          </Text>
          {picture && (
            <Button variant="link" onClick={clearPicture}>
              Clear
            </Button>
          )}
        </FormLabel>
        <Input
          name="picture"
          type="file"
          onChange={handlePicture}
          display="none"
        />
      </FormControl>
    </>
  );
};

export { ImageInput };
