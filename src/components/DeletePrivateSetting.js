import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

function DeleteAllPrivateSetting({ deletePrivateSettingAll }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
      <>
        <Button
            // colorScheme='red'
            px='8'
            h='45'
            color='red.500'
            mt='8'
            onClick={onOpen}
        >
          Delete All
        </Button>

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w='90%'>
            <ModalHeader>Do you really want to delete all private setting?</ModalHeader>
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                No
              </Button>
              <Button colorScheme='red' onClick={() => deletePrivateSettingAll()}>
                Yes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  );
}

function DeletePrivateSetting({ private_setting, deletePrivateSetting }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
      <>
        <IconButton icon={<FiTrash2 />} isRound='true' onClick={onOpen} />

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w='90%'>
            <ModalHeader>Do you really want to delete the task?</ModalHeader>
            <ModalBody>
              <Text>{private_setting.body}</Text>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                No
              </Button>
              <Button
                  colorScheme='red'
                  onClick={() => deletePrivateSetting(private_setting.id, onClose)}
              >
                Yes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
  );
}

export { DeletePrivateSetting, DeleteAllPrivateSetting };
