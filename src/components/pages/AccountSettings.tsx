import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  useToast,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "../Auth/useAuth";

interface ErrorResponse {
  message: string;
}

const AccountSettings = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const toast = useToast();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/auth/update-profile`,
        { name },
        { withCredentials: true }
      );

      updateUser(response.data.user);
      setIsEditing(false);

      toast({
        title: "Success",
        description: "Profile updated successfully",
        status: "success",
        duration: 3000,
      });
    } catch (err: unknown) {
      const error = err as AxiosError<ErrorResponse>;
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update profile",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">Account Settings</Heading>

        {/* Personal Details Section */}
        <Box p={6} borderWidth="1px" borderRadius="lg">
          <VStack align="stretch" spacing={6}>
            <Heading size="md">Personal Details</Heading>

            <HStack spacing={4}>
              <Avatar
                size="xl"
                src={user?.picture}
                name={user?.name || user?.email?.split("@")[0]}
              />
              <VStack align="start" spacing={1}>
                {isEditing ? (
                  <FormControl>
                    <FormLabel>Display Name</FormLabel>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </FormControl>
                ) : (
                  <>
                    <Text fontWeight="bold">
                      {user?.name || user?.email?.split("@")[0]}
                    </Text>
                    <Text color="gray.500">{user?.email}</Text>
                  </>
                )}
              </VStack>
            </HStack>

            <HStack justify="flex-end">
              {isEditing ? (
                <>
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme="purple" onClick={handleUpdateProfile}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  colorScheme="purple"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </HStack>
          </VStack>
        </Box>

        <Divider />

        {/* Add more sections as needed */}
      </VStack>
    </Container>
  );
};

export default AccountSettings;
