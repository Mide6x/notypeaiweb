import {
  VStack,
  Textarea,
  Button,
  useColorMode,
  Text,
  useToast,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { FaUpload } from "react-icons/fa";

const GrammarEditor = () => {
  const { colorMode } = useColorMode();
  const [text, setText] = useState("");
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
    if (text.split(/\s+/).length > 1500) {
      toast({
        title: "Text too long",
        description: "Please limit text to 1500 words",
        status: "error",
        duration: 3000,
      });
      return;
    }
    // TODO: Implement grammar check API call
  };

  return (
    <VStack spacing={6} align="stretch">
      <HStack justify="flex-end">
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

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter or paste your text here (max 1500 words)"
        height="300px"
        bg={colorMode === "dark" ? "gray.700" : "white"}
      />

      <Text fontSize="sm" color="gray.500">
        {text.split(/\s+/).length}/1500 words
      </Text>

      <Button
        colorScheme="purple"
        onClick={handleGrammarCheck}
        isDisabled={!text.trim()}
      >
        Check Grammar
      </Button>
    </VStack>
  );
};

export default GrammarEditor;
