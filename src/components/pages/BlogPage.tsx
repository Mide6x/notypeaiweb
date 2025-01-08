import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  useColorMode,
  Tag,
  HStack,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "future-of-voice-to-text",
    title: "The Future of Voice-to-Text Technology",
    excerpt:
      "Explore how AI is revolutionizing the way we interact with our devices through voice commands, with a special focus on African languages...",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: "January 8, 2025",
    tags: ["AI", "Technology", "Voice Recognition"],
  },
  {
    id: "maximizing-productivity",
    title: "Maximizing Productivity with Voice Commands",
    excerpt:
      "Learn how to boost your productivity by leveraging voice commands in your daily workflow. Discover tips, tricks, and best practices...",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: "January 8, 2025",
    tags: ["Productivity", "Tips", "Voice Commands"],
  },
  {
    id: "voice-recognition-languages",
    title: "Voice Recognition in Different Languages",
    excerpt:
      "Discover how our AI handles multiple African languages with remarkable accuracy, preserving the richness and nuance of each language...",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: "January 8, 2025",
    tags: ["Languages", "AI", "Technology"],
  },
];

const BlogPage = () => {
  const { colorMode } = useColorMode();

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <VStack spacing={16} align="stretch">
          <VStack spacing={4} textAlign="center">
            <Heading
              size="2xl"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              Latest Updates & Insights
            </Heading>
            <Text
              fontSize="xl"
              color={colorMode === "dark" ? "gray.400" : "gray.600"}
              maxW="2xl"
              mx="auto"
            >
              Stay up to date with the latest developments in voice recognition
              technology and learn how to make the most of Notype.ai
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                as={RouterLink}
                to={`/blog/${post.id}`}
                _hover={{ textDecoration: "none" }}
              >
                <VStack
                  align="stretch"
                  bg={colorMode === "dark" ? "gray.800" : "white"}
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="xl"
                  transition="transform 0.2s"
                  _hover={{ transform: "translateY(-4px)" }}
                  height="100%"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    height="200px"
                    objectFit="cover"
                  />
                  <VStack align="stretch" p={6} spacing={4} flex="1">
                    <Text fontSize="sm" color="purple.500">
                      {post.date}
                    </Text>
                    <Heading size="md">{post.title}</Heading>
                    <Text
                      color={colorMode === "dark" ? "gray.400" : "gray.600"}
                      noOfLines={3}
                    >
                      {post.excerpt}
                    </Text>
                    <HStack spacing={2} mt="auto">
                      {post.tags.map((tag, tagIndex) => (
                        <Tag
                          key={tagIndex}
                          colorScheme="purple"
                          size="sm"
                          variant="subtle"
                        >
                          {tag}
                        </Tag>
                      ))}
                    </HStack>
                  </VStack>
                </VStack>
              </Link>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default BlogPage;
