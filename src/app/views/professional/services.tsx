import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Heading,
  Badge,
  Spinner,
  Center,
  Button,
  Tabs,
} from "@chakra-ui/react";
import {
  LuClock,
  LuCircleCheck,
  LuCircleX,
  LuBriefcase,
  LuCalendar,
  LuUser,
  LuPhone,
  LuCreditCard,
} from "react-icons/lu";
import Sidebar from "../components/sidebar";
import { blue, white } from "@/app/utils/COLORS";
import { useWorkerServices } from "@/app/controllers/useWorkerServices";
import type { Service } from "@/app/types/ServiceType";

const statusConfig = {
  pending: { label: "Pendente", color: "#F59E0B", bg: "#F59E0B15" },
  accepted: { label: "Aceite", color: "#3B82F6", bg: "#3B82F615" },
  active: { label: "Em curso", color: "#8B5CF6", bg: "#8B5CF615" },
  completed: { label: "Concluído", color: "#10B981", bg: "#10B98115" },
  cancelled: { label: "Cancelado", color: "#EF4444", bg: "#EF444415" },
};

export default function WorkerServices() {
  const {
    loading,
    actionLoading,
    pending,
    active,
    completed,
    cancelled,
    handleAccept,
    handleRefuse,
    handleStart,
    handleComplete,
  } = useWorkerServices();

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
    <Box display="flex" minH="100vh" bg="gray.50">
      <Sidebar />

      <Box w="100%" ml="220px">
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
              Os meus Serviços
            </Heading>
            <Text color="whiteAlpha.800" fontSize="sm">
              Gere os pedidos recebidos e acompanha o estado de cada serviço.
            </Text>

            {/* Stats rápidas */}
            <HStack gap="4" mt="6" flexWrap="wrap">
              {[
                { label: "Pendentes", value: pending.length, color: "#F59E0B" },
                { label: "Ativos", value: active.length, color: "#8B5CF6" },
                {
                  label: "Concluídos",
                  value: completed.length,
                  color: "#10B981",
                },
                {
                  label: "Cancelados",
                  value: cancelled.length,
                  color: "#EF4444",
                },
              ].map((s) => (
                <Box
                  key={s.label}
                  bg="whiteAlpha.200"
                  borderRadius="xl"
                  px="4"
                  py="2"
                >
                  <Text fontSize="xl" fontWeight="extrabold" color={white}>
                    {s.value}
                  </Text>
                  <Text fontSize="xs" color="whiteAlpha.800">
                    {s.label}
                  </Text>
                </Box>
              ))}
            </HStack>
          </Box>
        </Box>

        <Box maxW="1100px" mx="auto" px="6" py="8">
          <Tabs.Root defaultValue="pending" variant="enclosed">
            <Tabs.List
              mb="6"
              bg={white}
              borderRadius="xl"
              p="1"
              border="1px solid"
              borderColor="gray.100"
              gap="10px"
            >
              <Tabs.Trigger
                value="pending"
                borderRadius="lg"
                fontSize="sm"
                fontWeight="semibold"
              >
                <HStack gap="2">
                  <LuClock size={14} />
                  <Text>Pendentes</Text>
                  {pending.length > 0 && (
                    <Badge
                      bg="#F59E0B15"
                      color="#F59E0B"
                      borderRadius="full"
                      fontSize="10px"
                    >
                      {pending.length}
                    </Badge>
                  )}
                </HStack>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="active"
                borderRadius="lg"
                fontSize="sm"
                fontWeight="semibold"
              >
                <HStack gap="2">
                  <LuBriefcase size={14} />
                  <Text>Ativos</Text>
                  {active.length > 0 && (
                    <Badge
                      bg="#8B5CF615"
                      color="#8B5CF6"
                      borderRadius="full"
                      fontSize="10px"
                    >
                      {active.length}
                    </Badge>
                  )}
                </HStack>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="completed"
                borderRadius="lg"
                fontSize="sm"
                fontWeight="semibold"
              >
                <HStack gap="2">
                  <LuCircleCheck size={14} />
                  <Text>Concluídos</Text>
                </HStack>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="cancelled"
                borderRadius="lg"
                fontSize="sm"
                fontWeight="semibold"
              >
                <HStack gap="2">
                  <LuCircleX size={14} />
                  <Text>Cancelados</Text>
                </HStack>
              </Tabs.Trigger>
            </Tabs.List>

            {/* Pendentes */}
            <Tabs.Content value="pending">
              <ServiceList
                services={pending}
                emptyMessage="Nenhum pedido pendente"
                renderActions={(s) => (
                  <HStack gap="2" mt="4">
                    <Button
                      flex="1"
                      variant="outline"
                      borderRadius="lg"
                      size="sm"
                      borderColor="red.200"
                      color="red.500"
                      _hover={{ bg: "red.50" }}
                      loading={actionLoading === s.id}
                      onClick={() => handleRefuse(s.id)}
                    >
                      Recusar
                    </Button>
                    <Button
                      flex="1"
                      bg={blue}
                      color={white}
                      borderRadius="lg"
                      size="sm"
                      _hover={{ opacity: 0.9 }}
                      loading={actionLoading === s.id}
                      onClick={() => handleAccept(s.id)}
                    >
                      Aceitar
                    </Button>
                  </HStack>
                )}
              />
            </Tabs.Content>

            {/* Ativos */}
            <Tabs.Content value="active">
              <ServiceList
                services={active}
                emptyMessage="Nenhum serviço ativo"
                renderActions={(s) => (
                  <HStack gap="2" mt="4">
                    {s.status === "accepted" && (
                      <Button
                        w="full"
                        bg="#8B5CF6"
                        color={white}
                        borderRadius="lg"
                        size="sm"
                        _hover={{ opacity: 0.9 }}
                        loading={actionLoading === s.id}
                        onClick={() => handleStart(s.id)}
                      >
                        Iniciar serviço
                      </Button>
                    )}
                    {s.status === "active" && (
                      <Button
                        w="full"
                        bg="#10B981"
                        color={white}
                        borderRadius="lg"
                        size="sm"
                        _hover={{ opacity: 0.9 }}
                        loading={actionLoading === s.id}
                        onClick={() => handleComplete(s.id)}
                      >
                        Concluir serviço
                      </Button>
                    )}
                  </HStack>
                )}
              />
            </Tabs.Content>

            {/* Concluídos */}
            <Tabs.Content value="completed">
              <ServiceList
                services={completed}
                emptyMessage="Nenhum serviço concluído"
              />
            </Tabs.Content>

            {/* Cancelados */}
            <Tabs.Content value="cancelled">
              <ServiceList
                services={cancelled}
                emptyMessage="Nenhum serviço cancelado"
              />
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </Box>
  );
}

