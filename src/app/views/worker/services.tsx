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
} from "react-icons/lu";
import Sidebar from "../components/sidebar";
import { blue, white } from "@/app/utils/COLORS";
import { useWorkerServices } from "@/app/controllers/useWorkerServices";
import type { Service } from "@/app/types/ServiceType";
import { useSidebar } from "@/app/context/SidebarContext";
import { useState, useEffect } from "react";
import { usePageTitle } from "@/app/hooks/usePageTitle";
import ServiceCard from "../components/service_card";

function ActiveTimer({ startedAt }: { startedAt: string }) {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    function update() {
      const diff = Date.now() - new Date(startedAt).getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setElapsed(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
      );
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startedAt]);

  return (
    <HStack gap="1.5" bg="#8B5CF615" px="3" py="1.5" borderRadius="full">
      <Box
        w="6px"
        h="6px"
        borderRadius="full"
        bg="#8B5CF6"
        css={{ animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite" }}
      />
      <Text fontSize="xs" fontWeight="bold" color="#8B5CF6" fontFamily="mono">
        {elapsed}
      </Text>
    </HStack>
  );
}

export default function WorkerServices() {
  usePageTitle("Meus Serviços | Workê");
  const { sidebarW } = useSidebar();

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
    <Box display="flex" minH="100vh" bg="#d4d4d4">
      <Sidebar />

      <Box
        w="100%"
        flex="1"
        ml={{ base: "0", md: sidebarW }}
        transition="margin 0.25s ease"
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
              p="2"
              border="1px solid"
              borderColor="gray.150"
              gap="12px"
            >
              <Tabs.Trigger
                value="pending"
                borderRadius="lg"
                fontSize="sm"
                fontWeight="semibold"
              >
                <HStack gap="2" p="4">
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
                <HStack gap="2" p="4">
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
                <HStack gap="2" p="4">
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
                <HStack gap="2" p="4">
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
                  <Box w="full" mt="4">
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

                    {s.status === "active" && s.started_at && (
                      /* Trocamos para VStack para alinhar verticalmente e não quebrar o layout */
                      <VStack gap="3" align="stretch" w="full">
                        {/* O Cronómetro ganha uma área limpa e centralizada antes do botão */}
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          p="2"
                          bg="gray.50"
                          borderRadius="md"
                          border="1px dashed"
                          borderColor="gray.200"
                        >
                          <ActiveTimer startedAt={s.started_at} />
                        </Flex>

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
                      </VStack>
                    )}
                  </Box>
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

