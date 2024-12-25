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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";

interface PastSummary {
  _id: string;
  text: string;
  summary: string;
  mode: string;
  createdAt: string;
}

const Summarizer = () => {
  const { colorMode } = useColorMode();
  const [text, setText] = useState("");
  const [mode, setMode] = useState("natural");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [pastSummaries, setPastSummaries] = useState<PastSummary[]>([]);

  useEffect(() => {
    const fetchPastSummaries = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/ai/summaries`, {
          withCredentials: true,
        });
        setPastSummaries(response.data);
      } catch (error) {
        console.error("Error fetching past summaries:", error);
      }
    };

    fetchPastSummaries();
  }, [apiUrl]);

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

    // TODO: Implement file processing
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content.length > 2000) {
        toast({
          title: "Text too long",
          description: "Please limit text to 2000 words",
          status: "error",
          duration: 3000,
        });
        return;
      }
      setText(content);
    };
    reader.readAsText(file);
  };

  const handleSummarize = async () => {
    if (text.split(/\s+/).length > 2000) {
      toast({
        title: "Text too long",
        description: "Please limit text to 2000 words",
        status: "error",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/ai/summarize`,
        {
          text,
          mode, // This will affect the summarization style
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSummary(response.data.summary);
      const newSummary = {
        _id: Date.now().toString(),
        text,
        summary: response.data.summary,
        mode,
        createdAt: new Date().toISOString(),
      };
      setPastSummaries((prev) => [newSummary, ...prev.slice(0, 4)]);
      toast({
        title: "Summary generated",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("Summarization error:", error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <HStack justify="space-between">
        <Select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          width="200px"
          bg={colorMode === "dark" ? "gray.700" : "white"}
        >
          <option value="natural">Natural</option>
          <option value="fluency">Fluency</option>
          <option value="academic">Academic</option>
          <option value="creative">Creative</option>
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

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter or paste your text here (max 2000 words)"
        height="300px"
        bg={colorMode === "dark" ? "gray.700" : "white"}
      />

      <Text fontSize="sm" color="gray.500">
        {text.split(/\s+/).length}/2000 words
      </Text>

      <Button
        colorScheme="purple"
        onClick={handleSummarize}
        isDisabled={!text.trim() || isLoading}
        isLoading={isLoading}
        loadingText="Summarizing..."
      >
        Summarize Text
      </Button>

      {summary && (
        <Box
          p={4}
          bg={colorMode === "dark" ? "gray.700" : "gray.50"}
          borderRadius="md"
        >
          <Text fontWeight="bold" mb={2}>
            Current Summary:
          </Text>
          <Text>{summary}</Text>
        </Box>
      )}

      {pastSummaries.length > 0 && (
        <Accordion allowMultiple>
          <Text fontWeight="bold" mb={2}>
            Past Summaries:
          </Text>
          {pastSummaries.map((past) => (
            <AccordionItem key={past._id}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text fontSize="sm" color="gray.500">
                    {new Date(past.createdAt).toLocaleDateString()}
                  </Text>
                  <Badge colorScheme="purple" ml={2}>
                    {past.mode}
                  </Badge>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <VStack align="stretch" spacing={4}>
                  <Box>
                    <Text fontWeight="bold" fontSize="sm" mb={1}>
                      Original Text:
                    </Text>
                    <Text fontSize="sm" noOfLines={3}>
                      {past.text}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" fontSize="sm" mb={1}>
                      Summary:
                    </Text>
                    <Text>{past.summary}</Text>
                  </Box>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </VStack>
  );
};

export default Summarizer;
