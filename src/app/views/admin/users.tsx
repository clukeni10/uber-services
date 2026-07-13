// src/views/admin/users.tsx
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Heading,
  Input,
  InputGroup,
  Badge,
  Spinner,
  Center,
  Button,
  Dialog,
  Portal,
  Field, 
  Select,
  createListCollection,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { LuSearch, LuPlus, LuPencil, LuTrash } from "react-icons/lu";
import Sidebar from "../components/sidebar";
import { blue, white } from "@/app/utils/COLORS";
import { useAdmin } from "@/app/controllers/useAdmin";
import { useState } from "react";
import type { User } from "@/app/types/UserType";
import { useSidebar } from "@/app/context/SidebarContext";
import MobileMenuButton from "../components/mobile_menu_button";
import { usePageTitle } from "@/app/hooks/usePageTitle";

const roleCollection = createListCollection({
  items: [
    { label: "Cliente", value: "client" },
    { label: "Worker", value: "worker" },
    { label: "Admin", value: "admin" },
  ],
});

const roleConfig: Record<string, { label: string; color: string; bg: string }> =
  {
    client: { label: "Cliente", color: blue, bg: `${blue}15` },
    worker: { label: "Worker", color: "#8B5CF6", bg: "#8B5CF615" },
    admin: { label: "Admin", color: "#F97316", bg: "#F9731615" },
  };

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  birthday: "",
  role: "client",
  password: "",
};

