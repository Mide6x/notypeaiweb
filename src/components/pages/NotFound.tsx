import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { colorMode } = useColorMode();

  return (
    <Container maxW="container.xl" py={20}>
      <VStack spacing={8} textAlign="center">
        <Heading
          size="4xl"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          404
        </Heading>
        <Heading size="xl">Page Not Found</Heading>
        <Text
          fontSize="xl"
          color={colorMode === "dark" ? "gray.400" : "gray.600"}
        >
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Box>
          <Button as={Link} to="/" colorScheme="purple" size="lg">
            Return Home
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default NotFound;
