import {
  Box,
  Container,
  Flex,
  Button,
  Image,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      py={4}
      bg={colorMode === "dark" ? "gray.900" : "white"}
      boxShadow="sm"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Flex
            align="center"
            as={RouterLink}
            to="/"
            _hover={{ textDecoration: "none" }}
          >
            <Image src="/ntype.png" alt="Notype.ai logo" h="24px" mr={2} />
            <Box fontSize="xl" fontWeight="bold">
              Notype.ai
            </Box>
          </Flex>
          <Flex gap={4} align="center">
            <IconButton
              aria-label="Toggle dark mode"
              icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
              onClick={toggleColorMode}
              variant="ghost"
              colorScheme="purple"
            />
            <Button
              colorScheme="purple"
              variant="ghost"
              onClick={() =>
                document.getElementById("waitlist")?.scrollIntoView()
              }
            >
              Join Waitlist
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
