import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

const TextEditModal = ({
  postId,
  username,
  previousComment,
  editComment,
  ...props
}) => {
  const [comment, setComment] = useState(previousComment);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const save = () => {
    editComment(postId, comment);
    onClose();
  };
  return (
    <>
      <Button variant="link" onClick={onOpen} {...props}>
        edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{username}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button width="100%" onClick={save}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { TextEditModal };
