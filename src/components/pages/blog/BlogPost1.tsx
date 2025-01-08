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
  IconButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import FeaturedBlogs from "./FeaturedBlogs";

const BlogPost1 = () => {
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
            src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            alt="AI Voice Technology"
            borderRadius="lg"
            objectFit="cover"
            height="400px"
          />

          <VStack align="stretch" spacing={4}>
            <Text color="purple.500" fontWeight="semibold">
              March 15, 2024
            </Text>

            <Heading size="2xl">The Future of Voice-to-Text Technology</Heading>

            <HStack spacing={2}>
              <Tag colorScheme="purple">AI</Tag>
              <Tag colorScheme="purple">Technology</Tag>
              <Tag colorScheme="purple">Voice Recognition</Tag>
            </HStack>

            <Text
              fontSize="lg"
              color={colorMode === "dark" ? "gray.400" : "gray.600"}
            >
              Voice-to-text technology is revolutionizing the way we interact
              with our devices, and African languages are at the forefront of
              this transformation.
            </Text>

            <Divider my={4} />

            <VStack spacing={6} align="stretch">
              <Text>
                The landscape of voice recognition technology is rapidly
                evolving, with a particular focus on inclusivity and
                accessibility. At Notype.ai, we're proud to be leading this
                revolution by prioritizing African languages in our voice
                recognition system.
              </Text>

              <Heading size="lg">Breaking Language Barriers</Heading>
              <Text>
                Traditional voice recognition systems have historically focused
                on major world languages, leaving millions of speakers of
                African languages behind. Our technology bridges this gap by
                providing accurate voice-to-text conversion for Hausa, Yorùbá,
                Igbo, and Zulu, among others.
              </Text>

              <Heading size="lg">How Our Technology Works</Heading>
              <Text>
                Our AI-powered system uses advanced machine learning algorithms
                specifically trained on African languages. This specialized
                training allows us to achieve high accuracy rates while
                accounting for:
              </Text>
              <Box pl={4}>
                <Text>
                  • Tonal variations crucial in many African languages
                </Text>
                <Text>• Regional dialects and accents</Text>
                <Text>• Cultural context and expressions</Text>
                <Text>• Natural speech patterns</Text>
              </Box>

              <Heading size="lg">Real-World Applications</Heading>
              <Text>
                The applications of our technology extend far beyond simple
                dictation:
              </Text>
              <Box pl={4}>
                <Text>• Educational tools for language preservation</Text>
                <Text>• Business communication across language barriers</Text>
                <Text>• Accessibility features for digital platforms</Text>
                <Text>• Documentation of oral histories and traditions</Text>
              </Box>

              <Heading size="lg">Looking Ahead</Heading>
              <Text>
                As we continue to refine our technology, we're excited about the
                possibilities that lie ahead. Our commitment to improving voice
                recognition for African languages remains unwavering, and we're
                constantly working on:
              </Text>
              <Box pl={4}>
                <Text>• Expanding our language support</Text>
                <Text>• Improving accuracy through continuous learning</Text>
                <Text>• Developing new features based on user feedback</Text>
                <Text>• Creating more inclusive digital experiences</Text>
              </Box>

              <Text>
                The future of voice-to-text technology is not just about
                convenience—it's about creating a more inclusive digital world
                where every voice can be heard and understood. With Notype.ai,
                that future is already here.
              </Text>
            </VStack>
          </VStack>

          <Divider my={8} />

          <FeaturedBlogs currentPostId="future-of-voice-to-text" />
        </VStack>
      </Container>
    </Box>
  );
};

export default BlogPost1;
