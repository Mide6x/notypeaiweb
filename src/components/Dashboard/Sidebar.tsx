import { HStack, Box, Button, useColorMode, Flex } from "@chakra-ui/react";
import { FaFileAlt, FaLanguage, FaSpellCheck } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../../i18n";

interface SidebarProps {
  onSelect?: (path: string) => void;
}

const Sidebar = ({ onSelect }: SidebarProps) => {
  const { colorMode } = useColorMode();
  const location = useLocation();
  const { getText } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const tools = [
    {
      name: getText("aiSummarizer"),
      icon: <FaFileAlt />,
      path: "/dashboard/summarizer",
    },
    {
      name: getText("grammarEditor"),
      icon: <FaSpellCheck />,
      path: "/dashboard/grammar",
    },
    {
      name: getText("localTranslator"),
      icon: <FaLanguage />,
      path: "/dashboard/translator",
    },
  ];

  const handleClick = (path: string) => {
    if (onSelect) {
      onSelect(path);
    }
  };

  // Mobile view
  const mobileView = (
    <Flex
      w="100%"
      bg={colorMode === "dark" ? "gray.800" : "white"}
      borderBottom="1px"
      borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
      py={2}
      px={4}
      overflowX="auto"
      position="fixed"
      top="64px"
      left={0}
      zIndex={10}
    >
      <HStack spacing={2} w="100%" justify="space-around">
        {tools.map((tool) => (
          <Button
            key={tool.path}
            as={Link}
            to={tool.path}
            leftIcon={tool.icon}
            variant={isActive(tool.path) ? "solid" : "ghost"}
            colorScheme={isActive(tool.path) ? "purple" : undefined}
            size="sm"
            flexShrink={0}
            onClick={() => handleClick(tool.path)}
          >
            {tool.name}
          </Button>
        ))}
      </HStack>
    </Flex>
  );

  // Desktop view
  const desktopView = (
    <Box
      w="220px"
      h="calc(100vh - 64px)"
      bg={colorMode === "dark" ? "gray.800" : "white"}
      borderRight="1px"
      borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
      position="fixed"
      left={0}
      top="64px"
      py={4}
      overflowY="auto"
    >
      <Flex direction="column" px={3} gap={2}>
        {tools.map((tool) => (
          <Button
            key={tool.path}
            as={Link}
            to={tool.path}
            leftIcon={tool.icon}
            justifyContent="flex-start"
            variant={isActive(tool.path) ? "solid" : "ghost"}
            colorScheme={isActive(tool.path) ? "purple" : undefined}
            size="md"
            w="100%"
            onClick={() => handleClick(tool.path)}
          >
            {tool.name}
          </Button>
        ))}
      </Flex>
    </Box>
  );

  return (
    <>
      <Box display={{ base: "block", md: "none" }}>{mobileView}</Box>
      <Box display={{ base: "none", md: "block" }}>{desktopView}</Box>
    </>
  );
};

export default Sidebar;
