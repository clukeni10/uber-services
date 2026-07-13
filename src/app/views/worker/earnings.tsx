import {
  Box, Flex, HStack, VStack, Text, Heading,
  Grid, Spinner, Center, Badge,
} from "@chakra-ui/react";
import {
  LuWallet, LuTrendingUp,
  LuArrowDown, LuCreditCard, LuMinus,
  LuArrowUp,
} from "react-icons/lu";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, BarChart, Bar,
} from "recharts";
import Sidebar from "../components/sidebar";
import MobileMenuButton from "../components/mobile_menu_button";
import { blue, white } from "@/app/utils/COLORS";
import { useSidebar } from "@/app/context/SidebarContext";
import { useState, useEffect } from "react";
import { getWorkerEarnings } from "@/app/models/workers";
import { usePageTitle } from "@/app/hooks/usePageTitle";

const methodLabel: Record<string, string> = {
  card: "Cartão", transfer: "Transferência", multicaixa: "Multicaixa",
};

export default function WorkerEarnings() {
  usePageTitle("Rendimentos | Workê");
  const { sidebarW } = useSidebar();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const result = await getWorkerEarnings();
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

  const growth = data?.currentMonth?.growth ?? 0;
  const isPositive = growth > 0;
  const isNeutral = growth === 0;

  return (
    <Box display="flex" minH="100vh" bg="#d4d4d4">
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
              Rendimentos
            </Heading>
            <Text color="whiteAlpha.800" fontSize="sm">
              Acompanha os teus ganhos e histórico de pagamentos.
            </Text>
          </Box>
        </Box>

        <Box maxW="1100px" mx="auto" px={{ base: 4, md: 6 }} py="8">

          {/* KPIs */}
          <Grid templateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }} gap="4" mb="8">
            {[
              { label: "Ganho Líquido Total", value: `${Number(data?.totals?.net ?? 0).toFixed(2)} Kz`,         icon: LuWallet,     color: blue      },
              { label: "Faturação Bruta",     value: `${Number(data?.totals?.gross ?? 0).toFixed(2)} Kz`,       icon: LuTrendingUp, color: "#8B5CF6" },
              { label: "Taxa Descontada",     value: `${Number(data?.totals?.fees ?? 0).toFixed(2)} Kz`,        icon: LuMinus,      color: "#EF4444" },
              { label: "Total de Pagamentos", value: data?.totals?.payments ?? 0,                                icon: LuCreditCard, color: "#10B981" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Box key={s.label} bg={white} borderRadius="2xl" border="1px solid"
                  borderColor="gray.150" shadow="md" p="5" transition="all 0.2s"
                  _hover={{ shadow: "lg", borderColor: s.color, transform: "translateY(-2px)" }}>
                  <Flex w="40px" h="40px" borderRadius="xl" bg={`${s.color}15`} color={s.color}
                    alignItems="center" justifyContent="center" mb="3">
                    <Icon size={18} />
                  </Flex>
                  <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="extrabold" color="gray.800">
                    {s.value}
                  </Text>
                  <Text fontSize="xs" color="gray.400" fontWeight="medium">{s.label}</Text>
                </Box>
              );
            })}
          </Grid>

          {/* Mês atual destaque */}
          <Box
            bg={blue} borderRadius="2xl" p={{ base: 5, md: 7 }} mb="8"
            position="relative" overflow="hidden" color={white}
          >
            <Box position="absolute" top="-40px" right="-40px" w="160px" h="160px"
              borderRadius="full" bg="whiteAlpha.100" />
            <Box position="absolute" bottom="-30px" left="20px" w="100px" h="100px"
              borderRadius="full" bg="whiteAlpha.100" />

            <Flex justify="space-between" align="flex-start" flexWrap="wrap" gap="4" position="relative">
              <VStack align="flex-start" gap="1">
                <Text fontSize="xs" color="whiteAlpha.800">Ganho líquido este mês</Text>
                <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="extrabold">
                  {Number(data?.currentMonth?.net ?? 0).toFixed(2)} Kz
                </Text>
                <HStack gap="3" mt="1" flexWrap="wrap">
                  <Text fontSize="xs" color="whiteAlpha.700">
                    Bruto: {Number(data?.currentMonth?.gross ?? 0).toFixed(2)} Kz
                  </Text>
                  <Text fontSize="xs" color="whiteAlpha.700">
                    Taxa: {Number(data?.currentMonth?.fees ?? 0).toFixed(2)} Kz
                  </Text>
                  <Text fontSize="xs" color="whiteAlpha.700">
                    {data?.currentMonth?.count ?? 0} serviços pagos
                  </Text>
                </HStack>
              </VStack>

              <HStack
                gap="2" bg="whiteAlpha.200" borderRadius="full" px="4" py="2"
                color={isPositive ? "#6EE7B7" : isNeutral ? white : "#FCA5A5"}
              >
                {isPositive ? <LuArrowUp size={14} /> : isNeutral ? null : <LuArrowDown size={14} />}
                <Text fontSize="sm" fontWeight="bold">
                  {isNeutral ? "Sem variação" : `${isPositive ? "+" : ""}${growth}% vs mês anterior`}
                </Text>
              </HStack>
            </Flex>
          </Box>

          {/* Gráfico de evolução */}
          <Box bg={white} borderRadius="2xl" border="1px solid" borderColor="gray.150"
            shadow="md" p={{ base: 4, md: 6 }} mb="6">
            <Text fontWeight="bold" color="gray.800" mb="4">Evolução dos Ganhos</Text>
            {(data?.monthly ?? []).length === 0 ? (
              <Center h="200px"><Text color="gray.400" fontSize="sm">Sem dados suficientes</Text></Center>
            ) : (
              <Box h={{ base: "220px", md: "280px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.monthly}>
                    <defs>
                      <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={blue} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={blue} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false}
                      tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: "1px solid #f0f0f0", fontSize: 12 }}
                      formatter={(value: any) => [`${Number(value).toFixed(2)} Kz`, "Líquido"]}
                    />
                    <Area type="monotone" dataKey="net" stroke={blue} strokeWidth={2.5}
                      fill="url(#netGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Box>

          {/* Gráfico bruto vs taxa vs líquido */}
          <Box bg={white} borderRadius="2xl" border="1px solid" borderColor="gray.150"
            shadow="md" p={{ base: 4, md: 6 }} mb="6">
            <Text fontWeight="bold" color="gray.800" mb="4">Bruto, Taxa e Líquido por Mês</Text>
            {(data?.monthly ?? []).length === 0 ? (
              <Center h="200px"><Text color="gray.400" fontSize="sm">Sem dados suficientes</Text></Center>
            ) : (
              <Box h={{ base: "220px", md: "280px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.monthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false}
                      tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: "1px solid #f0f0f0", fontSize: 12 }}
                      formatter={(value: any, name: string) => [
                        `${Number(value).toFixed(2)} Kz`,
                        name === "net" ? "Líquido" : name === "fees" ? "Taxa" : "Bruto",
                      ]}
                    />
                    <Bar dataKey="net"  fill={blue}      radius={[6, 6, 0, 0]} />
                    <Bar dataKey="fees" fill="#EF4444"   radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Box>

          {/* Histórico de pagamentos */}
          <Box bg={white} borderRadius="2xl" border="1px solid" borderColor="gray.150" shadow="md" overflow="hidden">
            <HStack px="5" py="4" borderBottom="1px solid" borderColor="gray.100">
              <Text fontWeight="bold" color="gray.800">Histórico de Pagamentos</Text>
            </HStack>

            {(data?.history ?? []).length === 0 ? (
              <Center h="150px"><Text color="gray.400" fontSize="sm">Ainda não tens pagamentos</Text></Center>
            ) : (
              <VStack gap="0" divideY="1px" divideColor="gray.100">
                {data.history.map((h: any) => (
                  <HStack key={h.id} px="5" py="4" w="full" justify="space-between"
                    _hover={{ bg: "gray.50" }} transition="background 0.15s" flexWrap="wrap" gap="2">
                    <HStack gap="3">
                      {h.client_image ? (
                        <Box w="40px" h="40px" borderRadius="full" overflow="hidden" flexShrink={0}>
                          <img src={h.client_image} alt={h.client_name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Box>
                      ) : (
                        <Flex w="40px" h="40px" borderRadius="full" bg={`${blue}15`} color={blue}
                          alignItems="center" justifyContent="center" flexShrink={0} fontWeight="bold" fontSize="sm">
                          {h.client_name?.charAt(0).toUpperCase()}
                        </Flex>
                      )}
                      <VStack align="flex-start" gap="0">
                        <Text fontSize="sm" fontWeight="semibold" color="gray.800">{h.client_name}</Text>
                        <Text fontSize="xs" color="gray.400">
                          {h.description} · {new Date(h.paid_at).toLocaleDateString("pt-PT", { day: "2-digit", month: "short" })}
                        </Text>
                      </VStack>
                    </HStack>
                    <VStack align="flex-end" gap="0">
                      <Text fontSize="sm" fontWeight="bold" color="#10B981">+{Number(h.worker_earnings).toFixed(2)} Kz</Text>
                      <Badge bg={`${blue}10`} color={blue} borderRadius="full" px="2" fontSize="9px">
                        {methodLabel[h.method] ?? h.method}
                      </Badge>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            )}
          </Box>

        </Box>
      </Box>
    </Box>
  );
}