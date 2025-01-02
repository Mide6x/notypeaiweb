import {
  VStack,
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
  Divider,
  Icon,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import {
  FaUpload,
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaListUl,
  FaListOl,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import axios from "axios";

interface Correction {
  id: string;
  start: number;
  end: number;
  suggestion: string;
  severity: "error" | "warning";
  text: string;
  isFixed: boolean;
  explanation?: string;
}

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
  const [corrections, setCorrections] = useState<Correction[]>([]);
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

    const selectedLang = languages.find((l) => l.code === language);
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
    setCorrections([]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/grammar`,
        {
          text,
          language: selectedLang.code,
        },
        { withCredentials: true }
      );

      if (
        response.data.corrections &&
        Array.isArray(response.data.corrections)
      ) {
        // Process each correction to get proper character positions
        const newCorrections: Correction[] = [];

        for (const correction of response.data.corrections) {
          // Find the actual error in the text
          const errorText = text.slice(correction.start, correction.end);

          // Only add valid corrections that have actual text differences
          if (errorText && errorText !== correction.suggestion) {
            newCorrections.push({
              id: Math.random().toString(36).substr(2, 9),
              start: correction.start,
              end: correction.end,
              suggestion: correction.suggestion,
              severity: correction.severity || "error",
              text: errorText,
              isFixed: false,
              explanation: correction.explanation,
            });
          }
        }

        // Sort corrections by position
        newCorrections.sort((a, b) => a.start - b.start);

        // Remove overlapping corrections
        const filteredCorrections = newCorrections.filter(
          (correction, index) => {
            if (index === 0) return true;
            const prevCorrection = newCorrections[index - 1];
            return correction.start >= prevCorrection.end;
          }
        );

        setCorrections(filteredCorrections);

        if (filteredCorrections.length > 0) {
          toast({
            title: "Grammar Check Complete",
            description: `Found ${filteredCorrections.length} issue${
              filteredCorrections.length === 1 ? "" : "s"
            }`,
            status: "info",
            duration: 3000,
          });
        } else {
          toast({
            title: "Perfect!",
            description: "No grammar issues found",
            status: "success",
            duration: 3000,
          });
        }
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

  const handleCorrectionClick = (correction: Correction) => {
    if (correction.isFixed) return;

    // Apply the correction while preserving the rest of the text
    const newText =
      text.slice(0, correction.start) +
      correction.suggestion +
      text.slice(correction.end);

    setText(newText);

    // Update correction positions after applying a fix
    setCorrections((prevCorrections) =>
      prevCorrections.map((c) => {
        if (c.id === correction.id) {
          return { ...c, isFixed: true };
        }
        // Adjust positions of later corrections
        if (c.start > correction.end) {
          const lengthDiff =
            correction.suggestion.length - correction.text.length;
          return {
            ...c,
            start: c.start + lengthDiff,
            end: c.end + lengthDiff,
          };
        }
        return c;
      })
    );

    toast({
      title: "Correction Applied",
      description: `Changed "${correction.text}" to "${correction.suggestion}"`,
      status: "success",
      duration: 2000,
    });
  };

  return (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between" wrap="wrap" spacing={4}>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          width={{ base: "full", md: "200px" }}
          bg={colorMode === "dark" ? "gray.700" : "white"}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name} {!lang.free && "👑"}
            </option>
          ))}
        </Select>
        <ButtonGroup spacing={2} flexWrap="wrap">
          <Tooltip label="Bold">
            <IconButton
              aria-label="Bold"
              icon={<FaBold />}
              onClick={() => setFormatting((f) => ({ ...f, bold: !f.bold }))}
              variant={formatting.bold ? "solid" : "ghost"}
              colorScheme="purple"
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
        <Button
          leftIcon={<FaUpload />}
          onClick={() => fileInputRef.current?.click()}
          colorScheme="purple"
          variant="outline"
        >
          Upload File
        </Button>
        <Input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          display="none"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
      </HStack>

      <Box
        position="relative"
        borderWidth={2}
        borderRadius="lg"
        borderColor={colorMode === "dark" ? "gray.600" : "gray.200"}
        _hover={{
          borderColor: "purple.500",
        }}
        transition="all 0.2s"
      >
        <Box position="relative" minH="300px" width="100%">
          {/* Background textarea for actual text input */}
          <Box
            as="textarea"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            placeholder="Start by writing, pasting (⌘ + V) text, or uploading a document (doc, pdf)."
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            p={6}
            width="100%"
            height="100%"
            minH="300px"
            borderRadius="md"
            bg={colorMode === "dark" ? "gray.700" : "white"}
            color={colorMode === "dark" ? "white" : "black"}
            resize="vertical"
            zIndex={1}
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
            _focus={{
              outline: "none",
              boxShadow: "none",
            }}
          />

          {/* Overlay for highlights */}
          {corrections.length > 0 && (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              p={6}
              pointerEvents="none"
              zIndex={2}
              whiteSpace="pre-wrap"
              wordBreak="break-word"
              overflow="hidden"
              fontWeight={formatting.bold ? "bold" : "normal"}
              fontStyle={formatting.italic ? "italic" : "normal"}
              textDecoration={formatting.underline ? "underline" : "none"}
              textAlign={formatting.alignment}
            >
              {corrections
                .sort((a, b) => a.start - b.start)
                .map((correction) => {
                  const highlightColor = correction.isFixed
                    ? "rgba(72, 187, 120, 0.2)"
                    : correction.severity === "error"
                    ? "rgba(245, 101, 101, 0.2)"
                    : "rgba(236, 201, 75, 0.2)";

                  const borderColor = correction.isFixed
                    ? "rgb(72, 187, 120)"
                    : correction.severity === "error"
                    ? "rgb(245, 101, 101)"
                    : "rgb(236, 201, 75)";

                  const start = correction.start;
                  const end = correction.end;

                  return (
                    <Box
                      key={correction.id}
                      as="span"
                      display="inline"
                      position="relative"
                      style={{
                        backgroundColor: highlightColor,
                        borderBottom: `2px solid ${borderColor}`,
                        cursor: !correction.isFixed ? "pointer" : "default",
                        left: `${start}ch`,
                        width: `${end - start}ch`,
                      }}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        if (!correction.isFixed) {
                          handleCorrectionClick(correction);
                        }
                      }}
                      title={
                        correction.isFixed
                          ? "Fixed!"
                          : `Click to apply suggestion: ${correction.suggestion}`
                      }
                    />
                  );
                })}
            </Box>
          )}
        </Box>

        <Text
          position="absolute"
          bottom={2}
          right={4}
          fontSize="sm"
          color="gray.500"
          zIndex={3}
        >
          {text.split(/\s+/).filter(Boolean).length} words
        </Text>
      </Box>

      <Button
        colorScheme="purple"
        size="lg"
        onClick={handleGrammarCheck}
        isDisabled={!text.trim() || isLoading}
        isLoading={isLoading}
        loadingText="Checking..."
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        transition="all 0.2s"
      >
        Check Grammar
      </Button>

      {corrections.length > 0 && (
        <Box
          p={6}
          bg={colorMode === "dark" ? "gray.800" : "white"}
          borderRadius="xl"
          boxShadow="xl"
          borderWidth={1}
          borderColor={colorMode === "dark" ? "gray.700" : "gray.200"}
        >
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontWeight="bold" fontSize="lg">
                Found {corrections.length} issues:
              </Text>
              <HStack spacing={4}>
                <HStack>
                  <Box w={2} h={2} borderRadius="full" bg="red.500" />
                  <Text fontSize="sm">Error</Text>
                </HStack>
                <HStack>
                  <Box w={2} h={2} borderRadius="full" bg="yellow.500" />
                  <Text fontSize="sm">Warning</Text>
                </HStack>
                <HStack>
                  <Box w={2} h={2} borderRadius="full" bg="green.500" />
                  <Text fontSize="sm">Fixed</Text>
                </HStack>
              </HStack>
            </HStack>
            <Divider />
            <VStack spacing={3} align="stretch">
              {corrections.map((correction) => (
                <HStack
                  key={correction.id}
                  spacing={3}
                  p={3}
                  borderRadius="md"
                  bg={colorMode === "dark" ? "gray.700" : "gray.50"}
                  opacity={correction.isFixed ? 0.7 : 1}
                  transition="all 0.2s"
                  _hover={{
                    transform: !correction.isFixed ? "translateX(4px)" : "none",
                  }}
                  cursor={!correction.isFixed ? "pointer" : "default"}
                  onClick={() =>
                    !correction.isFixed && handleCorrectionClick(correction)
                  }
                >
                  <Box
                    w={2}
                    h={2}
                    borderRadius="full"
                    bg={
                      correction.isFixed
                        ? "green.500"
                        : correction.severity === "error"
                        ? "red.500"
                        : "yellow.500"
                    }
                  />
                  <VStack align="start" spacing={1} flex={1}>
                    <HStack spacing={2}>
                      <Text
                        fontSize="sm"
                        textDecoration={
                          correction.isFixed ? "line-through" : "none"
                        }
                      >
                        "{correction.text}"
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        →
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight={correction.isFixed ? "bold" : "normal"}
                        color={correction.isFixed ? "green.500" : undefined}
                      >
                        "{correction.suggestion}"
                      </Text>
                    </HStack>
                    {correction.explanation && (
                      <Text fontSize="xs" color="gray.500">
                        {correction.explanation}
                      </Text>
                    )}
                  </VStack>
                  {correction.isFixed ? (
                    <Icon as={FaCheck} color="green.500" />
                  ) : correction.severity === "error" ? (
                    <Icon as={FaTimes} color="red.500" />
                  ) : (
                    <Icon as={FaExclamationTriangle} color="yellow.500" />
                  )}
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default GrammarEditor;
