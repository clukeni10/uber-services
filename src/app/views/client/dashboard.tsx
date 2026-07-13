import {
  Box,
  HStack,
  Flex,
  Text,
  Heading,
  VStack,
  Grid,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import { blue, white } from "@/app/utils/COLORS";
import {
  LuClock,
  LuBriefcase,
  LuTrendingUp,
  LuBell,
  LuCircleCheck,
} from "react-icons/lu";
import { useSidebar } from "@/app/context/SidebarContext";
import MobileMenuButton from "../components/mobile_menu_button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getClientServices } from "@/app/models/services";
import { usePageTitle } from "@/app/hooks/usePageTitle";

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

export default function ClientDashboard() {
   usePageTitle("Dashboard Cliente | Workê");
  const { sidebarW } = useSidebar();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user?.name?.split(" ")[0] ?? "Utilizador";

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getClientServices();
        if (!cancelled) setServices(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const total = services.length;
  const active = services.filter((s) => s.status === "active").length;
  const completed = services.filter((s) => s.status === "completed").length;
  const pending = services.filter((s) => s.status === "pending").length;
  const recent = [...services].slice(0, 5);

  const stats = [
    {
      label: "Serviços Contratados",
      value: total,
      icon: LuBriefcase,
      color: blue,
    },
    { label: "Pendentes", value: pending, icon: LuClock, color: "#F59E0B" },
    {
      label: "Em Andamento",
      value: active,
      icon: LuTrendingUp,
      color: "#8B5CF6",
    },
    {
      label: "Concluídos",
      value: completed,
      icon: LuCircleCheck,
      color: "#10B981",
    },
  ];

  return (
    <Box display="flex" h="100vh" bg="#d4d4d4">
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
                Bem-vindo de volta 👋
              </Text>
              <Heading fontSize="2xl" fontWeight="extrabold" color="gray.800">
                Olá, {firstName}
              </Heading>
            </VStack>
            <Flex
              w="40px"
              h="40px"
              borderRadius="full"
              bg={white}
              border="1px solid"
              borderColor="gray.100"
              alignItems="center"
              justifyContent="center"
              shadow="sm"
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
            >
              <LuBell size={18} color="gray" />
            </Flex>
          </HStack>

          {/* Stats */}
          {loading ? (
            <Flex h="120px" alignItems="center" justifyContent="center" mb="8">
              <Spinner color={blue} />
            </Flex>
          ) : (
            <Grid
              templateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
              gap="4"
              mb="8"
            >
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <Box
                    key={s.label}
                    bg={white}
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="gray.100"
                    p="5"
                    shadow="sm"
                    transition="all 0.2s ease"
                    _hover={{
                      transform: "translateY(-2px)",
                      shadow: "md",
                      borderColor: s.color,
                    }}
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
                    <Text
                      fontSize="2xl"
                      fontWeight="extrabold"
                      color="gray.800"
                    >
                      {s.value}
                    </Text>
                    <Text
                      fontSize="xs"
                      color="gray.400"
                      fontWeight="medium"
                      mt="0.5"
                    >
                      {s.label}
                    </Text>
                  </Box>
                );
              })}
            </Grid>
          )}

          <Grid templateColumns={{ base: "1fr", lg: "1.6fr 1fr" }} gap="6">
            {/* Actividade Recente */}
            <Box
              bg={white}
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.100"
              shadow="sm"
              overflow="hidden"
            >
              <HStack
                justify="space-between"
                px="5"
                py="4"
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                <Text fontWeight="bold" color="gray.800">
                  Actividade Recente
                </Text>
                <Text
                  fontSize="xs"
                  color={blue}
                  fontWeight="semibold"
                  cursor="pointer"
                  onClick={() => navigate("/client/services")}
                >
                  Ver tudo
                </Text>
              </HStack>

              {loading ? (
                <Flex h="120px" alignItems="center" justifyContent="center">
                  <Spinner color={blue} size="sm" />
                </Flex>
              ) : recent.length === 0 ? (
                <Flex h="120px" alignItems="center" justifyContent="center">
                  <Text fontSize="sm" color="gray.400">
                    Sem actividade recente
                  </Text>
                </Flex>
              ) : (
                <VStack gap="0" divideY="1px" divideColor="gray.100">
                  {recent.map((s) => {
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
                          <Box
                            w="8px"
                            h="8px"
                            borderRadius="full"
                            bg={config?.color ?? "gray.300"}
                            flexShrink={0}
                          />
                          <VStack align="flex-start" gap="0">
                            <Text
                              fontSize="sm"
                              fontWeight="semibold"
                              color="gray.800"
                            >
                              {s.description}
                            </Text>
                            <Text fontSize="xs" color="gray.400">
                              com {s.worker_name ?? "—"} ·{" "}
                              {s.scheduled_at
                                ? new Date(s.scheduled_at).toLocaleDateString(
                                    "pt-PT",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                    },
                                  )
                                : "—"}
                            </Text>
                          </VStack>
                        </HStack>
                        <Badge
                          bg={config?.bg}
                          color={config?.color}
                          borderRadius="full"
                          px="2.5"
                          py="1"
                          fontSize="10px"
                          fontWeight="semibold"
                          whiteSpace="nowrap"
                        >
                          {config?.label}
                        </Badge>
                      </HStack>
                    );
                  })}
                </VStack>
              )}
            </Box>

            {/* Banner CTA */}
            <Box
              bg={blue}
              borderRadius="2xl"
              p="6"
              color={white}
              position="relative"
              overflow="hidden"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
              minH="200px"
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
              <Box
                position="absolute"
                bottom="-40px"
                right="30px"
                w="100px"
                h="100px"
                borderRadius="full"
                bg="whiteAlpha.100"
              />

              <Box position="relative">
                <Flex
                  w="40px"
                  h="40px"
                  borderRadius="xl"
                  bg="whiteAlpha.200"
                  alignItems="center"
                  justifyContent="center"
                  mb="3"
                >
                  <LuTrendingUp size={20} />
                </Flex>
                <Text fontWeight="extrabold" fontSize="lg" lineHeight="1.3">
                  Precisa de um serviço?
                </Text>
                <Text fontSize="xs" color="whiteAlpha.800" mt="1">
                  Encontre profissionais verificados perto de si.
                </Text>
              </Box>

              <Box
                mt="6"
                bg={white}
                color={blue}
                borderRadius="xl"
                py="2.5"
                textAlign="center"
                fontWeight="bold"
                fontSize="sm"
                cursor="pointer"
                position="relative"
                _hover={{ opacity: 0.9 }}
                onClick={() => navigate("/client/services")}
              >
                Explorar profissionais
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
