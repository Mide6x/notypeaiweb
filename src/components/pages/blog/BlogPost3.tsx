import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  useColorMode,
  Tag,
  HStack,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import FeaturedBlogs from "./FeaturedBlogs";

const BlogPost3 = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Box py={20}>
      <Container maxW="container.md">
        <IconButton
          aria-label="Back to blog"
          icon={<ArrowBackIcon />}
          onClick={() => navigate("/blog")}
          mb={8}
          size="lg"
          variant="ghost"
        />

        <VStack spacing={8} align="stretch">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            alt="Language Technology"
            borderRadius="lg"
            objectFit="cover"
            height="400px"
          />

          <VStack align="stretch" spacing={4}>
            <Text color="purple.500" fontWeight="semibold">
              March 5, 2024
            </Text>

            <Heading size="2xl">
              Voice Recognition in Different Languages
            </Heading>

            <HStack spacing={2}>
              <Tag colorScheme="purple">Languages</Tag>
              <Tag colorScheme="purple">AI</Tag>
              <Tag colorScheme="purple">Technology</Tag>
            </HStack>

            <Text
              fontSize="lg"
              color={colorMode === "dark" ? "gray.400" : "gray.600"}
            >
              Explore how our AI handles multiple African languages with
              remarkable accuracy, preserving the richness and nuance of each
              language.
            </Text>

            <Divider my={4} />

            <VStack spacing={6} align="stretch">
              <Text>
                Language is at the heart of human connection, and at Notype.ai,
                we're committed to breaking down language barriers through
                advanced voice recognition technology. Our focus on African
                languages sets us apart in the industry.
              </Text>

              <Heading size="lg">Supported Languages</Heading>
              <Text>
                We currently support the following languages with high accuracy
                rates:
              </Text>
              <Table variant="simple" borderRadius="lg" overflow="hidden">
                <Thead bg={colorMode === "dark" ? "gray.700" : "gray.50"}>
                  <Tr>
                    <Th>Language</Th>
                    <Th>Region</Th>
                    <Th>Features</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Hausa</Td>
                    <Td>West Africa</Td>
                    <Td>Full support with tone recognition</Td>
                  </Tr>
                  <Tr>
                    <Td>Yorùbá</Td>
                    <Td>West Africa</Td>
                    <Td>Complete tonal support</Td>
                  </Tr>
                  <Tr>
                    <Td>Igbo</Td>
                    <Td>West Africa</Td>
                    <Td>Dialect awareness</Td>
                  </Tr>
                  <Tr>
                    <Td>Zulu</Td>
                    <Td>Southern Africa</Td>
                    <Td>Click consonant recognition</Td>
                  </Tr>
                  <Tr>
                    <Td>French</Td>
                    <Td>Global</Td>
                    <Td>African French variants supported</Td>
                  </Tr>
                  <Tr>
                    <Td>Arabic</Td>
                    <Td>Global</Td>
                    <Td>Regional dialect support</Td>
                  </Tr>
                </Tbody>
              </Table>

              <Heading size="lg">Language-Specific Features</Heading>
              <Text>
                Each language comes with unique challenges and features that our
                system handles with precision:
              </Text>
              <Box pl={4}>
                <Text>• Tone marking for tonal languages</Text>
                <Text>• Dialect variation recognition</Text>
                <Text>• Cultural context awareness</Text>
                <Text>• Idiomatic expression understanding</Text>
              </Box>

              <Heading size="lg">The Technology Behind It</Heading>
              <Text>
                Our voice recognition system employs several advanced
                technologies to ensure accurate recognition across all supported
                languages:
              </Text>
              <Box pl={4}>
                <Text>• Neural network training on native speakers</Text>
                <Text>• Real-time accent adaptation</Text>
                <Text>• Context-aware processing</Text>
                <Text>• Continuous learning from user feedback</Text>
              </Box>

              <Heading size="lg">Practical Applications</Heading>
              <Text>
                Our multi-language support enables various real-world
                applications:
              </Text>
              <Box pl={4}>
                <Text>• Cross-cultural business communication</Text>
                <Text>• Educational resources and language learning</Text>
                <Text>• Cultural heritage preservation</Text>
                <Text>• Medical and legal translation services</Text>
              </Box>

              <Heading size="lg">Future Developments</Heading>
              <Text>
                We're constantly working to improve and expand our language
                support:
              </Text>
              <Box pl={4}>
                <Text>• Adding more African languages</Text>
                <Text>• Improving accuracy for existing languages</Text>
                <Text>• Developing new language-specific features</Text>
                <Text>• Expanding dialect coverage</Text>
              </Box>

              <Text>
                At Notype.ai, we believe that technology should serve all
                languages equally. Our commitment to African languages reflects
                our mission to make voice recognition technology truly inclusive
                and accessible to everyone.
              </Text>
            </VStack>
          </VStack>

          <Divider my={8} />

          <FeaturedBlogs currentPostId="voice-recognition-languages" />
        </VStack>
      </Container>
    </Box>
  );
};

export default BlogPost3;
