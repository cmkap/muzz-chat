import * as ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RouterProvider router={router} />
  </ChakraProvider>
);
