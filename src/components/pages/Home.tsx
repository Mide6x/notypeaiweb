import Hero from "../Hero/Hero";
import Features from "../Features/Features";
import HowItWorks from "../HowItWorks/HowItWorks";
import Waitlist from "../Waitlist/Waitlist";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading>Get Early Access</Heading>
              <Text color="gray.600" maxW="container.md">
                Notype.ai is now in early access! Join us today and start
                transforming your voice into text instantly.
              </Text>
            </VStack>
            <Box maxW="container.md" width="100%">
              <Waitlist />
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default Home;
