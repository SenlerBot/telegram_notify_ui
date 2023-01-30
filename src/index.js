import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";


const config = {
    initialColorMode: "dark",
};

const theme = extendTheme({
    config,
});

ReactDOM.render(
    <div>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
        </ChakraProvider>
    </div>,
    document.getElementById("root")
);
