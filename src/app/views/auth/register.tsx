import {
  Box,
  Flex,
  VStack,
  Text,
  Link,
  Heading,
  Center,
  SegmentGroup,
  HStack, 
  Button,
  Field,
  Input,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import Header from "../components/header";
import { blue, white, dblue2 } from "@/app/utils/COLORS";
import Footer from "../components/footer";
import { LuUser, LuBriefcase } from "react-icons/lu";
import { useState } from "react";
import { useRegister } from "@/app/controllers/useRegister";
import { usePageTitle } from "@/app/hooks/usePageTitle";

type TabValue = "user" | "worker";
export default function Register() {
        usePageTitle('Registro | Workê');
  const [visible, setVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TabValue>("user");

  const { handleRegister, loading, error } = useRegister();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function onSubmit() {
    const role = selectedTab === "worker" ? "worker" : "client";
    await handleRegister(name, email, password, role);
  }

  return (
    <>
      <Header />
      <Box w="100%" h="100vh" p="10">
        <Flex flexDir="column" justifyContent="center" alignItems="center">
          <VStack mb="6">
            <Heading>Registrar-se</Heading>
            <Text>
              Já tem conta?{" "}
              <Link color={blue} href="/login">
                Entrar
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



          <Box
            bg={white} w="400px" shadow="md"
            border="0.5px solid rgba(0,0,0,0.2)" rounded="md" p="6"
          >
            <Field.Root required mt="2">
              <Field.Label>Nome</Field.Label>
              <Input placeholder="Digite o seu nome" p="2"
                value={name} onChange={(e) => setName(e.target.value)} />
            </Field.Root>

            <Field.Root required mt="2">
              <Field.Label>Email</Field.Label>
              <Input placeholder="Digite o seu email" p="2"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field.Root>

            <Field.Root mt="4">
              <Field.Label>Senha</Field.Label>
              <PasswordInput placeholder="********"
                value={password} onChange={(e) => setPassword(e.target.value)}
                visible={visible} onVisibleChange={setVisible} p="2" />
            </Field.Root>

            {error && <Text color="red.500">{error}</Text>}

            <Button
              bg={blue} color={white} mt="4" w="100%" p="2"
              _hover={{ bg: dblue2 }} onClick={onSubmit} loading={loading}
            >
              Registrar
            </Button>
          </Box>


        </Flex>
      </Box>
      <Footer />
    </>
  );
}
