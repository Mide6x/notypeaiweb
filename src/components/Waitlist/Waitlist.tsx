import { useState } from "react";
import {
  Container,
  Heading,
  Stack,
  Input,
  Button,
  useToast,
  Box,
} from "@chakra-ui/react";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Success!",
        description: "You've been added to our waitlist.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEmail("");
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="waitlist" bg="purple.50" py={20}>
      <Container maxW="container.md">
        <Stack spacing="8" align="center">
          <Heading textAlign="center">Join the Waitlist</Heading>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing="4"
              width="100%"
            >
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                bg="white"
              />
              <Button
                colorScheme="purple"
                loadingText="Joining..."
                isLoading={loading}
                type="submit"
                width={{ base: "100%", md: "auto" }}
              >
                Join Now
              </Button>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};

export default Waitlist;
