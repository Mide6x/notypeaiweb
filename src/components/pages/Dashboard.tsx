import {
  Box,
  Container,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiFileText, FiEdit2, FiGlobe } from "react-icons/fi";
import { useTranslation } from "../../i18n";

const Dashboard = () => {
  const { getText } = useTranslation();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const tools = [
    {
      name: getText("aiSummarizer"),
      description: getText("aiSummarizerDesc", "Summarize long texts quickly"),
      icon: FiFileText,
      path: "/dashboard/summarizer",
    },
    {
      name: getText("grammarEditor"),
      description: getText(
        "grammarEditorDesc",
        "Fix grammar and spelling mistakes"
      ),
      icon: FiEdit2,
      path: "/dashboard/grammar",
    },
    {
      name: getText("localTranslator"),
      description: getText(
        "localTranslatorDesc",
        "Translate text to multiple languages"
      ),
      icon: FiGlobe,
      path: "/dashboard/translator",
    },
  ];

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Text fontSize="2xl" fontWeight="bold">
            {getText("welcomeMessage")}
          </Text>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {tools.map((tool) => (
              <Link
                key={tool.path}
                as={RouterLink}
                to={tool.path}
                _hover={{ textDecoration: "none" }}
              >
                <Box
                  p={6}
                  bg={bgColor}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  transition="all 0.2s"
                  _hover={{
                    transform: "translateY(-4px)",
                    shadow: "lg",
                    borderColor: "purple.400",
                  }}
                >
                  <VStack spacing={4} align="start">
                    <Icon as={tool.icon} boxSize={8} color="purple.500" />
                    <Text fontSize="xl" fontWeight="bold">
                      {tool.name}
                    </Text>
                    <Text color="gray.500">{tool.description}</Text>
                  </VStack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Dashboard;
