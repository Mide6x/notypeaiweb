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
  Image,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Group 14.png";

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
      <ChakraLink as={Link} to="/blog">
        Blog
      </ChakraLink>
      <ChakraLink as={Link} to="/pricing">
        Pricing
      </ChakraLink>
      <ChakraLink as={Link} to="/faq">
        FAQs
      </ChakraLink>
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
          {/* Logo on the far left */}
          <ChakraLink
            as={Link}
            to={isAuthenticated ? "/dashboard" : "/"}
            display="flex"
            alignItems="center"
          >
            <Image src={logo} alt="Notype.ai" h="32px" />
            <Text fontSize="xl" fontWeight="bold" colorScheme="purple.500">
              Notype.ai
            </Text>
          </ChakraLink>

          {/* Centered Navigation */}
          <HStack
            spacing={8}
            display={{ base: "none", md: "flex" }}
            flex="1"
            justify="center"
          >
            <MenuItems />
          </HStack>

          {/* Right Side Items */}
          <HStack spacing={4} display={{ base: "none", md: "flex" }}>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              variant="ghost"
            />
            {isAuthenticated && user ? (
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
            ) : (
              <HStack spacing={4}>
                <Button
                  as={Link}
                  to="/login"
                  variant="ghost"
                  colorScheme="purple"
                >
                  Login
                </Button>
                <Button as={Link} to="/login" colorScheme="purple">
                  Create Account
                </Button>
              </HStack>
            )}
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            display={{ base: "flex", md: "none" }}
          />

          {/* Mobile Drawer */}
          <Drawer isOpen={isOpen} onClose={onClose} placement="right">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>
                <VStack spacing={4} align="stretch" mt={8}>
                  <Button
                    leftIcon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                    onClick={toggleColorMode}
                    variant="outline"
                    colorScheme="purple"
                    size="lg"
                    mb={4}
                  >
                    {colorMode === "dark"
                      ? "Switch to Light Mode"
                      : "Switch to Dark Mode"}
                  </Button>
                  <MenuItems />
                  {isAuthenticated && user ? (
                    <VStack align="stretch" spacing={4} mt={4}>
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
                        onClick={() => {
                          onClose();
                          onLogout();
                        }}
                        colorScheme="red"
                        variant="outline"
                      >
                        Logout
                      </Button>
                    </VStack>
                  ) : (
                    <VStack spacing={4}>
                      <Button
                        as={Link}
                        to="/login"
                        colorScheme="purple"
                        variant="outline"
                        w="full"
                      >
                        Login
                      </Button>
                      <Button
                        as={Link}
                        to="/login"
                        colorScheme="purple"
                        variant="outline"
                        w="full"
                      >
                        Create Account
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
