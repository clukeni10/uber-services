import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Heading,
  Grid,
  Badge,
  Spinner,
  Center,
} from "@chakra-ui/react";
import {
  LuWallet,
  LuStar,
  LuClock,
  LuCircleCheck,
  LuTrendingUp,
  LuBell,
  LuUser,
  LuHand,
} from "react-icons/lu";
import Sidebar from "../components/sidebar";
import MobileMenuButton from "../components/mobile_menu_button";
import { blue, highlights, white } from "@/app/utils/COLORS";
import { useSidebar } from "@/app/context/SidebarContext";
import { useWorkerStats } from "@/app/controllers/useWorkerStats";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "@/app/hooks/usePageTitle";
import { useWorkerProfile } from "@/app/controllers/useWorkerProfile";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  pending: { label: "Pendente", color: "#F59E0B", bg: "#F59E0B15" },
  accepted: { label: "Aceite", color: "#3B82F6", bg: "#3B82F615" },
  active: { label: "Em curso", color: "#8B5CF6", bg: "#8B5CF615" },
  completed: { label: "Concluído", color: "#10B981", bg: "#10B98115" },
  cancelled: { label: "Cancelado", color: "#EF4444", bg: "#EF444415" },
};

export default function WorkerDashboard() {
  usePageTitle("Dashboard Worker | Workê");

  const { sidebarW } = useSidebar();
  const { stats, loading } = useWorkerStats();
  const navigate = useNavigate();
 
  const worker1 = JSON.parse(localStorage.getItem("user") || "{}");
  const { worker} = useWorkerProfile();
  const firstName = worker1?.name?.split(" ")[0] ?? "Profissional";

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
      <MobileMenuButton />

      <Box
        flex="1"
        ml={{ base: "0", md: sidebarW }}
        transition="margin 0.25s ease"
        overflow="auto"
      >
        <Box maxW="1100px" mx="auto" px={{ base: 4, md: 8 }} py="8">
          {/* Top bar */}
          <HStack justify="space-between" mb="8">
            <VStack align="flex-start" gap="0">
              <Text fontSize="sm" color="gray.400">
                Bem-vindo de volta <LuHand color={highlights} size="20" />{" "}
              </Text>
              <Heading fontSize="2xl" fontWeight="extrabold" color="gray.800">
                Olá, {firstName}
              </Heading>
            </VStack>
            <Flex
              w="40px"
              h="40px"
              borderRadius="full"
              bg={white}border="1px solid" borderColor="gray.150" shadow="md"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
            >
              <LuBell size={18} color="gray" />
            </Flex>
          </HStack>

          {/* Stats principais */}
          <Grid
            templateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
            gap="4"
            mb="8"
          >
            {[
              {
                label: "Ganhos este mês",
                value: `${Number(stats?.earnings?.month ?? 0).toFixed(2)} Kz`,
                icon: LuWallet,
                color: blue,
              },
              {
                label: "Ganhos totais",
                value: `${Number(stats?.earnings?.total ?? 0).toFixed(2)} Kz`,
                icon: LuTrendingUp,
                color: "#10B981",
              },
              {
                label: "Serviços feitos",
                value: stats?.services?.completed ?? 0,
                icon: LuCircleCheck,
                color: "#8B5CF6",
              },
              {
                label: "Avaliação média",
                value: worker?.rating_avg
                  ? parseFloat(String(worker.rating_avg)).toFixed(1)
                  : "—",
                icon: LuStar,
                color: "#F59E0B",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Box
                  key={s.label}
                  bg={white}
                  borderRadius="2xl" border="1px solid" borderColor="gray.150" shadow="md"
                  p="5"
                  transition="all 0.2s"
                  _hover={{ shadow: "md", borderColor: s.color }}
                >
                  <Flex
                    w="40px"
                    h="40px"
                    borderRadius="xl"
                    bg={`${s.color}15`}
                    color={s.color}
                    alignItems="center"
                    justifyContent="center"
                    mb="3"
                  >
                    <Icon size={18} />
                  </Flex>
                  <Text fontSize="2xl" fontWeight="extrabold" color="gray.800">
                    {s.value}
                  </Text>
                  <Text fontSize="xs" color="gray.400" fontWeight="medium">
                    {s.label}
                  </Text>
                </Box>
              );
            })}
          </Grid>

          {/* Grid: status dos serviços + atividade recente */}
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1.6fr" }} gap="6">
            {/* Status dos serviços */}
            <Box
              bg={white}
              borderRadius="2xl"border="1px solid" borderColor="gray.150" shadow="md"
              overflow="hidden"
            >
              <HStack
                justify="space-between"
                px="5"
                py="4"
                borderBottom="1px solid"
                borderColor="gray.150"
              >
                <Text fontWeight="bold" color="gray.800">
                  Estado dos Serviços
                </Text>
                <Text
                  fontSize="xs"
                  color={blue}
                  fontWeight="semibold"
                  cursor="pointer"
                  onClick={() => navigate("/worker/services")}
                >
                  Ver todos
                </Text>
              </HStack>
              <VStack gap="0" divideY="1px" divideColor="gray.100">
                {[
                  {
                    label: "Pendentes",
                    value: stats?.services?.pending,
                    color: "#F59E0B",
                  },
                  {
                    label: "Aceites",
                    value: stats?.services?.accepted,
                    color: "#3B82F6",
                  },
                  {
                    label: "Em curso",
                    value: stats?.services?.active,
                    color: "#8B5CF6",
                  },
                  {
                    label: "Concluídos",
                    value: stats?.services?.completed,
                    color: "#10B981",
                  },
                  {
                    label: "Cancelados",
                    value: stats?.services?.cancelled,
                    color: "#EF4444",
                  },
                ].map((s) => (
                  <HStack
                    key={s.label}
                    px="5"
                    py="3.5"
                    w="full"
                    justify="space-between"
                  >
                    <HStack gap="2.5">
                      <Box
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg={s.color}
                        flexShrink={0}
                      />
                      <Text fontSize="sm" color="gray.600">
                        {s.label}
                      </Text>
                    </HStack>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">
                      {s.value ?? 0}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            {/* Atividade recente */}
            <Box
              bg={white}
              borderRadius="2xl"border="1px solid" borderColor="gray.150" shadow="md"
              overflow="hidden"
            >
              <HStack
                justify="space-between"
                px="5"
                py="4"
                borderBottom="1px solid"
                borderColor="gray.150"
              >
                <Text fontWeight="bold" color="gray.800">
                  Atividade Recente
                </Text>
                <Text
                  fontSize="xs"
                  color={blue}
                  fontWeight="semibold"
                  cursor="pointer"
                  onClick={() => navigate("/worker/services")}
                >
                  Ver todos
                </Text>
              </HStack>
              {!stats?.recentServices?.length ? (
                <Center h="150px">
                  <Text color="gray.400" fontSize="sm">
                    Sem atividade recente
                  </Text>
                </Center>
              ) : (
                <VStack gap="0" divideY="1px" divideColor="gray.100">
                  {stats.recentServices.map((s: any) => {
                    const config = statusConfig[s.status];
                    return (
                      <HStack
                        key={s.id}
                        px="5"
                        py="4"
                        w="full"
                        justify="space-between"
                        _hover={{ bg: "gray.50" }}
                        transition="background 0.15s"
                      >
                        <HStack gap="3">
                          {s.client_image ? (
                            <Box
                              w="36px"
                              h="36px"
                              borderRadius="full"
                              overflow="hidden"
                              flexShrink={0}
                            >
                              <img
                                src={s.client_image}
                                alt={s.client_name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          ) : (
                            <Flex
                              w="36px"
                              h="36px"
                              borderRadius="full"
                              bg={`${blue}15`}
                              color={blue}
                              alignItems="center"
                              justifyContent="center"
                              flexShrink={0}
                              fontWeight="bold"
                              fontSize="sm"
                            >
                              <LuUser size={16} />
                            </Flex>
                          )}
                          <VStack align="flex-start" gap="0">
                            <Text
                              fontSize="sm"
                              fontWeight="semibold"
                              color="gray.800"
                            >
                              {s.client_name}
                            </Text>
                            <Text fontSize="xs" color="gray.400">
                              {s.description}
                            </Text>
                          </VStack>
                        </HStack>
                        <Badge
                          bg={config?.bg}
                          color={config?.color}
                          borderRadius="full"
                          px="2"
                          fontSize="10px"
                        >
                          {config?.label}
                        </Badge>
                      </HStack>
                    );
                  })}
                </VStack>
              )}
            </Box>
          </Grid>

          {/* Banner CTA — ir para serviços pendentes */}
          {(stats?.services?.pending ?? 0) > 0 && (
            <Box
              mt="6"
              bg={blue}
              borderRadius="2xl"
              p="6"
              position="relative"
              overflow="hidden"
              cursor="pointer"
              onClick={() => navigate("/worker/services")}
              _hover={{ opacity: 0.95 }}
            >
              <Box
                position="absolute"
                top="-30px"
                right="-30px"
                w="140px"
                h="140px"
                borderRadius="full"
                bg="whiteAlpha.100"
              />
              <HStack justify="space-between">
                <HStack gap="4">
                  <Flex
                    w="48px"
                    h="48px"
                    borderRadius="xl"
                    bg="whiteAlpha.200"
                    alignItems="center"
                    justifyContent="center"
                    color={white}
                  >
                    <LuClock size={22} />
                  </Flex>
                  <VStack align="flex-start" gap="0">
                    <Text color={white} fontWeight="bold" fontSize="md">
                      Tens {stats?.services?.pending} pedido
                      {stats?.services?.pending > 1 ? "s" : ""} pendente
                      {stats?.services?.pending > 1 ? "s" : ""}
                    </Text>
                    <Text color="whiteAlpha.800" fontSize="xs">
                      Aceita ou recusa antes que o cliente cancele
                    </Text>
                  </VStack>
                </HStack>
                <Box
                  bg={white}
                  color={blue}
                  px="4"
                  py="2"
                  borderRadius="xl"
                  fontWeight="bold"
                  fontSize="sm"
                  flexShrink={0}
                >
                  Ver pedidos
                </Box>
              </HStack>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