function ServiceList({
  services,
  emptyMessage,
  renderActions,
}: {
  services: Service[];
  emptyMessage: string;
  renderActions?: (s: Service) => React.ReactNode;
}) {
  if (services.length === 0)
    return (
      <Center h="200px">
        <VStack>
          <Text color="gray.400" fontWeight="medium">
            {emptyMessage}
          </Text>
          <Text color="gray.300" fontSize="sm">
            Nada a mostrar por aqui
          </Text>
        </VStack>
      </Center>
    );

  return (
    <VStack gap="4" align="stretch">
      {services.map((s) => (
        <ServiceCard key={s.id} service={s} renderActions={renderActions} />
      ))}
    </VStack>
  );
}

function ServiceCard({
  service: s,
  renderActions,
}: {
  service: Service;
  renderActions?: (s: Service) => React.ReactNode;
}) {
  const config = statusConfig[s.status];

  return (
    <Box
      bg={white}
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.100"
      p="5"
      shadow="sm"
      transition="all 0.2s"
      _hover={{ shadow: "md", borderColor: "gray.200" }}
    >
      <HStack justify="space-between" align="flex-start" mb="3">
        {/* Info do cliente */}
        <HStack gap="3">
          {s.client_image ? (
            <Box
              w="44px"
              h="44px"
              borderRadius="full"
              overflow="hidden"
              flexShrink={0}
            >
              <img
                src={s.client_image}
                alt={s.client_name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ) : (
            <Flex
              w="44px"
              h="44px"
              borderRadius="full"
              flexShrink={0}
              bg={`${blue}15`}
              color={blue}
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              fontSize="md"
            >
              {s.client_name?.charAt(0).toUpperCase()}
            </Flex>
          )}
          <VStack align="flex-start" gap="0">
            <Text fontWeight="bold" fontSize="sm" color="gray.800">
              {s.client_name}
            </Text>
            <HStack gap="1" color="gray.400">
              <LuPhone size={11} />
              <Text fontSize="xs">{s.client_phone ?? "—"}</Text>
            </HStack>
          </VStack>
        </HStack>

        {/* Status badge */}
        <Badge
          bg={config.bg}
          color={config.color}
          borderRadius="full"
          px="3"
          py="1"
          fontSize="xs"
        >
          {config.label}
        </Badge>
      </HStack>

      {/* Descrição */}
      <Box bg="gray.50" borderRadius="xl" px="4" py="3" mb="3">
        <HStack gap="2" mb="1">
          <LuUser size={13} color="gray" />
          <Text fontSize="xs" color="gray.400" fontWeight="semibold">
            Descrição
          </Text>
        </HStack>
        <Text fontSize="sm" color="gray.700">
          {s.description}
        </Text>
      </Box>

      {/* Meta info */}
      <HStack gap="4" flexWrap="wrap">
        <HStack gap="1.5" color="gray.500">
          <LuCalendar size={13} />
          <Text fontSize="xs">
            {s.scheduled_at
              ? new Date(s.scheduled_at).toLocaleString("pt-PT", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"}
          </Text>
        </HStack>
        <HStack gap="1.5" color="gray.500">
          <LuCreditCard size={13} />
          <Text fontSize="xs" fontWeight="semibold" color={blue}>
            {s.amount ? `${parseFloat(String(s.amount)).toFixed(2)} Kz` : "—"}
          </Text>
        </HStack>
        {s.category_name && (
          <Badge
            bg={`${blue}10`}
            color={blue}
            borderRadius="full"
            px="2"
            fontSize="10px"
          >
            {s.category_name}
          </Badge>
        )}
      </HStack>

      {/* Ações */}
      {renderActions && renderActions(s)}
    </Box>
  );
}
