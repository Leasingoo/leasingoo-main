import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { COLORS } from "../helpers/globalColors";

const AdminLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    setLoading(true);

    let initialUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    let initialPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === initialUsername && password === initialPassword) {
      await window.localStorage.setItem("admin-status", "logged-in");
      router.push("/admin");
    } else {
      alert("Username or password incorrect, try again.");
    }

    setLoading(false);
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bgColor={COLORS.DARK_BLUE}
    >
      <Flex
        flexDir="column"
        borderRadius={15}
        border={`2px solid #fff`}
        w="50%"
        h="50%"
        p={20}
        alignItems="center"
      >
        <Text color="#fff" fontWeight="bold" fontSize={40} mb={10}>
          Admin Login
        </Text>

        <Input
          w="60%"
          mb={5}
          color="#fff"
          placeholder="Username"
          borderColor="#4299e1"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          w="60%"
          mb={10}
          color="#fff"
          placeholder="Password"
          borderColor="#4299e1"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button onClick={login} isLoading={loading}>
          Login
        </Button>
      </Flex>
    </Flex>
  );
};

export default AdminLogin;
