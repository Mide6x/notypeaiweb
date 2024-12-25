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
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { FaUpload, FaExchangeAlt } from "react-icons/fa";

const languages = [
  { code: "ha", name: "Hausa" },
  { code: "yo", name: "Yorùbá" },
  { code: "ig", name: "Igbo" },
  { code: "zu", name: "Zulu" },
  { code: "fr", name: "French" },
  { code: "ar", name: "Arabic" },
];

const Translator = () => {
  const { colorMode } = useColorMode();
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("ha");
  const [translatedText, setTranslatedText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

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
      setText(content);
    };
    reader.readAsText(file);
  };

  const handleTranslate = async () => {
    if (!text.trim()) {
      toast({
        title: "Empty text",
        description: "Please enter some text to translate",
        status: "error",
        duration: 3000,
      });
      return;
    }
    try {
      // Simulated translation for now
      setTranslatedText(
        `[Translated to ${
          languages.find((l) => l.code === targetLang)?.name
        }]: ${text}`
      );
    } catch {
      toast({
        title: "Translation Error",
        description: "Failed to translate text. Please try again.",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          width="200px"
          bg={colorMode === "dark" ? "gray.700" : "white"}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </Select>
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
          placeholder="Enter or paste your text here"
          height="200px"
          bg={colorMode === "dark" ? "gray.700" : "white"}
        />
      </Box>

      <Button
        leftIcon={<FaExchangeAlt />}
        colorScheme="purple"
        onClick={handleTranslate}
        isDisabled={!text.trim()}
      >
        Translate
      </Button>

      {translatedText && (
        <Box>
          <Text mb={2} fontSize="sm" color="gray.500">
            Translation:
          </Text>
          <Textarea
            value={translatedText}
            isReadOnly
            height="200px"
            bg={colorMode === "dark" ? "gray.700" : "white"}
          />
        </Box>
      )}
    </VStack>
  );
};

export default Translator;
