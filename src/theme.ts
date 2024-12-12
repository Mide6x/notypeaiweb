import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    pink: "#FF7AE4",
    blue: "#71D9FF",
    red: "#FF8787",
    green: "#AAFFA6",
  },
};

const fonts = {
  heading: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
});

export default theme; 