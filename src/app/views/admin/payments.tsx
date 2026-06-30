import {
  Box, Flex, HStack, VStack, Text, Heading,
  Grid, Badge, Spinner, Center,
} from "@chakra-ui/react";
import {
  LuWallet, LuTrendingUp, LuCreditCard, LuArrowUp,
  LuArrowDown, LuUser, LuBriefcase, LuMapPin,
} from "react-icons/lu";
import Sidebar from "../components/sidebar";
import MobileMenuButton from "../components/mobile_menu_button";
import { blue, white } from "@/app/utils/COLORS";
import { useSidebar } from "@/app/context/SidebarContext";
import { useState, useEffect } from "react";
import { getAdminPaymentsOverview } from "@/app/models/admin";

const methodLabel: Record<string, string> = {
  card: "Cartão", transfer: "Transferência", multicaixa: "Multicaixa",
};
const methodColor: Record<string, string> = {
  card: blue, transfer: "#10B981", multicaixa: "#F97316",
};

export default function AdminPayments() {
  const { sidebarW } = useSidebar();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const result = await getAdminPaymentsOverview();
        if (!cancelled) setData(result);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
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

      <Box w="100%" flex="1" ml={{ base: "0", md: sidebarW }} transition="margin 0.25s ease" overflow="auto">

        {/* Hero */}
        <Box bg={blue} w="100%" px={{ base: 4, md: 10 }} py={10} position="relative" overflow="hidden">
          <Box position="absolute" inset="0" opacity={0.08}
            backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
            backgroundSize="32px 32px" />
          <Box maxW="1100px" mx="auto" position="relative">
            <Heading color={white} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" mb={1}>
              Pagamentos
            </Heading>
            <Text color="whiteAlpha.800" fontSize="sm">
              Visão financeira completa da plataforma.
            </Text>
          </Box>
        </Box>

        <Box maxW="1100px" mx="auto" px="6" py="8">

          {/* KPIs principais */}
          <Grid templateColumns={{ base: "repeat(2,1fr)", md: "repeat(3,1fr)" }} gap="4" mb="8">
            {[
              { label: "Receita Total",        value: `${Number(data?.totals?.revenue ?? 0).toFixed(2)} Kz`,         icon: LuWallet,     color: blue      },
              { label: "Taxas da Plataforma",  value: `${Number(data?.totals?.fees ?? 0).toFixed(2)} Kz`,            icon: LuTrendingUp, color: "#10B981" },
              { label: "Ganhos dos Workers",   value: `${Number(data?.totals?.worker_earnings ?? 0).toFixed(2)} Kz`, icon: LuCreditCard, color: "#8B5CF6" },
              { label: "Pagamentos Efetuados", value: data?.totals?.paid ?? 0,                                        icon: LuArrowUp,    color: "#F59E0B" },
              { label: "Pagamentos Pendentes", value: data?.totals?.pending ?? 0,                                     icon: LuArrowDown,  color: "#EF4444" },
              { label: "Total de Transações",  value: data?.totals?.total ?? 0,                                       icon: LuCreditCard, color: blue      },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Box key={s.label} bg={white} borderRadius="2xl" border="1px solid"
                  borderColor="gray.100" p="5" shadow="sm" transition="all 0.2s"
                  _hover={{ shadow: "md", borderColor: s.color }}>
                  <Flex w="40px" h="40px" borderRadius="xl" bg={`${s.color}15`} color={s.color}
                    alignItems="center" justifyContent="center" mb="3">
                    <Icon size={18} />
                  </Flex>
                  <Text fontSize="2xl" fontWeight="extrabold" color="gray.800">{s.value}</Text>
                  <Text fontSize="xs" color="gray.400" fontWeight="medium">{s.label}</Text>
                </Box>
              );
            })}
          </Grid>

          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="6" mb="6">

            {/* Faturação mensal */}
            <Box bg={white} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm" overflow="hidden">
              <HStack px="5" py="4" borderBottom="1px solid" borderColor="gray.100">
                <Text fontWeight="bold" color="gray.800">Faturação Mensal</Text>
              </HStack>
              <VStack gap="0" divideY="1px" divideColor="gray.100">
                {(data?.monthlyRevenue ?? []).length === 0 ? (
                  <Center h="100px"><Text color="gray.400" fontSize="sm">Sem dados</Text></Center>
                ) : (
                  data.monthlyRevenue.map((m: any) => (
                    <HStack key={m.month} px="5" py="3.5" w="full" justify="space-between">
                      <Text fontSize="sm" color="gray.600" fontWeight="medium">{m.label}</Text>
                      <VStack align="flex-end" gap="0">
                        <Text fontSize="sm" fontWeight="bold" color={blue}>{Number(m.revenue).toFixed(2)} Kz</Text>
                        <Text fontSize="10px" color="gray.400">Taxa: {Number(m.fees).toFixed(2)} Kz</Text>
                      </VStack>
                    </HStack>
                  ))
                )}
              </VStack>
            </Box>

            {/* Métodos de pagamento */}
            <Box bg={white} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm" overflow="hidden">
              <HStack px="5" py="4" borderBottom="1px solid" borderColor="gray.100">
                <Text fontWeight="bold" color="gray.800">Métodos de Pagamento</Text>
              </HStack>
              <VStack gap="0" divideY="1px" divideColor="gray.100">
                {(data?.byMethod ?? []).length === 0 ? (
                  <Center h="100px"><Text color="gray.400" fontSize="sm">Sem dados</Text></Center>
                ) : (
                  data.byMethod.map((m: any) => {
                    const color = methodColor[m.method] ?? "gray.400";
                    return (
                      <HStack key={m.method} px="5" py="3.5" w="full" justify="space-between">
                        <HStack gap="2">
                          <Box w="8px" h="8px" borderRadius="full" bg={color} />
                          <Text fontSize="sm" color="gray.600">{methodLabel[m.method] ?? m.method}</Text>
                          <Badge bg={`${color}15`} color={color} borderRadius="full" px="2" fontSize="10px">
                            {m.count}x
                          </Badge>
                        </HStack>
                        <Text fontSize="sm" fontWeight="bold" color="gray.800">
                          {Number(m.revenue).toFixed(2)} Kz
                        </Text>
                      </HStack>
                    );
                  })
                )}
              </VStack>
            </Box>
          </Grid>

          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="6" mb="6">

            {/* Por categoria */}
            <Box bg={white} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm" overflow="hidden">
              <HStack px="5" py="4" borderBottom="1px solid" borderColor="gray.100">
                <Text fontWeight="bold" color="gray.800">Por Categoria</Text>
              </HStack>
              <VStack gap="0" divideY="1px" divideColor="gray.100">
                {(data?.byCategory ?? []).length === 0 ? (
                  <Center h="100px"><Text color="gray.400" fontSize="sm">Sem dados</Text></Center>
                ) : (
                  data.byCategory.map((c: any) => (
                    <HStack key={c.category} px="5" py="3.5" w="full" justify="space-between">
                      <HStack gap="2">
                        <Flex w="28px" h="28px" borderRadius="lg" bg={`${blue}15`} color={blue}
                          alignItems="center" justifyContent="center">
                          <LuBriefcase size={13} />
                        </Flex>
                        <VStack align="flex-start" gap="0">
                          <Text fontSize="sm" color="gray.700" fontWeight="medium">{c.category ?? "Sem categoria"}</Text>
                          <Text fontSize="10px" color="gray.400">{c.total_services} serviços</Text>
                        </VStack>
                      </HStack>
                      <Text fontSize="sm" fontWeight="bold" color={blue}>{Number(c.revenue).toFixed(2)} Kz</Text>
                    </HStack>
                  ))
                )}
              </VStack>
            </Box>

            {/* Por cidade */}
            <Box bg={white} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm" overflow="hidden">
              <HStack px="5" py="4" borderBottom="1px solid" borderColor="gray.100">
                <Text fontWeight="bold" color="gray.800">Por Cidade</Text>
              </HStack>
              <VStack gap="0" divideY="1px" divideColor="gray.100">
                {(data?.byCity ?? []).length === 0 ? (
                  <Center h="100px"><Text color="gray.400" fontSize="sm">Sem dados</Text></Center>
                ) : (
                  data.byCity.map((c: any) => (
                    <HStack key={c.city} px="5" py="3.5" w="full" justify="space-between">
                      <HStack gap="2">
                        <Flex w="28px" h="28px" borderRadius="lg" bg="#8B5CF615" color="#8B5CF6"
                          alignItems="center" justifyContent="center">
                          <LuMapPin size={13} />
                        </Flex>
                        <VStack align="flex-start" gap="0">
                          <Text fontSize="sm" color="gray.700" fontWeight="medium">{c.city}</Text>
                          <Text fontSize="10px" color="gray.400">{c.total_services} serviços</Text>
                        </VStack>
                      </HStack>
                      <Text fontSize="sm" fontWeight="bold" color={blue}>{Number(c.revenue).toFixed(2)} Kz</Text>
                    </HStack>
                  ))
                )}
              </VStack>
            </Box>
          </Grid>

          {/* Top / Bottom workers */}
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="6">
            {[
              { title: "Workers que mais faturam", data: data?.topWorkers, icon: LuArrowUp,   color: "#10B981" },
              { title: "Workers que menos faturam", data: data?.bottomWorkers, icon: LuArrowDown, color: "#EF4444" },
            ].map((section) => (
              <Box key={section.title} bg={white} borderRadius="2xl" border="1px solid"
                borderColor="gray.100" shadow="sm" overflow="hidden">
                <HStack px="5" py="4" borderBottom="1px solid" borderColor="gray.100">
                  <Flex w="24px" h="24px" borderRadius="full" bg={`${section.color}15`}
                    color={section.color} alignItems="center" justifyContent="center">
                    <section.icon size={12} />
                  </Flex>
                  <Text fontWeight="bold" color="gray.800">{section.title}</Text>
                </HStack>
                <VStack gap="0" divideY="1px" divideColor="gray.100">
                  {(section.data ?? []).length === 0 ? (
                    <Center h="100px"><Text color="gray.400" fontSize="sm">Sem dados</Text></Center>
                  ) : (
                    section.data.map((w: any, i: number) => (
                      <HStack key={w.id} px="5" py="3.5" w="full" justify="space-between">
                        <HStack gap="3">
                          <Text fontSize="xs" color="gray.300" fontWeight="bold" w="16px">{i + 1}</Text>
                          {w.image ? (
                            <Box w="32px" h="32px" borderRadius="full" overflow="hidden" flexShrink={0}>
                              <img src={w.image} alt={w.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </Box>
                          ) : (
                            <Flex w="32px" h="32px" borderRadius="full" bg={`${blue}15`} color={blue}
                              alignItems="center" justifyContent="center" flexShrink={0}>
                              <LuUser size={14} />
                            </Flex>
                          )}
                          <VStack align="flex-start" gap="0">
                            <Text fontSize="sm" fontWeight="semibold" color="gray.800">{w.name}</Text>
                            <Text fontSize="10px" color="gray.400">{w.specialty ?? "—"} · {w.total_services} serviços</Text>
                          </VStack>
                        </HStack>
                        <Text fontSize="sm" fontWeight="bold" color={section.color}>
                          {Number(w.total_earned).toFixed(2)} Kz
                        </Text>
                      </HStack>
                    ))
                  )}
                </VStack>
              </Box>
            ))}
          </Grid>

        </Box>
      </Box>
    </Box>
  );
}