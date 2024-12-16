import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";

const TermsOfService = () => {
  return (
    <Box py={20}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Heading>Terms of Service</Heading>
          <Text>Last updated: December 14, 2024</Text>

          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="md" mb={4}>
                1. Acceptance of Terms
              </Heading>
              <Text>
                By using Notype.ai, you agree to these terms and conditions. The
                Service is provided "as is" without warranties of any kind.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                2. Use License
              </Heading>
              <OrderedList spacing={2}>
                <ListItem>Personal, non-commercial use only</ListItem>
                <ListItem>No modification or reverse engineering</ListItem>
                <ListItem>No unauthorized distribution</ListItem>
              </OrderedList>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                3. Privacy & Data
              </Heading>
              <Text>
                Your privacy is important to us. Voice processing occurs locally
                in your browser. See our Privacy Policy for details on data
                handling.
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default TermsOfService;
