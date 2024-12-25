import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  useColorMode,
  Avatar,
  Flex,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface User {
  name: string;
  email: string;
  picture: string;
}

interface ErrorResponse {
  message: string;
}

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/user`,
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setUser(response.data);
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        toast({
          title: "Authentication Error",
          description:
            error.response?.data?.message ||
            "Please log in to access the dashboard",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast({
        title: "Logout Error",
        description:
          error.response?.data?.message ||
          "Failed to log out. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );
  }

  return (
    <Box py={20} bg={colorMode === "dark" ? "gray.800" : "gray.50"}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <VStack align="start" spacing={2}>
              <Heading size="lg">Welcome, {user?.name}</Heading>
              <Text color={colorMode === "dark" ? "gray.400" : "gray.600"}>
                {user?.email}
              </Text>
            </VStack>
            <Avatar size="lg" src={user?.picture} name={user?.name} />
          </Flex>

          <Button
            colorScheme="purple"
            variant="outline"
            onClick={handleLogout}
            bg={colorMode === "dark" ? "gray.700" : "white"}
          >
            Logout
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default Dashboard;
