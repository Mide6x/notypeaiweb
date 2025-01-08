import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  Image,
  Text,
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

const featuredPosts: BlogPost[] = [
  {
    id: "future-of-voice-to-text",
    title: "The Future of Voice-to-Text Technology",
    excerpt:
      "Explore how AI is revolutionizing the way we interact with our devices through voice commands...",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: "March 15, 2024",
    tags: ["AI", "Technology", "Voice Recognition"],
  },
  {
    id: "maximizing-productivity",
    title: "Maximizing Productivity with Voice Commands",
    excerpt:
      "Learn how to boost your productivity by leveraging voice commands in your daily workflow...",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: "March 10, 2024",
    tags: ["Productivity", "Tips", "Voice Commands"],
  },
  {
    id: "voice-recognition-languages",
    title: "Voice Recognition in Different Languages",
    excerpt:
      "Discover how our AI handles multiple African languages with remarkable accuracy...",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    date: "March 5, 2024",
    tags: ["Languages", "AI", "Technology"],
  },
];

interface FeaturedBlogsProps {
  currentPostId?: string;
}

const FeaturedBlogs = ({ currentPostId }: FeaturedBlogsProps) => {
  const { colorMode } = useColorMode();
  const filteredPosts = featuredPosts.filter(
    (post) => post.id !== currentPostId
  );

  return (
    <Box mt={16}>
      <Heading size="xl" mb={8}>
        Featured Posts You May Like
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {filteredPosts.map((post) => (
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
                height="150px"
                objectFit="cover"
              />
              <VStack align="stretch" p={4} spacing={3} flex="1">
                <Text fontSize="sm" color="purple.500">
                  {post.date}
                </Text>
                <Heading size="sm">{post.title}</Heading>
                <HStack spacing={2} mt="auto">
                  {post.tags.slice(0, 2).map((tag, tagIndex) => (
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
    </Box>
  );
};

export default FeaturedBlogs;
