import { useState } from "react";
import {
  Container,
  Heading,
  Stack,
  Input,
  Button,
  useToast,
  Box,
  useColorMode,
  VStack,
} from "@chakra-ui/react";

const Waitlist = () => {
  const { colorMode } = useColorMode();
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

      // Then send welcome email
      try {
        await fetch("/.netlify/functions/sendWelcomeEmail", {
          method: "POST",
          body: JSON.stringify({ email }),
        });
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
      }

      setEmail("");
      toast({
        title: "Success",
        description:
          "Yay! You're in! 🎉 We've just slid into your inbox with all the deets",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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
    <Box
      id="waitlist"
      bg={colorMode === "dark" ? "gray.900" : "gray.50"}
      py={8}
      width="100%"
    >
      <Container maxW="100%" px={4}>
        <VStack spacing={8} align="stretch" width="100%">
          <Heading textAlign="center">Join Early Access</Heading>
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
              maxW="100%"
              mx="auto"
            >
              <Input
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                bg={colorMode === "dark" ? "gray.800" : "white"}
                _placeholder={{
                  color: colorMode === "dark" ? "gray.400" : "gray.500",
                }}
                borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
                _hover={{
                  borderColor: "purple.500",
                }}
                _focus={{
                  borderColor: "purple.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
                }}
              />
              <Button
                colorScheme="purple"
                loadingText="Joining..."
                isLoading={loading}
                type="submit"
                width={{ base: "100%", md: "200px" }}
              >
                Get Access
              </Button>
            </Stack>
          </form>
        </VStack>
      </Container>
    </Box>
  );
};

export default Waitlist;
