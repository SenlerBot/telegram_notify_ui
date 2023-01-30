import {
    Heading,
    IconButton,
    VStack,
    useColorMode,
    useToast,
    Tooltip, WrapItem, Textarea
} from "@chakra-ui/react";
import PrivateSettingList from "./components/private_settings";
import AddPrivateSetting from "./components/AddPrivateSetting";
import {FaSun, FaMoon} from "react-icons/fa";
import {useState, useEffect, useRef} from "react";

import IntegrationConnect from "senler-integration-bot/src/index.js";

import {Link, Text} from '@chakra-ui/react'


function App() {
    const initialRef = useRef();
    const toast = useToast();
    const [private_settings, setPrivateSettings] = useState([]);
    const [public_settings, setPublicSettings] = useState('');
    const integrationConnect = new IntegrationConnect();

    integrationConnect.route('setData', (message) => {
        let settings = message.request.payload;
        if ('private' in settings) {
            setPrivateSettings(JSON.parse(settings.private));
        }
        if ('public' in settings) {
            setPublicSettings(JSON.parse(settings.public))
        }
        message.responce.success = true;
        message.send();
    });


    useEffect(() => {
        localStorage.setItem('private_settings', JSON.stringify(private_settings))
    }, [private_settings])


    useEffect(() => {
        localStorage.setItem('public_settings', JSON.stringify(public_settings))
    }, [public_settings])





    integrationConnect.route('getData', (message) => {
        message['responce'] = {
            payload: {},
            success: true
        };

        message.responce.payload['public'] =  JSON.parse(localStorage.getItem('public_settings'));
        message.responce.payload['private'] = JSON.parse(localStorage.getItem('private_settings'));

        message.responce.payload['command_title'] = 'Бот шлет сообщение с подписчиком';

        message.send();

    });

    function deletePrivateSetting(id) {
        const newPrivateSettings = private_settings.filter((private_setting) => {
            return private_setting.id !== id;
        });
        setPrivateSettings(newPrivateSettings);
    }

    function deletePrivateSettingAll() {
        setPrivateSettings([]);
    }

    function checkPrivateSetting(id) {
        const newPrivateSettingsCheck = private_settings.map((private_setting, index, array) => {
            if (private_setting.id === id) {
                private_setting.check = !private_setting.check;
            }
            return private_setting;
        });
        setPrivateSettings(newPrivateSettingsCheck);
    }

    function updatePrivateSetting(id, token1, chatId1, onClose) {
        const token = token1.trim();
        const chatId = chatId1.trim();

        if (!chatId || !token) {
            toast({
                title: "Enter your token and chatId",
                position: "top",
                status: "warning",
                duration: 2000,
                isClosable: true,
            });

            return;
        }

        const newPrivateSettingsUpdate = private_settings.map((task, index, array) => {
            if (task.id === id) {
                task.token = token;
                task.chat_id = chatId;
            }
            return task;
        });

        setPrivateSettings(newPrivateSettingsUpdate);

        onClose();
    }

    function addPrivateSetting(private_setting) {
        setPrivateSettings([...private_settings, private_setting]);
    }

    const {colorMode, toggleColorMode} = useColorMode();

    function updatePublicSettings(info) {
        if (!info) {
            toast({
                title: "Enter your text message",
                position: "top",
                status: "warning",
                duration: 2000,
                isClosable: true,
            });

            return;
        }
        setPublicSettings(info);
    }

    return (
        <VStack p={4} minH='100vh' pb={28}>
            <IconButton
                icon={colorMode === "light" ? <FaSun/> : <FaMoon/>}
                isRound='true'
                size='md'
                alignSelf='flex-end'
                onClick={toggleColorMode}
                aria-label='toogle-dark-mode'
            />
            <Heading
                p='5'
                fontWeight='extrabold'
                size='xl'
                bgGradient='linear(to-r, red.500, yellow.500)'
                bgClip='text'
            >
                Отправляет собщение<Text style={{color: "#1a8ad5", textDecoration: "revert"}}>в ChatId
                телеграм</Text> вашему <Link style={{color: "#1a8ad5", textDecoration: "revert"}}
                                             href='https://telegram.me/BotFather' isExternal>
                боту
            </Link>
            </Heading>

            <Heading
                p='5'
                fontWeight='extrabold'
                size='xl'
                bgGradient='linear(to-r, red.500, yellow.500)'
                bgClip='text'
            >
                Приватные настройки
            </Heading>
            <AddPrivateSetting addPrivateSetting={addPrivateSetting}/>
            <PrivateSettingList
                private_settings={private_settings}
                updatePrivateSetting={updatePrivateSetting}
                deletePrivateSetting={deletePrivateSetting}
                deletePrivateSettingAll={deletePrivateSettingAll}
                checkPrivateSetting={checkPrivateSetting}
            />
            <Heading
                p='5'
                fontWeight='extrabold'
                size='xl'
                bgGradient='linear(to-r, red.500, yellow.500)'
                bgClip='text'
            >
                Публичные настройки
            </Heading>
            <Text>Текст сообщения</Text>
            <WrapItem   style={{width: "100%"}}>
                <Tooltip
                    multiline={true}
                    label="Через %first_name% добавлять переменные vk_user_id, first_name, last_name и т.д из вебхука. Через {%name_var%} подписчика. Через [%name_var%] глобальные."
                    closeOnClick={false}
                >
                    <Textarea
                        ref={initialRef}
                        placeholder='текст сообщения с %переменными%'
                        defaultValue={public_settings}
                        onChange={(e) => updatePublicSettings(e.target.value)}
                        onFocus={(e) => updatePublicSettings(e.target.value)}
                    />
                </Tooltip>
            </WrapItem>


        </VStack>
    );
}

export default App;
