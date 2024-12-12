import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";

const HowItWorks = () => {
  return (
    <Box bg="white" py={20}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Heading textAlign="center">How It Works</Heading>
          <OrderedList spacing={4}>
            <ListItem>
              <Text fontSize="lg">
                Install our Chrome extension from the Chrome Web Store
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="lg">
                Click the microphone icon in any text field
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="lg">
                Speak naturally and watch your words appear in real-time
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="lg">
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
