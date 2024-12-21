import {
  Box,
  Container,
  Flex,
  Button,
  Image,
  IconButton,
  useColorMode,
  useDisclosure,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Link, Link as RouterLink } from "react-router-dom";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const MenuItems = () => (
    <>
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
        onClick={() => {
          document.getElementById("waitlist")?.scrollIntoView();
          onClose();
        }}
      >
        Join Early Access
      </Button>
      <Button
        as={Link}
        to="/login"
        variant="ghost"
        colorScheme="purple"
        size={{ base: "sm", md: "md" }}
        onClick={onClose}
      >
        Login
      </Button>
    </>
  );

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

          {/* Desktop Menu */}
          <Flex gap={4} align="center" display={{ base: "none", md: "flex" }}>
            <MenuItems />
          </Flex>

          {/* Mobile Menu Button */}
          <IconButton
            aria-label="Open menu"
            icon={<FaBars />}
            onClick={onOpen}
            display={{ base: "flex", md: "none" }}
            variant="ghost"
            colorScheme="purple"
          />

          {/* Mobile Menu Drawer */}
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <VStack spacing={4} align="stretch">
                  <MenuItems />
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
