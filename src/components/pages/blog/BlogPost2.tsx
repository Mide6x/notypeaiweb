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
  UnorderedList,
  ListItem,
  IconButton,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import FeaturedBlogs from "./FeaturedBlogs";

const BlogPost2 = () => {
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
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            alt="Productivity Tools"
            borderRadius="lg"
            objectFit="cover"
            height="400px"
          />

          <VStack align="stretch" spacing={4}>
            <Text color="purple.500" fontWeight="semibold">
              March 10, 2024
            </Text>

            <Heading size="2xl">
              Maximizing Productivity with Voice Commands
            </Heading>

            <HStack spacing={2}>
              <Tag colorScheme="purple">Productivity</Tag>
              <Tag colorScheme="purple">Tips</Tag>
              <Tag colorScheme="purple">Voice Commands</Tag>
            </HStack>

            <Text
              fontSize="lg"
              color={colorMode === "dark" ? "gray.400" : "gray.600"}
            >
              Discover how to supercharge your workflow using voice commands and
              unlock new levels of productivity with Notype.ai.
            </Text>

            <Divider my={4} />

            <VStack spacing={6} align="stretch">
              <Text>
                In today's fast-paced digital world, efficiency is key. Voice
                commands are revolutionizing the way we work, offering a faster
                and more natural way to interact with our devices. Here's your
                comprehensive guide to maximizing productivity using Notype.ai's
                voice command features.
              </Text>

              <Heading size="lg">Getting Started with Voice Commands</Heading>
              <Text>
                Before diving into advanced techniques, let's cover the basics
                that will transform your daily workflow:
              </Text>
              <UnorderedList spacing={2} pl={4}>
                <ListItem>Install the Notype.ai Chrome extension</ListItem>
                <ListItem>Enable microphone access in your browser</ListItem>
                <ListItem>Learn the basic command structure</ListItem>
                <ListItem>Practice with simple dictation tasks</ListItem>
              </UnorderedList>

              <Heading size="lg">
                Essential Voice Commands for Daily Tasks
              </Heading>
              <Text>
                Here are some of the most useful voice commands that will
                immediately boost your productivity:
              </Text>
              <Box pl={4}>
                <Text>• "New paragraph" - Starts a new paragraph</Text>
                <Text>
                  • "Delete last sentence" - Removes the previous sentence
                </Text>
                <Text>• "Capitalize that" - Capitalizes the last word</Text>
                <Text>
                  • "Add comma/period/question mark" - Adds punctuation
                </Text>
              </Box>

              <Heading size="lg">Advanced Techniques</Heading>
              <Text>
                Once you've mastered the basics, these advanced techniques will
                take your productivity to the next level:
              </Text>
              <Box pl={4}>
                <Text>
                  • Custom voice shortcuts for frequently used phrases
                </Text>
                <Text>• Voice-activated text formatting commands</Text>
                <Text>• Multi-language voice switching</Text>
                <Text>• Context-aware commands</Text>
              </Box>

              <Heading size="lg">Real-World Applications</Heading>
              <Text>
                Here's how different professionals are using Notype.ai to
                enhance their productivity:
              </Text>
              <Box pl={4}>
                <Text>• Writers: Drafting articles and stories hands-free</Text>
                <Text>• Students: Taking notes during lectures</Text>
                <Text>• Professionals: Composing emails and reports</Text>
                <Text>• Content Creators: Transcribing video scripts</Text>
              </Box>

              <Heading size="lg">Tips for Maximum Efficiency</Heading>
              <UnorderedList spacing={2} pl={4}>
                <ListItem>
                  Create a quiet workspace for better accuracy
                </ListItem>
                <ListItem>Use custom commands for repetitive tasks</ListItem>
                <ListItem>Practice regular voice exercises</ListItem>
                <ListItem>
                  Keep a list of commonly used commands nearby
                </ListItem>
                <ListItem>Take advantage of our offline mode</ListItem>
              </UnorderedList>

              <Text>
                Voice commands are more than just a convenience—they're a
                powerful tool for boosting productivity. With Notype.ai's
                intuitive voice recognition system, you can streamline your
                workflow and focus on what truly matters: creating great
                content.
              </Text>

              <Text fontStyle="italic">
                Ready to transform your workflow? Start using Notype.ai today
                and experience the future of productivity.
              </Text>
            </VStack>
          </VStack>

          <Divider my={8} />

          <FeaturedBlogs currentPostId="maximizing-productivity" />
        </VStack>
      </Container>
    </Box>
  );
};

export default BlogPost2;
