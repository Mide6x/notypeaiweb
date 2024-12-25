import {
  VStack,
  Textarea,
  Button,
  Select,
  Text,
  useColorMode,
  HStack,
  useToast,
  Input,
  Box,
  IconButton,
  ButtonGroup,
  Tooltip,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import {
  FaUpload,
  FaBold,
  FaItalic,
  FaUnderline,
  FaCrown,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaListUl,
  FaListOl,
} from "react-icons/fa";
import axios from "axios";

const languages = [
  { code: "en-GB", name: "English (UK)", free: true },
  { code: "en-US", name: "English (US)", free: true },
  { code: "fr", name: "French", free: false },
  { code: "ar", name: "Arabic", free: false },
  { code: "ha", name: "Hausa", free: false },
  { code: "yo", name: "Yorùbá", free: false },
  { code: "ig", name: "Igbo", free: false },
  { code: "zu", name: "Zulu", free: false },
];

interface FormattingOptions {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  alignment: "left" | "center" | "right" | "justify";
  listType: "none" | "bullet" | "number";
}

const GrammarEditor = () => {
  const { colorMode } = useColorMode();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-GB");
  const [formatting, setFormatting] = useState<FormattingOptions>({
    bold: false,
    italic: false,
    underline: false,
    alignment: "left",
    listType: "none",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [corrections, setCorrections] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  useEffect(() => {
    // Validate initial language selection
    const isValidLanguage = languages.some((l) => l.code === language);
    if (!isValidLanguage) {
      console.warn("Invalid language selected, resetting to en-GB");
      setLanguage("en-GB");
    }
  }, [language]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ].includes(file.type)
    ) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, DOCX, or TXT file",
        status: "error",
        duration: 3000,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content.length > 1500) {
        toast({
          title: "Text too long",
          description: "Please limit text to 1500 words",
          status: "error",
          duration: 3000,
        });
        return;
      }
      setText(content);
    };
    reader.readAsText(file);
  };

  const handleGrammarCheck = async () => {
    if (!text.trim()) {
      toast({
        title: "Empty text",
        description: "Please enter some text to check",
        status: "error",
        duration: 3000,
      });
      return;
    }

    // Debug log for language selection
    console.log("Selected language:", language);

    const selectedLang = languages.find((l) => l.code === language);
    console.log("Found language:", selectedLang);

    if (!selectedLang?.free) {
      toast({
        title: "Premium Feature",
        description: `${selectedLang?.name} grammar check is a premium feature`,
        status: "warning",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Sending request with:", {
        text,
        language: selectedLang.code,
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/grammar`,
        {
          text,
          language: selectedLang.code,
        },
        { withCredentials: true }
      );

      console.log("Response:", response.data);

      if (
        response.data.corrections &&
        Array.isArray(response.data.corrections)
      ) {
        setCorrections(response.data.corrections);
      } else {
        console.error("Invalid response format:", response.data);
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Grammar check error:", error);
      toast({
        title: "Error",
        description: "Failed to check grammar. Please try again.",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    console.log("Language changed to:", newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Select
          value={language}
          onChange={handleLanguageChange}
          width="200px"
          bg={colorMode === "dark" ? "gray.700" : "white"}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name} {!lang.free && <FaCrown />}
            </option>
          ))}
        </Select>
        <ButtonGroup spacing={2}>
          <Tooltip label="Bold">
            <IconButton
              aria-label="Bold"
              icon={<FaBold />}
              onClick={() => setFormatting((f) => ({ ...f, bold: !f.bold }))}
              variant={formatting.bold ? "solid" : "ghost"}
            />
          </Tooltip>
          <Tooltip label="Italic">
            <IconButton
              aria-label="Italic"
              icon={<FaItalic />}
              onClick={() =>
                setFormatting((f) => ({ ...f, italic: !f.italic }))
              }
              variant={formatting.italic ? "solid" : "ghost"}
            />
          </Tooltip>
          <Tooltip label="Underline">
            <IconButton
              aria-label="Underline"
              icon={<FaUnderline />}
              onClick={() =>
                setFormatting((f) => ({ ...f, underline: !f.underline }))
              }
              variant={formatting.underline ? "solid" : "ghost"}
            />
          </Tooltip>
          <Tooltip label="Align Left">
            <IconButton
              aria-label="Align Left"
              icon={<FaAlignLeft />}
              onClick={() =>
                setFormatting((f) => ({ ...f, alignment: "left" }))
              }
              variant={formatting.alignment === "left" ? "solid" : "ghost"}
            />
          </Tooltip>
          <Tooltip label="Align Center">
            <IconButton
              aria-label="Align Center"
              icon={<FaAlignCenter />}
              onClick={() =>
                setFormatting((f) => ({ ...f, alignment: "center" }))
              }
              variant={formatting.alignment === "center" ? "solid" : "ghost"}
            />
          </Tooltip>
          <Tooltip label="Align Right">
            <IconButton
              aria-label="Align Right"
              icon={<FaAlignRight />}
              onClick={() =>
                setFormatting((f) => ({ ...f, alignment: "right" }))
              }
              variant={formatting.alignment === "right" ? "solid" : "ghost"}
            />
          </Tooltip>
          <Tooltip label="Justify">
            <IconButton
              aria-label="Justify"
              icon={<FaAlignJustify />}
              onClick={() =>
                setFormatting((f) => ({ ...f, alignment: "justify" }))
              }
              variant={formatting.alignment === "justify" ? "solid" : "ghost"}
            />
          </Tooltip>
          <Tooltip label="Bullet List">
            <IconButton
              aria-label="Bullet List"
              icon={<FaListUl />}
              onClick={() =>
                setFormatting((f) => ({
                  ...f,
                  listType: f.listType === "bullet" ? "none" : "bullet",
                }))
              }
              variant={formatting.listType === "bullet" ? "solid" : "ghost"}
            />
          </Tooltip>
          <Tooltip label="Numbered List">
            <IconButton
              aria-label="Numbered List"
              icon={<FaListOl />}
              onClick={() =>
                setFormatting((f) => ({
                  ...f,
                  listType: f.listType === "number" ? "none" : "number",
                }))
              }
              variant={formatting.listType === "number" ? "solid" : "ghost"}
            />
          </Tooltip>
        </ButtonGroup>
        <Input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          display="none"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        <Button
          leftIcon={<FaUpload />}
          onClick={() => fileInputRef.current?.click()}
        >
          Upload File
        </Button>
      </HStack>

      <Box position="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start by writing, pasting (⌘ + V) text, or uploading a document (doc, pdf)."
          height="300px"
          bg={colorMode === "dark" ? "gray.700" : "white"}
          fontWeight={formatting.bold ? "bold" : "normal"}
          fontStyle={formatting.italic ? "italic" : "normal"}
          textDecoration={formatting.underline ? "underline" : "none"}
          textAlign={formatting.alignment}
          sx={{
            listStyleType:
              formatting.listType === "bullet"
                ? "disc"
                : formatting.listType === "number"
                ? "decimal"
                : "none",
            paddingLeft: formatting.listType !== "none" ? "2em" : "0",
          }}
        />
        <Text
          position="absolute"
          bottom={2}
          right={2}
          fontSize="sm"
          color="gray.500"
        >
          {text.split(/\s+/).length} words
        </Text>
      </Box>

      <Button
        colorScheme="purple"
        onClick={handleGrammarCheck}
        isDisabled={!text.trim() || isLoading}
        isLoading={isLoading}
        loadingText="Checking..."
      >
        Check Grammar
      </Button>

      {corrections.length > 0 && (
        <Box
          p={4}
          bg={colorMode === "dark" ? "gray.700" : "gray.50"}
          borderRadius="md"
        >
          <Text fontWeight="bold" mb={2}>
            Suggestions:
          </Text>
          {corrections.map((correction, index) => (
            <Text key={index} fontSize="sm">
              • {correction}
            </Text>
          ))}
        </Box>
      )}
    </VStack>
  );
};

export default GrammarEditor;
