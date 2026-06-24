// src/views/admin/profile.tsx
import {
  Box,
  Flex,
  HStack,
  Text,
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
  LuX,
  LuShield,
} from "react-icons/lu";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import InfoItem from "../components/infoItem";
import { blue, white } from "@/app/utils/COLORS";
import { useUser } from "@/app/controllers/useUser";
import { useSidebar } from "@/app/context/SidebarContext";
import MobileMenuButton from "../components/mobile_menu_button";
import { usePageTitle } from "@/app/hooks/usePageTitle";

export default function AdminProfile() {
  usePageTitle("Admin Perfil | Workê");
  const { user, loading, handleUpdate } = useUser();
  const { sidebarW } = useSidebar();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    image: "",
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
      });
    }
  }

  async function onSave() {
    await handleUpdate(form);
  }

  if (loading)
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <Spinner color={blue} size="xl" animationDuration="0.8s" />
      </Flex>
    );

  return (
    <Box display="flex" h="100vh" bg="gray.50">
      <Sidebar />
      <MobileMenuButton /> 
      <Box
        flex="1"
        ml={{ base: "0", md: sidebarW }}
        transition="margin 0.25s ease"
        overflow="auto"
      >
        <Box maxW="1100px" mx="auto" px="8" py="8">
          <Box
            bg={white}
            borderRadius="2xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
            overflow="hidden"
          >
            <Box bg={blue} h="100px" position="relative">
              <Box
                position="absolute"
                inset="0"
                opacity={0.08}
                backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
                backgroundSize="32px 32px"
              />
            </Box>

            <Box px="6" pb="6">
              <HStack
                justify="space-between"
                align="flex-end"
                mt="-36px"
                mb="4"
              >
                {user?.image ? (
                  <Box
                    w="72px"
                    h="72px"
                    rounded="full"
                    overflow="hidden"
                    border="4px solid"
                    borderColor={white}
                    shadow="md"
                    flexShrink={0}
                  >
                    <img
                      src={user.image}
                      alt={user.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ) : (
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
                )}

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
                      <Dialog.Content borderRadius="2xl" p="4">
                        <Dialog.Header pb="2">
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
                        <Dialog.Body py="4" px="2">
                          <Box
                            display="grid"
                            gridTemplateColumns="1fr 1fr"
                            gap="4"
                          >
                            <Field.Root required>
                              <Field.Label
                                fontSize="xs"
                                color="gray.500"
                                fontWeight="semibold"
                                mb="1"
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
                                mb="1"
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
                                mb="1"
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
                                mb="1"
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
                                mb="1"
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
                        <Dialog.Footer pt="0" pb="2" px="2">
                          <Dialog.ActionTrigger asChild>
                            <Button
                              bg={blue}
                              color={white}
                              borderRadius="xl"
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

              <HStack gap="2" align="center">
                <Heading fontSize="lg" fontWeight="bold" color="gray.800">
                  {user?.name}
                </Heading>
                <Box
                  px="2"
                  py="0.5"
                  borderRadius="full"
                  bg="#F9731615"
                  color="#F97316"
                  fontSize="10px"
                  fontWeight="semibold"
                >
                  <HStack gap="1">
                    <LuShield size={10} />
                    <Text>Admin</Text>
                  </HStack>
                </Box>
              </HStack>
              <Text fontSize="xs" color="gray.400" mt="0.5">
                Membro desde {new Date(user?.created_at ?? Date.now()).getFullYear()}
              </Text>

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
        </Box>
      </Box>
    </Box>
  );
}
