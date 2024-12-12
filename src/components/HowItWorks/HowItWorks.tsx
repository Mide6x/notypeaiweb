import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  OrderedList,
  ListItem,
  useColorMode,
} from "@chakra-ui/react";

const HowItWorks = () => {
  const { colorMode } = useColorMode();

  return (
    <Box bg={colorMode === "dark" ? "gray.900" : "white"} py={20}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Heading textAlign="center">How It Works</Heading>
          <OrderedList spacing={4}>
            <ListItem>
              <Text
                fontSize="lg"
                color={colorMode === "dark" ? "gray.300" : "inherit"}
              >
                Install our Chrome extension from the Chrome Web Store
              </Text>
            </ListItem>
            <ListItem>
              <Text
                fontSize="lg"
                color={colorMode === "dark" ? "gray.300" : "inherit"}
              >
                Click the microphone icon in any text field
              </Text>
            </ListItem>
            <ListItem>
              <Text
                fontSize="lg"
                color={colorMode === "dark" ? "gray.300" : "inherit"}
              >
                Speak naturally and watch your words appear in real-time
              </Text>
            </ListItem>
            <ListItem>
              <Text
                fontSize="lg"
                color={colorMode === "dark" ? "gray.300" : "inherit"}
              >
                Edit or correct text using voice commands or keyboard
              </Text>
            </ListItem>
          </OrderedList>
        </VStack>
      </Container>
    </Box>
  );
};

export default HowItWorks;
