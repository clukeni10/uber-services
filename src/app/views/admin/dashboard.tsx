// src/views/admin/dashboard.tsx
import { Box, Flex, Text, Heading, Grid, Spinner } from "@chakra-ui/react";
import {
  LuUsers,
  LuBriefcase,
  LuWallet,
  LuTrendingUp,
  LuUserCheck,
  LuUserX,
  LuClock,
  LuCircleCheck,
} from "react-icons/lu";
import Sidebar from "../components/sidebar";
import { blue, white } from "@/app/utils/COLORS";
import { useState, useEffect } from "react";
import { getAdminStats } from "@/app/models/admin";
import { useSidebar } from "@/app/context/SidebarContext";
import MobileMenuButton from "../components/mobile_menu_button";
import { usePageTitle } from "@/app/hooks/usePageTitle";
 
export default function AdminDashboard() {
  usePageTitle("Dashboard Admin | Workê");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { sidebarW } = useSidebar();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getAdminStats();
        if (!cancelled) setStats(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading)
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <Spinner color={blue} size="xl" />
      </Flex>
    );

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
              Dashboard Admin
            </Heading>
            <Text color="whiteAlpha.800" fontSize="sm">
              Visão geral da plataforma Workê.
            </Text>
          </Box>
        </Box>

        <Box maxW="1100px" mx="auto" px="6" py="8">
          {/* Stats de utilizadores */}
          <Text
            fontWeight="bold"
            fontSize="md"
            color="gray.500"
            mb="3"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            Utilizadores
          </Text>
          <Grid
            templateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
            gap="4"
            mb="8"
          >
            {[
              {
                label: "Total",
                value: stats?.users?.total,
                icon: LuUsers,
                color: blue,
              },
              {
                label: "Clientes",
                value: stats?.users?.clients,
                icon: LuUserCheck,
                color: "#10B981",
              },
              {
                label: "Profissionais",
                value: stats?.users?.workers,
                icon: LuBriefcase,
                color: "#8B5CF6",
              },
              {
                label: "Admins",
                value: stats?.users?.admins,
                icon: LuUserX,
                color: "#F97316",
              },
            ].map((s) => {
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
                    {s.value ?? 0}
                  </Text>
                  <Text fontSize="xs" color="gray.400" fontWeight="medium">
                    {s.label}
                  </Text>
                </Box>
              );
            })}
          </Grid>

          {/* Stats de serviços */}
          <Text
            fontWeight="bold"
            color="gray.500"
            mb="3"
            textTransform="uppercase"
            letterSpacing="wide"
            fontSize="xs"
          >
            Serviços
          </Text>
          <Grid
            templateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
            gap="4"
            mb="8"
          >
            {[
              {
                label: "Total",
                value: stats?.services?.total,
                icon: LuBriefcase,
                color: blue,
              },
              {
                label: "Pendentes",
                value: stats?.services?.pending,
                icon: LuClock,
                color: "#F59E0B",
              },
              {
                label: "Concluídos",
                value: stats?.services?.completed,
                icon: LuCircleCheck,
                color: "#10B981",
              },
              {
                label: "Cancelados",
                value: stats?.services?.cancelled,
                icon: LuUserX,
                color: "#EF4444",
              },
            ].map((s) => {
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
                    {s.value ?? 0}
                  </Text>
                  <Text fontSize="xs" color="gray.400" fontWeight="medium">
                    {s.label}
                  </Text>
                </Box>
              );
            })}
          </Grid>

          {/* Stats financeiras */}
          <Text
            fontWeight="bold"
            color="gray.500"
            mb="3"
            textTransform="uppercase"
            letterSpacing="wide"
            fontSize="xs"
          >
            Financeiro
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap="4">
            {[
              {
                label: "Receita Total",
                value: `${Number(stats?.payments?.revenue ?? 0).toFixed(2)} Kz`,
                icon: LuWallet,
                color: blue,
              },
              {
                label: "Taxas da Plataforma",
                value: `${Number(stats?.payments?.fees ?? 0).toFixed(2)} Kz`,
                icon: LuTrendingUp,
                color: "#10B981",
              },
              {
                label: "Pagamentos Totais",
                value: stats?.payments?.total ?? 0,
                icon: LuCircleCheck,
                color: "#8B5CF6",
              },
            ].map((s) => {
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
        </Box>
      </Box>
    </Box>
  );
}
