import {
  Box,
  Container,
  useColorMode,
  Text,
  SimpleGrid,
  VStack,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { FaFileAlt, FaLanguage, FaSpellCheck } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Summarizer from "./Tools/Summarizer";
import GrammarEditor from "./Tools/GrammarEditor";
import Translator from "./Tools/Translator";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
  picture: string;
}

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const [user, setUser] = useState<User | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const navigate = useNavigate();

  const tools = [
    {
      name: "AI Summarizer",
      icon: FaFileAlt,
      description: "Summarize long texts quickly",
      path: "/dashboard/summarizer",
    },
    {
      name: "Grammar Editor",
      icon: FaSpellCheck,
      description: "Fix grammar and spelling mistakes",
      path: "/dashboard/grammar",
    },
    {
      name: "Local Translator",
      icon: FaLanguage,
      description: "Translate text to multiple languages",
      path: "/dashboard/translator",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/user`,
          { withCredentials: true }
        );
        setUser(response.data);
      } catch {
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleToolSelect = (path: string) => {
    setSelectedTool(path);
    navigate(path);
  };

  if (!selectedTool) {
    return (
      <Box
        minH="100vh"
        bg={colorMode === "dark" ? "gray.900" : "gray.50"}
        pt={8}
      >
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Heading size="lg" textAlign="center">
              Hi {user?.name}! What would you like to do today?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} pt={8}>
              {tools.map((tool) => (
                <Box
                  key={tool.path}
                  bg={colorMode === "dark" ? "gray.800" : "white"}
                  p={6}
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={() => handleToolSelect(tool.path)}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s"
                >
                  <VStack spacing={4}>
                    <Icon as={tool.icon} boxSize={8} color="purple.500" />
                    <Text fontWeight="bold" fontSize="lg">
                      {tool.name}
                    </Text>
                    <Text color="gray.500" textAlign="center">
                      {tool.description}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box display="flex">
      <Sidebar />
      <Box
        flex="1"
        ml="220px"
        bg={colorMode === "dark" ? "gray.900" : "gray.50"}
        minH="calc(100vh - 64px)"
        p={6}
      >
        <Container maxW="container.xl">
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
