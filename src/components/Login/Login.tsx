import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
  errors?: Array<{ msg: string }>;
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!isLogin && !name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        status: "error",
        duration: 3000,
      });
      return;
    }

    if (!email.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Email and password are required",
        status: "error",
        duration: 3000,
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        status: "error",
        duration: 3000,
      });
      return;
    }

    try {
      if (isLogin) {
        // Login logic
        await axios.post(
          `${apiUrl}/auth/login`,
          { email, password },
          { withCredentials: true }
        );
      } else {
        // Register logic
        console.log("Sending registration request with:", {
          email,
          password,
          name,
        });
        const response = await axios.post(
          `${apiUrl}/auth/register`,
          { email, password, name },
          { withCredentials: true }
        );
        console.log("Registration response:", response.data);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      const axiosError = error as AxiosError<ErrorResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data?.message || "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          {!isLogin && (
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </FormControl>
          )}
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button type="submit" colorScheme="purple" width="100%">
            {isLogin ? "Login" : "Register"}
          </Button>
        </VStack>
      </form>
      <Divider my={6} />
      <Text textAlign="center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Button
          variant="link"
          color="purple.500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </Button>
      </Text>
    </Box>
  );
};

export default Login;
