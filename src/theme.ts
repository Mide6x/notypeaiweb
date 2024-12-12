import { extendTheme } from "@chakra-ui/react";

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
  colors,
  fonts,
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.800",
      },
    },
  },
});

export default theme; 