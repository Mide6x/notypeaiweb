import {
  Box,
  Container,
  Heading,
  Stack,
  Button,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { colorMode } = useColorMode();

  const handleGoogleLogin = () => {
    console.log("Environment variables:", {
      VITE_API_URL: import.meta.env.VITE_API_URL,
      MODE: import.meta.env.MODE,
    });

    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      console.error("API URL is not defined");
      return;
    }
    console.log("Redirecting to:", `${apiUrl}/auth/google`);
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <Box
      id="login"
      bg={colorMode === "dark" ? "gray.800" : "white"}
      py={20}
      borderRadius="lg"
      shadow="sm"
    >
      <Container maxW="container.sm">
        <Stack spacing="8" align="center">
          <Heading size="lg" textAlign="center">
            Login to Notype.ai
          </Heading>
          <Text color="gray.500">
            Use your Google account to sign in securely
          </Text>
          <Button
            leftIcon={<FaGoogle />}
            colorScheme="purple"
            size="lg"
            width="100%"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
