import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Button,
  useColorMode,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { FaChrome } from "react-icons/fa";

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    picture: string;
  };
  onLogout?: () => void;
}

const Header = ({ isAuthenticated, user, onLogout }: HeaderProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const MenuItems = () => (
    <>
      <ChakraLink as={Link} to="/">
        Home
      </ChakraLink>
      {isAuthenticated ? (
        <>
          <ChakraLink as={Link} to="/dashboard">
            Dashboard
          </ChakraLink>
          <Button
            as="a"
            href="https://chromewebstore.google.com/detail/notypeai/jddchfnkcmclhijghgplffidgkcjkedd"
            target="_blank"
            leftIcon={<FaChrome />}
            colorScheme="purple"
            size="sm"
          >
            Add to Chrome
          </Button>
        </>
      ) : (
        <>
          <ChakraLink as={Link} to="/pricing">
            Pricing
          </ChakraLink>
          <Button as={Link} to="/login" colorScheme="purple" size="sm">
            Login
          </Button>
        </>
      )}
    </>
  );

  return (
    <Box
      py={4}
      borderBottom="1px"
      borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <ChakraLink as={Link} to="/" fontSize="xl" fontWeight="bold">
            Notype.ai
          </ChakraLink>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            <MenuItems />
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              variant="ghost"
            />
            {isAuthenticated && user && (
              <Menu>
                <MenuButton>
                  <Avatar size="sm" src={user.picture} name={user.name} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={toggleColorMode}>
                    {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
                  </MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}
          </HStack>

          {/* Mobile Navigation */}
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            display={{ base: "flex", md: "none" }}
          />

          <Drawer isOpen={isOpen} onClose={onClose} placement="right">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>
                <VStack spacing={4} align="stretch" mt={8}>
                  <MenuItems />
                  {isAuthenticated && (
                    <Button
                      onClick={onLogout}
                      colorScheme="red"
                      variant="outline"
                    >
                      Logout
                    </Button>
                  )}
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
