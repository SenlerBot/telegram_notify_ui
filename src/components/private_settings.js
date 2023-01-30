import React from "react";
import UpdatePrivateSetting from "./UpdatePrivateSetting";
import { DeletePrivateSetting, DeleteAllPrivateSetting } from "./DeletePrivateSetting";
import {
    HStack,
    Box,
    VStack,
    Flex,
    Text,
    StackDivider,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import img from "../images/empty.svg";

function PrivateSettingList({ private_settings, updatePrivateSetting, deletePrivateSetting, deletePrivateSettingAll, checkPrivateSetting }) {
    if (!private_settings.length) {
        return (
            <>
                <Box maxW='80%'>
                    <Image
                        mt='20px'
                        w='98%'
                        maxW='350'
                        src={img}
                        alt='Your list is empty'
                    />
                </Box>
            </>
        );
    }
    return (
        <>
            <VStack
                divider={<StackDivider />}
                borderColor='gray.100'
                borderWidth='2px'
                p='5'
                borderRadius='lg'
                w='100%'
                maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw" }}
                alignItems='stretch'
            >
                {private_settings.map((private_setting) => (
                    <HStack key={private_setting.id} opacity={private_setting.check === true ? "0.2" : "1"} flexDirection='column'>
                        <Text
                            w='100%'
                            p='8px'
                            borderRadius='lg'
                            as={private_setting.check === true ? "s" : ""}
                            cursor='pointer'
                            onClick={() => checkPrivateSetting(private_setting.id)}
                        >
                            <label style={{display : 'block'}}>
                                token:{private_setting.token}
                            </label>
                            <label>
                                chatId:{private_setting.chat_id}
                            </label>
                        </Text>
                        <DeletePrivateSetting
                            private_setting={private_setting}
                            deletePrivateSetting={deletePrivateSetting}
                            deletePrivateSettingAll={deletePrivateSettingAll}
                        />
                        <UpdatePrivateSetting private_setting={private_setting} updatePrivateSetting={updatePrivateSetting} />
                    </HStack>
                ))}
            </VStack>

            <Flex>
                <DeleteAllPrivateSetting deletePrivateSettingAll={deletePrivateSettingAll} />
            </Flex>
        </>
    );
}

export default PrivateSettingList;