export default function AdminUsers() {
  usePageTitle("Admin Usuários | Workê");
  const { users, loading, handleCreate, handleUpdate, handleDelete } =
    useAdmin();
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { sidebarW } = useSidebar();

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  function openCreate() {
    setEditUser(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(user: User) {
    setEditUser(user);
    setForm({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      address: user.address ?? "",
      birthday: user.birthday ? String(user.birthday).split("T")[0] : "",
      role: user.role ?? "client",
      password: "",
    });
    setModalOpen(true);
  }

  async function onSave() {
    setSaving(true);
    try {
      if (editUser) {
        await handleUpdate(editUser.id, form);
      } else {
        await handleCreate(form);
      }
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: number) {
    if (!confirm("Tens a certeza que queres eliminar este utilizador?")) return;
    await handleDelete(id);
  }

  return (
    <Box display="flex" minH="100vh" bg="gray.50">
      <Sidebar />
      <MobileMenuButton /> 

      <Box
        w="100%"
        flex="1"
        ml={{ base: "0", md: sidebarW }}
        transition="margin 0.25s ease"
        overflow="auto"
      >
        {/* Hero */}
        <Box
          bg={blue}
          w="100%"
          px={{ base: 4, md: 10 }}
          py={10}
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            inset="0"
            opacity={0.08}
            backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
            backgroundSize="32px 32px"
          />
          <Box maxW="1100px" mx="auto" position="relative">
            <Heading
              color={white}
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              mb={1}
            >
              Utilizadores
            </Heading>
            <Text color="whiteAlpha.800" fontSize="sm">
              Gere todos os utilizadores da plataforma.
            </Text>
          </Box>
        </Box>

        <Box maxW="1100px" mx="auto" px="6" py="8">
          {/* Toolbar */}
          <HStack justify="space-between" mb="5" flexWrap="wrap" gap="3">
            <HStack gap="3" flex="1" flexWrap="wrap">
              <InputGroup
                maxW="300px"
                startElement={<LuSearch size={15} color="gray" />}
              >
                <Input
                  placeholder="Pesquisar por nome ou email..."
                  bg={white}
                  borderRadius="xl"
                  fontSize="sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>

              {/* Filtro por role */}
              <HStack gap="2">
                {["all", "client", "worker", "admin"].map((r) => (
                  <Box
                    key={r}
                    px="3"
                    py="1.5"
                    borderRadius="full"
                    cursor="pointer"
                    fontSize="xs"
                    fontWeight="semibold"
                    bg={filterRole === r ? blue : white}
                    color={filterRole === r ? white : "gray.500"}
                    border="1px solid"
                    borderColor={filterRole === r ? blue : "gray.200"}
                    onClick={() => setFilterRole(r)}
                    transition="all 0.15s"
                  >
                    {r === "all" ? "Todos" : roleConfig[r]?.label}
                  </Box>
                ))}
              </HStack>
            </HStack>

            <Button
              bg={blue}
              color={white}
              borderRadius="xl"
              size="sm"
              onClick={openCreate}
              p="2"
            >
              <HStack gap="1.5">
                <LuPlus size={15} />
                <Text>Novo utilizador</Text>
              </HStack>
            </Button>
          </HStack>

          {/* Tabela */}
          {loading ? (
            <Center h="200px">
              <Spinner color={blue} size="xl" />
            </Center>
          ) : (
            <Box
              bg={white}
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.100"
              shadow="sm"
              overflow="hidden"
            >
              {/* Header */}
              <HStack
                px="5"
                py="3"
                bg="gray.50"
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                <Text
                  flex="2"
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  Utilizador
                </Text>
                <Text
                  flex="2"
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  Email
                </Text>
                <Text
                  flex="1"
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  Role
                </Text>
                <Text
                  flex="1"
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  Registado
                </Text>
                <Text
                  w="80px"
                  fontSize="xs"
                  color="gray.400"
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  Ações
                </Text>
              </HStack>

              {filtered.length === 0 ? (
                <Center h="150px">
                  <Text color="gray.400">Nenhum utilizador encontrado</Text>
                </Center>
              ) : (
                <VStack gap="0" divideY="1px" divideColor="gray.100">
                  {filtered.map((u) => {
                    const config = roleConfig[u.role] ?? roleConfig.client;
                    return (
                      <HStack
                        key={u.id}
                        px="5"
                        py="4"
                        w="full"
                        _hover={{ bg: "gray.50" }}
                        transition="background 0.15s"
                      >
                        <HStack flex="2" gap="3">
                          
                            <Box
                              w="36px"
                              h="36px"
                              borderRadius="full"
                              overflow="hidden"
                              flexShrink={0}
                            >
                          <Avatar.Root w="100%" h="100%">
              <Avatar.Image
                src={
                  u?.image
                    ? `http://localhost:3001/${u.image}`
                    : undefined
                }
                alt={u?.name}
                objectFit="cover"
              />

              <Avatar.Fallback
                name={u?.name || "?"}
                bg="#0E1B2D"
                p="6"
                color="white"
                fontWeight="bold"
                fontSize="xl"
              />
            </Avatar.Root>
            </Box>
                          <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color="gray.800"
                          >
                            {u.name}
                          </Text>
                        </HStack>
                        <Text flex="2" fontSize="sm" color="gray.500">
                          {u.email}
                        </Text>
                        <Box flex="1">
                          <Badge
                            bg={config.bg}
                            color={config.color}
                            borderRadius="full"
                            px="2"
                            fontSize="10px"
                          >
                            {config.label}
                          </Badge>
                        </Box>
                        <Text flex="1" fontSize="xs" color="gray.400">
                          {new Date(u.created_at).toLocaleDateString("pt-PT")}
                        </Text>
                        <HStack w="80px" gap="1">
                          <IconButton
                            aria-label="Editar"
                            variant="ghost"
                            size="sm"
                            color={blue}
                            _hover={{ bg: `${blue}15` }}
                            onClick={() => openEdit(u)}
                          >
                            <LuPencil size={14} />
                          </IconButton>
                          <IconButton
                            aria-label="Eliminar"
                            variant="ghost"
                            size="sm"
                            color="red.400"
                            _hover={{ bg: "red.50" }}
                            onClick={() => onDelete(u.id)}
                          >
                            <LuTrash size={14} />
                          </IconButton>
                        </HStack>
                      </HStack>
                    );
                  })}
                </VStack>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Modal criar/editar */}
      <Dialog.Root
        open={modalOpen}
        onOpenChange={(e) => setModalOpen(e.open)}
        size={{ mdDown: "full", md: "md" }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl" p="4">
              <Dialog.Header pb="2">
                <Dialog.Title fontSize="lg" fontWeight="bold" color="gray.800">
                  {editUser ? "Editar utilizador" : "Novo utilizador"}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body py="4" px="2">
                <Box display="grid" gridTemplateColumns="1fr 1fr" gap="4">
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
                  <Field.Root>
                    <Field.Label
                      fontSize="xs"
                      color="gray.500"
                      fontWeight="semibold"
                      mb="1"
                    >
                      Role
                    </Field.Label>
                    <Select.Root
                      collection={roleCollection}
                      size="sm"
                      value={[form.role]}
                      onValueChange={(e) =>
                        setForm({ ...form, role: e.value[0] })
                      }
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger borderRadius="lg">
                          <Select.ValueText placeholder="Selecionar" />
                        </Select.Trigger>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {roleCollection.items.map((item) => (
                              <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label
                      fontSize="xs"
                      color="gray.500"
                      fontWeight="semibold"
                      mb="1"
                    >
                      {editUser ? "Nova password (opcional)" : "Password"}
                    </Field.Label>
                    <Input
                      size="sm"
                      borderRadius="lg"
                      type="password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </Field.Root>
                </Box>
              </Dialog.Body>
              <Dialog.Footer pt="0" pb="2" px="2">
                <Dialog.ActionTrigger asChild>
                  <Button variant="ghost" borderRadius="xl" mr="2">
                    Cancelar
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  bg={blue}
                  color={white}
                  borderRadius="xl"
                  flex="1"
                  onClick={onSave}
                  loading={saving}
                >
                  {editUser ? "Guardar alterações" : "Criar utilizador"}
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
