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
} from "react-icons/lu";
import { useState } from "react";

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <VStack gap="1" align="center" flex="1">
      <Flex
        w="38px"
        h="38px"
        rounded="full"
        bg={`${blue}15`}
        alignItems="center"
        justifyContent="center"
        color={blue}
        fontSize="16px"
      >
        <Icon />
      </Flex>
      <Text
        fontSize="9px"
        color="gray.400"
        fontWeight="semibold"
        letterSpacing="wide"
        textTransform="uppercase"
      >
        {label}
      </Text>
      <Text
        fontSize="11px"
        color="gray.600"
        fontWeight="medium"
        textAlign="center"
      >
        {value}
      </Text>
    </VStack>
  );
}

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

  // Preenche o form quando o user carrega
  function onOpenChange(open: boolean) {
    if (open && user) {
      setForm({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
        birthday: user.birthday ?? "",
        image: user.image ?? "",
        created_at:user.created_at ?? "",
      });
    }
  }

  async function onSave() {
    await handleUpdate(form);
  }

  if (loading) return <Text>A carregar...</Text>;

  return (
    <Box h="100vh">
      <Flex flexDir="column" h="100%">
        {/* Top */}
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

              {/* Modal de Edição */}
              <Dialog.Root onOpenChange={(e) => onOpenChange(e.open)}>
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
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Editar Perfil</Dialog.Title>
                      </Dialog.Header>

                      <Dialog.Body>
                        <VStack gap="3">
                          <Field.Root required>
                            <Field.Label>Nome</Field.Label>
                            <Input
                              value={form.name}
                              onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                              }
                            />
                          </Field.Root>

                          <Field.Root required>
                            <Field.Label>Email</Field.Label>
                            <Input
                              value={form.email}
                              onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                              }
                            />
                          </Field.Root>

                          <Field.Root>
                            <Field.Label>Telefone</Field.Label>
                            <Input
                              value={form.phone}
                              onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                              }
                            />
                          </Field.Root>

                          <Field.Root>
                            <Field.Label>Endereço</Field.Label>
                            <Input
                              value={form.address}
                              onChange={(e) =>
                                setForm({ ...form, address: e.target.value })
                              }
                            />
                          </Field.Root>

                          <Field.Root>
                            <Field.Label>Aniversário</Field.Label>
                            <Input
                              type="date"
                              value={form.birthday}
                              onChange={(e) =>
                                setForm({ ...form, birthday: e.target.value })
                              }
                            />
                          </Field.Root>
                        </VStack>
                      </Dialog.Body>

                      <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                          <Button variant="ghost">Cancelar</Button>
                        </Dialog.ActionTrigger>
                        <Dialog.ActionTrigger asChild>
                          <Button bg={blue} color={white} onClick={onSave}>
                            Guardar
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

        {/* Bottom */}
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
