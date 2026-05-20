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
import Sidebar from "../components/sidebar";

export default function ClientProfile() {
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
        birthday: user.birthday ? user.birthday.split("T")[0] : "",
        image: user.image ?? "",
        created_at: user.created_at ?? "",
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
    <Box display="flex" h="100vh" bg="gray.50">
      <Sidebar />

      <Box flex="1" ml="220px" overflow="auto">
        <Box maxW="1100px" mx="auto" px="8" py="8">
          {/* Card de perfil */}
          <Box
            bg={white}
            borderRadius="2xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
            overflow="hidden"
          >
            {/* Banner azul */}
            <Box bg={blue} h="100px" position="relative">
              <Box
                position="absolute"
                inset="0"
                opacity={0.08}
                backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
                backgroundSize="32px 32px"
              />
            </Box>

            {/* Avatar + info */}
            <Box px="6" pb="6">
              <HStack
                justify="space-between"
                align="flex-end"
                mt="-36px"
                mb="4"
              >
                <Flex
                  bg={blue}
                  w="72px"
                  h="72px"
                  rounded="full"
                  alignItems="center"
                  justifyContent="center"
                  color={white}
                  fontSize="2xl"
                  fontWeight="bold"
                  border="4px solid"
                  borderColor={white}
                  shadow="md"
                  flexShrink={0}
                >
                  {user?.name?.charAt(0).toUpperCase() ?? "?"}
                </Flex>

                {/* Botão editar */}
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
                          <HStack
                            justify="space-between"
                            align="center"
                            w="full"
                          >
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

              <Heading fontSize="lg" fontWeight="bold" color="gray.800">
                {user?.name}
              </Heading>
              <Text fontSize="xs" color="gray.400" mt="0.5">
                Membro desde {new Date(user?.created_at).getFullYear()}
              </Text>

              <Separator my="4" borderColor="gray.100" />

              {/* Info items */}
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

          {/* Stats */}
          <HStack gap="4" mt="6" align="stretch">
            {[
              { icon: LuClock, value: "24", label: "Serviços Contratados" },
              { icon: LuHeart, value: "8", label: "Profissionais Favoritos" },
              { icon: LuStar, value: "4.8", label: "Avaliação Média Dada" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Box
                  key={s.label}
                  flex="1"
                  rounded="2xl"
                  border="1px solid"
                  borderColor="gray.100"
                  bg={white}
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
                      <Icon />
                    </Flex>
                    <VStack align="flex-start" gap="0">
                      <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                        {s.value}
                      </Text>
                      <Text fontSize="xs" color="gray.400" fontWeight="medium">
                        {s.label}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              );
            })}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
