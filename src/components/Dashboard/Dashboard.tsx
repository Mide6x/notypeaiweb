import { Box, Container, useColorMode, useToast, Text } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Summarizer from "./Tools/Summarizer";
import GrammarEditor from "./Tools/GrammarEditor";
import Translator from "./Tools/Translator";
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
      }
    };

    fetchUser();
  }, [navigate, toast]);

  return (
    <Box display="flex">
      <Sidebar />
      <Box
        flex="1"
        ml="250px"
        bg={colorMode === "dark" ? "gray.900" : "gray.50"}
        minH="calc(100vh - 80px)"
        mt="80px"
      >
        <Container maxW="container.xl" py={8}>
          {user && (
            <Text mb={4} color="gray.500">
              Welcome, {user.name}
            </Text>
          )}
          <Routes>
            <Route path="/" element={<Navigate to="summarizer" replace />} />
            <Route path="summarizer" element={<Summarizer />} />
            <Route path="grammar" element={<GrammarEditor />} />
            <Route path="translator" element={<Translator />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
