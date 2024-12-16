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
                  Voice input data (processed using Web Speech API)
                </ListItem>
                <ListItem>Email address (for waitlist only)</ListItem>
                <ListItem>Language preferences</ListItem>
                <ListItem>Site-specific settings</ListItem>
                <ListItem>Basic usage analytics</ListItem>
              </UnorderedList>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                Voice Data Processing
              </Heading>
              <Text mb={3}>
                Voice input is processed using the Web Speech API directly in
                your browser. The audio stream is handled locally and is never
                recorded or stored permanently. The resulting text is processed
                through our secure backend service for enhanced formatting and
                accuracy.
              </Text>
              <Text>
                We do not retain any voice recordings or transcribed text
                content after your session ends. All processing is done in
                real-time and temporary data is cleared when you close the
                application.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                Local Storage and Preferences
              </Heading>
              <Text mb={3}>
                We store certain preferences locally in your browser to improve
                your experience:
              </Text>
              <UnorderedList spacing={2} mb={3}>
                <ListItem>Language preferences for voice recognition</ListItem>
                <ListItem>Site-specific settings and customizations</ListItem>
                <ListItem>Theme preferences (light/dark mode)</ListItem>
              </UnorderedList>
              <Text>
                These preferences are stored locally on your device and are not
                transmitted to our servers.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                Data Transmission and Security
              </Heading>
              <Text mb={3}>
                All data transmission between your browser and our servers is
                encrypted using HTTPS protocol. We employ industry-standard
                security measures to protect any data in transit.
              </Text>
              <Text>
                Text processing through our backend service is conducted over
                secure connections, and we do not store the processed text
                permanently on our servers.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                Analytics and Cookies
              </Heading>
              <Text>
                We use basic analytics to understand how users interact with our
                service. This includes anonymous usage statistics and error
                reporting to help us improve the application. We do not use this
                data for advertising or tracking purposes.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                Changes to This Policy
              </Heading>
              <Text>
                We may update this privacy policy from time to time. We will
                notify users of any material changes by posting the new privacy
                policy on this page and updating the "Last updated" date.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                Contact Us
              </Heading>
              <Text>
                If you have any questions about this Privacy Policy, please
                contact us at privacy@notype.ai
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
