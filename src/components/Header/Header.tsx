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
  Text,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { FaChrome } from "react-icons/fa";

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
    picture: string;
  };
  onLogout: () => void;
}

const Header = ({ isAuthenticated, user, onLogout }: HeaderProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const displayName = user?.name || user?.email?.split("@")[0] || "User";

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
      position="fixed"
      top={0}
      left={0}
      right={0}
      h="64px"
      zIndex={1000}
      bg={colorMode === "dark" ? "gray.800" : "white"}
      borderBottom="1px"
      borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
    >
      <Container maxW="container.xl" h="100%">
        <Flex justify="space-between" align="center" h="100%">
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
                <MenuButton
                  as={Button}
                  variant="ghost"
                  rightIcon={<ChevronDownIcon />}
                  display="flex"
                  alignItems="center"
                >
                  <HStack spacing={2}>
                    <Avatar size="sm" src={user.picture} name={displayName} />
                    <Text>{displayName}</Text>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate("/account-settings")}>
                    Account Settings
                  </MenuItem>
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
                  {isAuthenticated && user && (
                    <VStack align="stretch" spacing={2}>
                      <Flex
                        as={Button}
                        variant="ghost"
                        onClick={() => {
                          onClose();
                          navigate("/account-settings");
                        }}
                        justify="flex-start"
                        align="center"
                        gap={2}
                      >
                        <Avatar
                          size="sm"
                          src={user.picture}
                          name={displayName}
                        />
                        <Text>{displayName}</Text>
                      </Flex>
                      <Button
                        leftIcon={
                          colorMode === "dark" ? <SunIcon /> : <MoonIcon />
                        }
                        onClick={toggleColorMode}
                        variant="ghost"
                        justifyContent="flex-start"
                      >
                        {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
                      </Button>
                      <Button
                        onClick={onLogout}
                        colorScheme="red"
                        variant="outline"
                      >
                        Logout
                      </Button>
                    </VStack>
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
