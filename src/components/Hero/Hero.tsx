import { Container, Heading, Text, Button, Stack } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Container maxW="container.xl" py={20}>
      <Stack spacing={8} alignItems="center" textAlign="center">
        <Heading
          size="2xl"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          Transform Your Voice Into Text, Instantly
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Type with your voice anywhere on the web. Our Chrome extension makes
          it simple.
        </Text>
        <Button
          size="lg"
          colorScheme="purple"
          onClick={() =>
            document.getElementById("waitlist")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Join Waitlist
        </Button>
      </Stack>
    </Container>
  );
};

export default Hero;
