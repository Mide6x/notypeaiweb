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
import { useAuth } from "../Auth/useAuth";

interface ErrorResponse {
  message: string;
  errors?: Array<{ msg: string }>;
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      navigate("/dashboard");
    } catch (err: unknown) {
      const error = err as { response?: { data: ErrorResponse } };
      if (error.response?.data.errors) {
        error.response.data.errors.forEach((err) => {
          toast({
            title: "Error",
            description: err.msg,
            status: "error",
            duration: 3000,
          });
        });
      } else {
        toast({
          title: "Error",
          description: error.response?.data.message || "Authentication failed",
          status: "error",
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
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
          <Button
            type="submit"
            colorScheme="purple"
            width="100%"
            isLoading={isLoading}
          >
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
