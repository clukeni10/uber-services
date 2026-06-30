import {
  Box, Flex, HStack, VStack, Text, Heading,
  Badge, Spinner, Center, Input, InputGroup, Select, createListCollection,
} from "@chakra-ui/react";
import {
  LuSearch, LuCalendar, LuUser, LuBriefcase, LuCreditCard,
} from "react-icons/lu";
import Sidebar from "../components/sidebar";
import MobileMenuButton from "../components/mobile_menu_button";
import { blue, white } from "@/app/utils/COLORS";
import { useSidebar } from "@/app/context/SidebarContext";
import { useState, useEffect } from "react";
import { getAdminServices } from "@/app/models/admin";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: "Pendente",   color: "#F59E0B", bg: "#F59E0B15" },
  accepted:  { label: "Aceite",     color: "#3B82F6", bg: "#3B82F615" },
  active:    { label: "Em curso",   color: "#8B5CF6", bg: "#8B5CF615" },
  completed: { label: "Concluído",  color: "#10B981", bg: "#10B98115" },
  cancelled: { label: "Cancelado",  color: "#EF4444", bg: "#EF444415" },
};

const paymentStatusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Por pagar", color: "#F59E0B", bg: "#F59E0B15" },
  paid:    { label: "Pago",      color: "#10B981", bg: "#10B98115" },
  failed:  { label: "Falhado",   color: "#EF4444", bg: "#EF444415" },
};

const statusCollection = createListCollection({
  items: [
    { label: "Todos os estados", value: "" },
    { label: "Pendente",   value: "pending"   },
    { label: "Aceite",     value: "accepted"  },
    { label: "Em curso",   value: "active"    },
    { label: "Concluído",  value: "completed" },
    { label: "Cancelado",  value: "cancelled" },
  ],
});

