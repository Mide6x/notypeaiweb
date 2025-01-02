import {
  Box,
  Container,
  VStack,
  Heading,
  Input,
  Button,
  Stack,
  useColorMode,
  Text,
  useToast,
  Icon,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRocket, FaUsers, FaBrain } from "react-icons/fa";

const Waitlist = () => {
  const { colorMode } = useColorMode();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "waitlist",
          email,
        }).toString(),
      });

      if (response.ok) {
        toast({
          title: "Success! 🚀",
          description: "You're on the waitlist! We'll be in touch soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEmail("");
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description:
            errorData.message || "Something went wrong. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="waitlist"
      bg={colorMode === "dark" ? "gray.800" : "white"}
      py={16}
      borderRadius="2xl"
      boxShadow="xl"
      position="relative"
      overflow="hidden"
    >
      {/* Background decorative elements */}
      <Box
        position="absolute"
        top="-50%"
        left="-20%"
        width="140%"
        height="200%"
        opacity="0.05"
        bgGradient="radial(circle at 30% 50%, purple.500 0%, transparent 70%)"
        pointerEvents="none"
        transform="rotate(-12deg)"
      />
      <Box
        position="absolute"
        bottom="-50%"
        right="-20%"
        width="140%"
        height="200%"
        opacity="0.05"
        bgGradient="radial(circle at 70% 50%, blue.500 0%, transparent 70%)"
        pointerEvents="none"
        transform="rotate(12deg)"
      />

      <Container maxW="container.xl" position="relative">
        <VStack spacing={12} align="center">
          <VStack spacing={6} textAlign="center" maxW="800px">
            <Badge
              colorScheme="purple"
              px={3}
              py={1}
              borderRadius="full"
              textTransform="none"
              fontSize="sm"
            >
              Limited Early Access
            </Badge>
            <Heading
              fontSize="4xl"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              letterSpacing="tight"
              lineHeight="1.2"
            >
              Join the AI Voice Revolution
            </Heading>
            <Text
              fontSize="lg"
              color={colorMode === "dark" ? "gray.400" : "gray.600"}
            >
              Be among the first to experience the future of voice-to-text
              technology. Early access members get exclusive features and
              priority support.
            </Text>

            <HStack spacing={8} justify="center" py={4}>
              <VStack>
                <Icon as={FaUsers} w={6} h={6} color="purple.500" />
                <Text fontWeight="bold">12+</Text>
                <Text fontSize="sm" color="gray.500">
                  Active Users
                </Text>
              </VStack>
              <VStack>
                <Icon as={FaBrain} w={6} h={6} color="purple.500" />
                <Text fontWeight="bold">98%</Text>
                <Text fontSize="sm" color="gray.500">
                  Accuracy Rate
                </Text>
              </VStack>
              <VStack>
                <Icon as={FaRocket} w={6} h={6} color="purple.500" />
                <Text fontWeight="bold">24/7</Text>
                <Text fontSize="sm" color="gray.500">
                  Support
                </Text>
              </VStack>
            </HStack>
          </VStack>

          <Box w="100%" maxW="600px">
            <form
              name="waitlist"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="waitlist" />
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={4}
                w="100%"
              >
                <Input
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  size="lg"
                  bg={colorMode === "dark" ? "gray.700" : "white"}
                  borderWidth={2}
                  _hover={{
                    borderColor: "purple.500",
                  }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
                  }}
                />
                <Button
                  colorScheme="purple"
                  size="lg"
                  loadingText="Joining..."
                  isLoading={loading}
                  type="submit"
                  minW={{ base: "full", md: "200px" }}
                  leftIcon={<FaRocket />}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s"
                >
                  Get Early Access
                </Button>
              </Stack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Waitlist;
