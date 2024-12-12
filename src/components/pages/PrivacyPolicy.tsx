import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Box py={20}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Heading>Privacy Policy</Heading>
          <Text>Last updated: March 2024</Text>

          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="md" mb={4}>
                Information We Collect
              </Heading>
              <UnorderedList spacing={2}>
                <ListItem>
                  Voice input data (processed locally in your browser)
                </ListItem>
                <ListItem>Email address (for waitlist only)</ListItem>
                <ListItem>Basic usage analytics</ListItem>
              </UnorderedList>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                How We Use Your Information
              </Heading>
              <Text>
                Your voice data is processed entirely within your browser and is
                never sent to our servers. Email addresses are used solely for
                waitlist notifications and important product updates.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                Data Security
              </Heading>
              <Text>
                We employ industry-standard security measures to protect your
                data. Voice processing happens locally, ensuring your speech
                data never leaves your device.
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
