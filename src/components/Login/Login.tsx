import {
  Box,
  Container,
  Heading,
  Stack,
  Input,
  Button,
  useColorMode,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Coming Soon",
        description: "Login functionality will be available soon!",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            Login
          </Heading>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Stack spacing="4" width="100%">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  bg={colorMode === "dark" ? "gray.700" : "gray.50"}
                  _placeholder={{
                    color: colorMode === "dark" ? "gray.400" : "gray.500",
                  }}
                  borderColor={colorMode === "dark" ? "gray.600" : "gray.200"}
                  _hover={{
                    borderColor: colorMode === "dark" ? "gray.500" : "gray.300",
                  }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  bg={colorMode === "dark" ? "gray.700" : "gray.50"}
                  _placeholder={{
                    color: colorMode === "dark" ? "gray.400" : "gray.500",
                  }}
                  borderColor={colorMode === "dark" ? "gray.600" : "gray.200"}
                  _hover={{
                    borderColor: colorMode === "dark" ? "gray.500" : "gray.300",
                  }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  bg={colorMode === "dark" ? "gray.700" : "gray.50"}
                  _placeholder={{
                    color: colorMode === "dark" ? "gray.400" : "gray.500",
                  }}
                  borderColor={colorMode === "dark" ? "gray.600" : "gray.200"}
                  _hover={{
                    borderColor: colorMode === "dark" ? "gray.500" : "gray.300",
                  }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
                  }}
                />
              </FormControl>

              <Button
                colorScheme="purple"
                loadingText="Logging in..."
                isLoading={loading}
                type="submit"
                width="100%"
                mt={4}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
