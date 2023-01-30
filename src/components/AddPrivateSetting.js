import {useState} from "react";
import {Button, HStack, Input, useToast} from "@chakra-ui/react";

function AddPrivateSetting({addPrivateSetting}) {


    const toast = useToast();
    const [token, setToken] = useState("");
    const [chatId, setChatId] = useState("");
    const [statusInput, setStatusInput] = useState(true);
    const [statusInputA, setStatusInputA] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();

        const chatIdText = chatId.trim();

        if (!chatIdText) {
            toast({
                title: "Enter your chatId",
                position: "top",
                status: "warning",
                duration: 2000,
                isClosable: true,
            });
            setStatusInput(false);

            return setChatId("");
        }
        const tokenText = token.trim();

        if (!tokenText) {
            toast({
                title: "Enter your token",
                position: "top",
                status: "warning",
                duration: 2000,
                isClosable: true,
            });
            setStatusInputA(false);

            return setToken("");
        }


        let user_id =
            new URLSearchParams(window.location.search).get('group_id')//senler group_id current
            + '_'
            + new URLSearchParams(window.location.search).get('user_id')//senler user current
            + '_'
            + (new Date()).getTime()

        const private_item = {
            id: user_id,
            chat_id: chatId,
            token: token,
            user_id: user_id
        };

        addPrivateSetting(private_item);
        setChatId("");
        setToken("");

    }

    if (chatId && !statusInput) {
        setStatusInput(true);
    }
    if (token && !statusInput) {
        setStatusInputA(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <HStack mt='4' mb='4'>
                <Input
                    h='46'
                    borderColor={!statusInputA ? "red.300" : "transparent"}
                    variant='filled'
                    placeholder='Enter token bot'
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
                <Input
                    h='46'
                    borderColor={!statusInput ? "red.300" : "transparent"}
                    variant='filled'
                    placeholder='Enter your chatId'
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                />
                <Button
                    colorScheme='twitter'
                    px='8'
                    pl='10'
                    pr='10'
                    h='46'
                    type='submit'
                >
                    Add
                </Button>
            </HStack>
        </form>
    );
}

export default AddPrivateSetting;
