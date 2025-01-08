import { VStack, Box, Button, useColorMode } from "@chakra-ui/react";
import { FaFileAlt, FaLanguage, FaSpellCheck } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../../i18n";

const Sidebar = () => {
  const { colorMode } = useColorMode();
  const location = useLocation();
  const { getText } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
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

  return (
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
      <VStack spacing={2} align="stretch" px={3}>
        {menuItems.map((item) => (
          <Button
            key={item.path}
            as={Link}
            to={item.path}
            leftIcon={item.icon}
            justifyContent="flex-start"
            variant={isActive(item.path) ? "solid" : "ghost"}
            colorScheme={isActive(item.path) ? "purple" : undefined}
            size="md"
            w="auto"
          >
            {item.name}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