export default function AdminServices() {
  const { sidebarW } = useSidebar();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await getAdminServices({ status: statusFilter || undefined, search: search || undefined });
        if (!cancelled) setServices(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [search, statusFilter]);

  const stats = {
    total:     services.length,
    pending:   services.filter(s => s.status === "pending").length,
    active:    services.filter(s => s.status === "active").length,
    completed: services.filter(s => s.status === "completed").length,
    cancelled: services.filter(s => s.status === "cancelled").length,
  };

  return (
    <Box display="flex" minH="100vh" bg="gray.50">
      <Sidebar />
      <MobileMenuButton />

      <Box w="100%" flex="1" ml={{ base: "0", md: sidebarW }} transition="margin 0.25s ease" overflow="auto">

        <Box bg={blue} w="100%" px={{ base: 4, md: 10 }} py={10} position="relative" overflow="hidden">
          <Box position="absolute" inset="0" opacity={0.08}
            backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
            backgroundSize="32px 32px" />
          <Box maxW="1100px" mx="auto" position="relative">
            <Heading color={white} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" mb={1}>
              Serviços
            </Heading>
            <Text color="whiteAlpha.800" fontSize="sm">
              Gestão e monitorização de todos os serviços da plataforma.
            </Text>
            {/* Mini stats no hero */}
            <HStack gap="4" mt="5" flexWrap="wrap">
              {[
                { label: "Total",      value: stats.total,     color: white         },
                { label: "Pendentes",  value: stats.pending,   color: "#FCD34D"     },
                { label: "Ativos",     value: stats.active,    color: "#C4B5FD"     },
                { label: "Concluídos", value: stats.completed, color: "#6EE7B7"     },
                { label: "Cancelados", value: stats.cancelled, color: "#FCA5A5"     },
              ].map(s => (
                <Box key={s.label} bg="whiteAlpha.200" borderRadius="xl" px="4" py="2">
                  <Text fontSize="xl" fontWeight="extrabold" color={s.color}>{s.value}</Text>
                  <Text fontSize="10px" color="whiteAlpha.800">{s.label}</Text>
                </Box>
              ))}
            </HStack>
          </Box>
        </Box>

        <Box maxW="1100px" mx="auto" px="6" py="8">

          {/* Filtros */}
          <HStack mb="5" gap="3" flexWrap="wrap">
            <InputGroup flex="1" maxW="350px" startElement={<LuSearch size={15} color="gray" />}>
              <Input placeholder="Pesquisar cliente, worker ou descrição..."
                bg={white} borderRadius="xl" fontSize="sm"
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </InputGroup>

            <Select.Root collection={statusCollection} w="200px"
              value={[statusFilter]}
              onValueChange={(e) => setStatusFilter(e.value[0] ?? "")}>
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger bg={white} borderRadius="xl" fontSize="sm">
                  <Select.ValueText placeholder="Filtrar estado" />
                </Select.Trigger>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {statusCollection.items.map(item => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}<Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </HStack>

          {loading ? (
            <Center h="200px"><Spinner color={blue} size="xl" /></Center>
          ) : services.length === 0 ? (
            <Center h="200px">
              <Text color="gray.400">Nenhum serviço encontrado</Text>
            </Center>
          ) : (
            <VStack gap="3" align="stretch">
              {services.map((s: any) => {
                const statusCfg = statusConfig[s.status] ?? statusConfig.pending;
                const paymentCfg = s.payment_status ? paymentStatusConfig[s.payment_status] : null;
                return (
                  <Box key={s.id} bg={white} borderRadius="2xl" border="1px solid"
                    borderColor="gray.100" p="5" shadow="sm" transition="all 0.2s"
                    _hover={{ shadow: "md", borderColor: "gray.200" }}>
                    <HStack justify="space-between" align="flex-start" mb="3" flexWrap="wrap" gap="2">
                      <HStack gap="2">
                        <Badge bg={statusCfg.bg} color={statusCfg.color} borderRadius="full" px="3" py="1" fontSize="xs">
                          {statusCfg.label}
                        </Badge>
                        {paymentCfg && (
                          <Badge bg={paymentCfg.bg} color={paymentCfg.color} borderRadius="full" px="3" py="1" fontSize="xs">
                            {paymentCfg.label}
                          </Badge>
                        )}
                        {s.category_name && (
                          <Badge bg={`${blue}10`} color={blue} borderRadius="full" px="2" fontSize="10px">
                            {s.category_name}
                          </Badge>
                        )}
                      </HStack>
                      <Text fontSize="10px" color="gray.400">
                        #{s.id} · {new Date(s.created_at).toLocaleDateString("pt-PT")}
                      </Text>
                    </HStack>

                    <Text fontSize="sm" color="gray.700" fontWeight="medium" mb="3">{s.description}</Text>

                    <HStack justify="space-between" flexWrap="wrap" gap="3">
                      <HStack gap="4" flexWrap="wrap">
                        <HStack gap="1.5" color="gray.500">
                          <LuUser size={13} />
                          <Text fontSize="xs">{s.client_name}</Text>
                        </HStack>
                        <HStack gap="1.5" color="gray.500">
                          <LuBriefcase size={13} />
                          <Text fontSize="xs">{s.worker_name} {s.specialty ? `· ${s.specialty}` : ""}</Text>
                        </HStack>
                        {s.scheduled_at && (
                          <HStack gap="1.5" color="gray.500">
                            <LuCalendar size={13} />
                            <Text fontSize="xs">
                              {new Date(s.scheduled_at).toLocaleString("pt-PT", {
                                day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
                              })}
                            </Text>
                          </HStack>
                        )}
                      </HStack>
                      {s.amount && (
                        <HStack gap="1.5">
                          <LuCreditCard size={13} color={blue} />
                          <Text fontSize="sm" fontWeight="bold" color={blue}>
                            {Number(s.amount).toFixed(2)} Kz
                          </Text>
                        </HStack>
                      )}
                    </HStack>
                  </Box>
                );
              })}
            </VStack>
          )}
        </Box>
      </Box>
    </Box>
  );
}