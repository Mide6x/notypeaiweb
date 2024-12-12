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
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const formEntries = Object.fromEntries(formData.entries());
      const formDataObj: Record<string, string> = {};

      // Convert all values to strings
      Object.entries(formEntries).forEach(([key, value]) => {
        formDataObj[key] = value.toString();
      });

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formDataObj).toString(),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast({
        title: "Success!",
        description: "You've been added to our waitlist.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEmail("");
    } catch (error: unknown) {
      console.error("Form submission error:", error);
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
          <form
            name="waitlist"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            style={{ width: "100%" }}
          >
            <input type="hidden" name="form-name" value="waitlist" />
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing="4"
              width="100%"
            >
              <Input
                name="email"
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
