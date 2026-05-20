import { useUser } from "@/app/controllers/useUser";
import { blue, white } from "@/app/utils/COLORS";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Heading,
  Separator,
  IconButton,
  Dialog,
  Portal,
  Field,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import {
  LuPencil,
  LuMail,
  LuPhone,
  LuMapPin,
  LuCake,
  LuClock,
  LuHeart,
  LuStar,
  LuX,
} from "react-icons/lu";
import { useState } from "react";
import InfoItem from "../components/infoItem";

export default function ProfessionalProfile() {
  const { user, loading, handleUpdate } = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    image: "",
    created_at: "",
  });

  function onOpenChange(open: boolean) {
    if (open && user) {
      setForm({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
        birthday: user.birthday ?? "",
        image: user.image ?? "",
        created_at: user.created_at ? user.birthday.split("T")[0] : "",
      });
    }
  }

  async function onSave() {
    await handleUpdate(form);
  }

  if (loading)
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <VStack gap="3">
          <Spinner color={blue} size="xl" animationDuration="0.8s" />
          <Text color={blue} fontSize="sm" fontWeight="medium">
            A carregar...
          </Text>
        </VStack>
      </Flex>
    );
  return (
    <Box h="100vh">
      <Flex flexDir="column" h="100%">
        <Box
          h="50%"
          bg={blue}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box w="70vw" bg={white} rounded="xl" p="6" shadow="lg">
            <HStack justify="space-between" align="flex-start">
              <HStack gap="4" align="center">
                <Flex
                  bg={blue}
                  w="72px"
                  h="72px"
                  rounded="full"
                  alignItems="center"
                  justifyContent="center"
                  color={white}
                  fontSize="xl"
                  fontWeight="bold"
                  flexShrink={0}
                >
                  {user?.name?.charAt(0).toUpperCase() ?? "?"}
                </Flex>

                <VStack align="flex-start" gap="0.5">
                  <Heading fontSize="lg" fontWeight="bold" color="gray.800">
                    {user?.name}
                  </Heading>
                  <Text fontSize="xs" color="gray.400">
                    Membro desde {new Date(user?.created_at).getFullYear()}
                  </Text>
                </VStack>
              </HStack>

              <Dialog.Root
                onOpenChange={(e) => onOpenChange(e.open)}
                size={{ mdDown: "full", md: "lg" }}
              >
                <Dialog.Trigger asChild>
                  <IconButton
                    aria-label="Editar perfil"
                    variant="ghost"
                    size="sm"
                    color={blue}
                    _hover={{ bg: `${blue}15` }}
                  >
                    <LuPencil />
                  </IconButton>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content borderRadius="2xl" p="2">
                      <Dialog.Header pb="0">
                        <HStack justify="space-between" align="center" w="full">
                          <Dialog.Title
                            fontSize="lg"
                            fontWeight="bold"
                            color="gray.800"
                          >
                            Editar Perfil
                          </Dialog.Title>
                          <Dialog.ActionTrigger asChild>
                            <IconButton
                              aria-label="Fechar"
                              variant="ghost"
                              size="sm"
                              color="gray.400"
                              _hover={{ color: "gray.600", bg: "gray.100" }}
                            >
                              <LuX />
                            </IconButton>
                          </Dialog.ActionTrigger>
                        </HStack>
                      </Dialog.Header>

                      <Dialog.Body py="4">
                        <Box
                          display="grid"
                          gridTemplateColumns="1fr 1fr"
                          gap="3"
                        >
                          <Field.Root required>
                            <Field.Label
                              fontSize="xs"
                              color="gray.500"
                              fontWeight="semibold"
                            >
                              Nome
                            </Field.Label>
                            <Input
                              size="sm"
                              borderRadius="lg"
                              value={form.name}
                              onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                              }
                            />
                          </Field.Root>

                          <Field.Root required>
                            <Field.Label
                              fontSize="xs"
                              color="gray.500"
                              fontWeight="semibold"
                            >
                              Email
                            </Field.Label>
                            <Input
                              size="sm"
                              borderRadius="lg"
                              value={form.email}
                              onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                              }
                            />
                          </Field.Root>

                          <Field.Root>
                            <Field.Label
                              fontSize="xs"
                              color="gray.500"
                              fontWeight="semibold"
                            >
                              Telefone
                            </Field.Label>
                            <Input
                              size="sm"
                              borderRadius="lg"
                              value={form.phone}
                              onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                              }
                            />
                          </Field.Root>

                          <Field.Root>
                            <Field.Label
                              fontSize="xs"
                              color="gray.500"
                              fontWeight="semibold"
                            >
                              Aniversário
                            </Field.Label>
                            <Input
                              size="sm"
                              borderRadius="lg"
                              type="date"
                              value={form.birthday}
                              onChange={(e) =>
                                setForm({ ...form, birthday: e.target.value })
                              }
                            />
                          </Field.Root>

                          <Field.Root gridColumn="span 2">
                            <Field.Label
                              fontSize="xs"
                              color="gray.500"
                              fontWeight="semibold"
                            >
                              Endereço
                            </Field.Label>
                            <Input
                              size="sm"
                              borderRadius="lg"
                              value={form.address}
                              onChange={(e) =>
                                setForm({ ...form, address: e.target.value })
                              }
                            />
                          </Field.Root>
                        </Box>
                      </Dialog.Body>

                      <Dialog.Footer pt="0">
                        <Dialog.ActionTrigger asChild>
                          <Button
                            bg={blue}
                            color={white}
                            borderRadius="lg"
                            w="full"
                            onClick={onSave}
                          >
                            Guardar alterações
                          </Button>
                        </Dialog.ActionTrigger>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            </HStack>

            <Separator my="4" borderColor="gray.100" />

            <HStack gap="2" justify="space-between">
              <InfoItem
                icon={LuMail}
                label="Email"
                value={user?.email ?? "-"}
              />
              <Separator
                orientation="vertical"
                h="60px"
                borderColor="gray.100"
              />
              <InfoItem
                icon={LuPhone}
                label="Telefone"
                value={user?.phone ?? "-"}
              />
              <Separator
                orientation="vertical"
                h="60px"
                borderColor="gray.100"
              />
              <InfoItem
                icon={LuMapPin}
                label="Endereço"
                value={user?.address ?? "-"}
              />
              <Separator
                orientation="vertical"
                h="60px"
                borderColor="gray.100"
              />
              <InfoItem
                icon={LuCake}
                label="Aniversário"
                value={user?.birthday ?? "-"}
              />
            </HStack>
          </Box>
        </Box>

        <Box
          h="50%"
          bg={white}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box w="70vw" p="6">
            <HStack gap="4" align="stretch">
              <Box
                flex="1"
                rounded="xl"
                border="1px solid"
                borderColor="gray.100"
                p="5"
                shadow="sm"
                transition="all 0.2s ease"
                _hover={{
                  shadow: "md",
                  borderColor: blue,
                  cursor: "pointer",
                  transform: "translateY(-2px)",
                }}
              >
                <VStack align="flex-start" gap="3">
                  <Flex
                    w="40px"
                    h="40px"
                    rounded="full"
                    bg={`${blue}15`}
                    alignItems="center"
                    justifyContent="center"
                    color={blue}
                  >
                    <LuClock />
                  </Flex>
                  <VStack align="flex-start" gap="0">
                    <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                      24
                    </Text>
                    <Text fontSize="xs" color="gray.400" fontWeight="medium">
                      Serviços Contratados
                    </Text>
                  </VStack>
                </VStack>
              </Box>

              <Box
                flex="1"
                rounded="xl"
                border="1px solid"
                borderColor="gray.100"
                p="5"
                shadow="sm"
                transition="all 0.2s ease"
                _hover={{
                  shadow: "md",
                  borderColor: blue,
                  cursor: "pointer",
                  transform: "translateY(-2px)",
                }}
              >
                <VStack align="flex-start" gap="3">
                  <Flex
                    w="40px"
                    h="40px"
                    rounded="full"
                    bg={`${blue}15`}
                    alignItems="center"
                    justifyContent="center"
                    color={blue}
                  >
                    <LuHeart />
                  </Flex>
                  <VStack align="flex-start" gap="0">
                    <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                      8
                    </Text>
                    <Text fontSize="xs" color="gray.400" fontWeight="medium">
                      Profissionais Favoritos
                    </Text>
                  </VStack>
                </VStack>
              </Box>

              <Box
                flex="1"
                rounded="xl"
                border="1px solid"
                borderColor="gray.100"
                p="5"
                shadow="sm"
                transition="all 0.2s ease"
                _hover={{
                  shadow: "md",
                  borderColor: blue,
                  cursor: "pointer",
                  transform: "translateY(-2px)",
                }}
              >
                <VStack align="flex-start" gap="3">
                  <Flex
                    w="40px"
                    h="40px"
                    rounded="full"
                    bg={`${blue}15`}
                    alignItems="center"
                    justifyContent="center"
                    color={blue}
                  >
                    <LuStar />
                  </Flex>
                  <VStack align="flex-start" gap="0">
                    <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                      4.8
                    </Text>
                    <Text fontSize="xs" color="gray.400" fontWeight="medium">
                      Avaliação Média Dada
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            </HStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
