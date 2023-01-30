import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    useDisclosure,
    IconButton
} from "@chakra-ui/react";
import {useState} from "react";
import React from "react";
import {FiEdit} from "react-icons/fi";


function UpdatePrivateSetting({private_setting, updatePrivateSetting}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [chatId, setChatId] = useState('');
    const [token, setToken] = useState('');

    const initialRef = React.useRef();

    return (
        <>
            <IconButton icon={<FiEdit/>} isRound='true' onClick={onOpen}/>
            <Modal
                isCentered
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent w='90%'>
                    <ModalHeader>Update your private settings</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            token
                            <Input
                                ref={initialRef}
                                placeholder='add you token bot'
                                defaultValue={private_setting.token}
                                onChange={(e) => setToken(e.target.value)}
                                onFocus={(e) => setToken(e.target.value)}
                            />


                            ChatId<Input
                            ref={initialRef}
                            placeholder='add you chatId'
                            defaultValue={private_setting.chat_id}
                            onChange={(e) => setChatId(e.target.value)}
                            onFocus={(e) => setChatId(e.target.value)}
                        />


                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme='blue'
                            onClick={() => updatePrivateSetting(private_setting.id, token, chatId, onClose)}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpdatePrivateSetting;
