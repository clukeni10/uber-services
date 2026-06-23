import {
  Box, Flex, HStack, VStack, Text, Heading,
  Separator, Button, Spinner, Dialog, Portal,
  Field, Input, Badge,
} from "@chakra-ui/react";
import {
  LuMapPin, LuStar, LuBriefcase, LuClock,
  LuCreditCard, LuArrowLeft,
} from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import { useWorkerById } from "@/app/controllers/useWorkerById";
import { useCreateService } from "@/app/controllers/useCreateService";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import { blue, white } from "@/app/utils/COLORS";
import { useSidebar } from "@/app/context/SidebarContext";
import MobileMenuButton from "../components/mobile_menu_button";


export default function WorkerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { worker, loading } = useWorkerById(Number(id));
  const { handleCreate, loading: creating, error } = useCreateService();
  
    const { sidebarW } = useSidebar();

  const [form, setForm] = useState({
    description: "",
    scheduled_at: "",
  });


  async function onSubmit() {
  if (!worker) return;
  const result = await handleCreate({
    worker_id:    worker.id,
    description:  form.description,
    scheduled_at: form.scheduled_at,
  });
  if (result) {
    navigate("/client/services");
  }
}

  if (loading)
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <Spinner color={blue} size="xl" />
      </Flex>
    );

  return (
    <Box display="flex" h="100vh" bg="gray.50">
      <Sidebar />
      <MobileMenuButton /> 

      <Box flex="1"
  ml={{ base: "0", md: sidebarW }}
  transition="margin 0.25s ease">
        <Box maxW="800px" mx="auto" px="8" py="8">

          {/* Voltar */}
          <HStack
            gap="2" mb="6" color="gray.500" cursor="pointer"
            _hover={{ color: blue }} onClick={() => navigate(-1)}
            w="fit-content"
          >
            <LuArrowLeft size={16} />
            <Text fontSize="sm" fontWeight="medium">Voltar</Text>
          </HStack>

          {/* Card do worker */}
          <Box
            bg={white} borderRadius="2xl" border="1px solid"
            borderColor="gray.100" shadow="sm" overflow="hidden"
          >
            <Box bg={blue} h="80px" position="relative">
              <Box
                position="absolute" inset="0" opacity={0.08}
                backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
                backgroundSize="32px 32px"
              />
            </Box>

            <Box px="6" pb="6">
              <HStack justify="space-between" align="flex-end" mt="-30px" mb="4">
                {worker?.image ? (
                  <Box
                    w="64px" h="64px" rounded="full" overflow="hidden"
                    border="4px solid" borderColor={white} shadow="md"
                  >
                    <img src={worker.image} alt={worker.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </Box>
                ) : (
                  <Flex
                    bg={blue} w="64px" h="64px" rounded="full"
                    alignItems="center" justifyContent="center"
                    color={white} fontSize="xl" fontWeight="bold"
                    border="4px solid" borderColor={white} shadow="md"
                  >
                    {worker?.name?.charAt(0).toUpperCase() ?? "?"}
                  </Flex>
                )}
                <Badge
                  bg={worker?.is_available ? "#10B98115" : "gray.100"}
                  color={worker?.is_available ? "#10B981" : "gray.400"}
                  borderRadius="full" px="3" py="1" fontSize="xs"
                >
                  {worker?.is_available ? "Disponível" : "Indisponível"}
                </Badge>
              </HStack>

              <Heading fontSize="lg" fontWeight="bold" color="gray.800">{worker?.name}</Heading>
              <Text fontSize="sm" color={blue} fontWeight="medium" mt="0.5">{worker?.specialty}</Text>
              {worker?.bio && (
                <Text fontSize="sm" color="gray.500" mt="2">{worker.bio}</Text>
              )}

              <Separator my="4" borderColor="gray.100" />

              <HStack gap="6" flexWrap="wrap">
                <HStack gap="1.5" color="gray.500">
                  <LuStar size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text fontSize="sm" fontWeight="bold" color="gray.800">
                    {worker?.rating_avg ? Number(worker.rating_avg).toFixed(1) : "—"}
                  </Text>
                  <Text fontSize="xs" color="gray.400">avaliação</Text>
                </HStack>
                <HStack gap="1.5" color="gray.500">
                  <LuBriefcase size={14} />
                  <Text fontSize="sm">{worker?.specialty ?? "—"}</Text>
                </HStack>
                <HStack gap="1.5" color="gray.500">
                  <LuMapPin size={14} />
                  <Text fontSize="sm">{worker?.address ?? "—"}</Text>
                </HStack>
                <HStack gap="1.5" color="gray.500">
                  <LuClock size={14} />
                  <Text fontSize="sm" fontWeight="bold" color={blue}>
                    {worker?.hourly_rate ? `${worker.hourly_rate} Kz/h` : "Preço a combinar"}
                  </Text>
                </HStack>
              </HStack>
            </Box>
          </Box>

{/* Botão contratar */}
<Box mt="6">
  <Dialog.Root size={{ mdDown: "full", md: "md" }}>
    <Dialog.Trigger asChild>
      <Button
        bg={blue} color={white} w="full" borderRadius="xl" size="lg"
        _hover={{ opacity: 0.9 }}
        disabled={!worker?.is_available}
      >
        {worker?.is_available ? "Contratar" : "Profissional indisponível"}
      </Button>
    </Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content borderRadius="2xl" p="4">
          <Dialog.Header pb="2">
            <Dialog.Title fontSize="lg" fontWeight="bold" color="gray.800">
              Contratar {worker?.name}
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body py="4" px="2">
            <VStack gap="4">
              <Box w="full" bg="gray.50" borderRadius="xl" p="4" border="1px solid" borderColor="gray.100">
                <HStack justify="space-between">
                  <VStack align="flex-start" gap="0">
                    <Text fontSize="xs" color="gray.400">Preço por hora</Text>
                    <Text fontSize="xl" fontWeight="bold" color={blue}>
                      {worker?.hourly_rate ? `${worker.hourly_rate} Kz` : "A combinar"}
                    </Text>
                  </VStack>
                  <Flex w="44px" h="44px" borderRadius="full" bg={`${blue}15`}
                    alignItems="center" justifyContent="center" color={blue}>
                    <LuCreditCard size={18} />
                  </Flex>
                </HStack>
                <Text fontSize="10px" color="gray.400" mt="2">
                  O valor final é calculado pelas horas efetivamente trabalhadas.
                  O pagamento só é feito após o serviço ser concluído.
                </Text>
              </Box>

              <Field.Root required>
                <Field.Label fontSize="xs" color="gray.500" fontWeight="semibold" mb="1">
                  Descrição do serviço
                </Field.Label>
                <Input
                  size="sm" borderRadius="lg"
                  placeholder="Ex: Instalar tomadas na sala..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label fontSize="xs" color="gray.500" fontWeight="semibold" mb="1">
                  Data e hora
                </Field.Label>
                <Input
                  size="sm" borderRadius="lg" type="datetime-local"
                  value={form.scheduled_at}
                  onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
                />
              </Field.Root>

              {error && <Text color="red.500" fontSize="sm">{error}</Text>}
            </VStack>
          </Dialog.Body>

          <Dialog.Footer pt="2" pb="4" px="2">
            <Dialog.ActionTrigger asChild>
              <Button variant="ghost" borderRadius="xl" mr="2">Cancelar</Button>
            </Dialog.ActionTrigger>
            <Dialog.ActionTrigger asChild>
              <Button
                bg={blue} color={white} borderRadius="xl" flex="1"
                onClick={onSubmit} loading={creating}
              >
                Enviar pedido
              </Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
</Box>
          </Box>
        </Box>
      </Box>
  
  );
}