import {
  Box,
  Heading,
  Flex,
  VStack,
  HStack,
  Text,
  Link,
  SegmentGroup,
  Center,
  Input,
  Field,
  Button,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import Footer from "../components/footer";
import Header from "../components/header";
import { blue, white } from "../../utils/COLORS";
import { LuUser, LuBriefcase } from "react-icons/lu";
import { useState } from "react";
import { useLogin } from "@/app/controllers/useLogin";
import { useNavigate } from "react-router-dom";

type TabValue = "user" | "worker";
export default function Login() {

  const [visible, setVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TabValue>("user");

  const { handleLogin, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function onSubmit() {
    const data = await handleLogin(email, password);
    if (data) {
      if (data.user.role === "client") navigate("/client/profile");
      if (data.user.role === "worker") navigate("/worker/dashboard");
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }

  return (
    <>
      <Header />
      <Box w="100%" h="100vh" p="10">
        <Flex flexDir="column" justifyContent="center" alignItems="center">
          <VStack mb="6">
            <Heading>Entrar na Conta</Heading>
            <Text>
              Não tem conta?{" "}
              <Link color={blue} href="/register">
                Cadastre-se grátis
              </Link>
            </Text>
          </VStack>

          <Center mb="6">
            <SegmentGroup.Root
              defaultValue="user"
              bg="gray.100"
              p="1.5"
              borderRadius="xl"
              w="fit-content"
              onValueChange={(e) => setSelectedTab(e.value as TabValue)}
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Items
                items={[
                  {
                    value: "user",
                    label: (
                      <HStack gap="2" px="3" py="1.5" color={blue}>
                        <LuUser size={15} />
                        <Text fontWeight="medium" fontSize="sm">
                          Cliente
                        </Text>
                      </HStack>
                    ),
                  },
                  {
                    value: "worker",
                    label: (
                      <HStack gap="2" px="3" py="1.5" color={blue}>
                        <LuBriefcase size={15} />
                        <Text fontWeight="medium" fontSize="sm">
                          Profissional
                        </Text>
                      </HStack>
                    ),
                  },
                ]}
              />
            </SegmentGroup.Root>
          </Center>

          {selectedTab === "user" && (
            <Box
              bg={white}
              w={{ base: "95%", md: "400px" }}
              h="auto"
              shadow="md"
              border="0.5px solid rgba(0,0,0,0.2)"
              rounded="md"
              p="6"
            >
              <Field.Root required mt="2">
                <Field.Label>Email</Field.Label>
                <Input
                  placeholder="Digite o seu email cliente"
                  p="2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field.Root>

              <Field.Root mt="4">
                <Field.Label>Senha</Field.Label>
                <PasswordInput
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  visible={visible}
                  onVisibleChange={setVisible}
                  p="2"
                />
              </Field.Root>

              {error && <Text color="red.500">{error}</Text>}

              <Button
                type="submit"
                bg={blue}
                color={white}
                mt="4"
                w="100%"
                p="2"
                _hover={{ bg: blue }}
                onClick={onSubmit}
                loading={loading}
              >
                Entrar
              </Button>
            </Box>
          )}

          {selectedTab === "worker" && (
            <Box
              bg={white}
              w={{ base: "95%", md: "400px" }}
              h="auto"
              shadow="md"
              border="0.5px solid rgba(0,0,0,0.2)"
              rounded="md"
              p="6"

            >

              <Field.Root required mt="2">
                <Field.Label>Email</Field.Label>
                <Input placeholder="Digite o seu email worker" p="2" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </Field.Root>

              <Field.Root mt="4">
                <Field.Label>Senha</Field.Label>
                <PasswordInput
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  visible={visible}
                  onVisibleChange={setVisible}
                  p="2"
                />
              </Field.Root>

              {error && <Text color="red.500">{error}</Text>}

              <Button
                type="submit"
                bg={blue}
                color={white}
                mt="4"
                w="100%"
                p="2"
                _hover={{ bg: blue }}
                onClick={onSubmit}
                loading={loading}
              >
                Entrar
              </Button>
            </Box>
          )}
        </Flex>
      </Box>
      <Footer />
    </>
  );
}
