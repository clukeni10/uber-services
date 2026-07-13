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
} from "@chakra-ui/react";
import {
  LuFileText,
  LuCalendar,
  LuCreditCard,
  LuDownload,
  LuUser,
} from "react-icons/lu";
import Sidebar from "../components/sidebar";
import MobileMenuButton from "../components/mobile_menu_button";
import { blue, white } from "@/app/utils/COLORS";
import { useSidebar } from "@/app/context/SidebarContext";
import { generateInvoicePDF } from "@/app/utils/generateInvoicePDF";
import { useState, useEffect } from "react";
import { getWorkerInvoices } from "@/app/models/payments";
import type { InvoiceData } from "@/app/types/InvoiceData";
import { usePageTitle } from "@/app/hooks/usePageTitle";

const methodLabel: Record<string, string> = {
  card: "Cartão",
  transfer: "Transferência",
  multicaixa: "Multicaixa",
};
const methodColor: Record<string, { bg: string; color: string }> = {
  card: { bg: `${blue}15`, color: blue },
  transfer: { bg: "#10B98115", color: "#10B981" },
  multicaixa: { bg: "#F9731615", color: "#F97316" },
};

export default function WorkerInvoices() {
  usePageTitle("Faturas Worker | Workê");
  
  const { sidebarW } = useSidebar();
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getWorkerInvoices();
        if (!cancelled) setInvoices(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box display="flex" minH="100vh" bg="#d4d4d4">
      <Sidebar />
      <MobileMenuButton />

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
              As minhas Faturas
            </Heading>
            <Text color="whiteAlpha.800" fontSize="sm">
              Histórico de todos os serviços pagos pelos clientes.
            </Text>
          </Box>
        </Box>

        <Box maxW="1100px" mx="auto" px="6" py="8">
          {loading ? (
            <Center h="200px">
              <Spinner color={blue} size="xl" />
            </Center>
          ) : invoices.length === 0 ? (
            <Center h="300px">
              <VStack gap="3">
                <Flex
                  w="64px"
                  h="64px"
                  borderRadius="full"
                  bg={`${blue}15`}
                  color={blue}
                  alignItems="center"
                  justifyContent="center"
                >
                  <LuFileText size={28} />
                </Flex>
                <Text color="gray.400" fontWeight="medium">
                  Ainda não tens faturas
                </Text>
                <Text color="gray.300" fontSize="sm">
                  As faturas aparecem após os clientes pagarem os serviços
                </Text>
              </VStack>
            </Center>
          ) : (
            <VStack gap="4" align="stretch">
              {invoices.map((invoice) => {
                const palette = methodColor[invoice.method] ?? {
                  bg: "gray.100",
                  color: "gray.500",
                };
                return (
                  <Box
                    key={invoice.id}
                    bg={white}
                    borderRadius="2xl"border="1px solid" borderColor="gray.150" shadow="md"
                    p="5"
                    transition="all 0.2s"
                    _hover={{ shadow: "lg", borderColor: blue }}
                  >
                    <HStack
                      justify="space-between"
                      align="flex-start"
                      flexWrap="wrap"
                      gap="3"
                    >
                      <HStack gap="4" align="flex-start" flex="1">
                        <Flex
                          w="48px"
                          h="48px"
                          borderRadius="xl"
                          flexShrink={0}
                          bg={`${blue}15`}
                          color={blue}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <LuFileText size={20} />
                        </Flex>
                        <VStack align="flex-start" gap="1.5" flex="1" minW="0">
                          <HStack gap="2" flexWrap="wrap">
                            <Text
                              fontWeight="bold"
                              fontSize="sm"
                              color="gray.800"
                            >
                              {invoice.reference}
                            </Text>
                            <Badge
                              bg={palette.bg}
                              color={palette.color}
                              borderRadius="full"
                              px="2"
                              fontSize="10px"
                            >
                              {methodLabel[invoice.method] ?? invoice.method}
                            </Badge>
                          </HStack>
                          <Text fontSize="xs" color="gray.500">
                            {invoice.description}
                          </Text>
                          <HStack gap="4" flexWrap="wrap">
                            <HStack gap="1.5" color="gray.400">
                              <LuUser size={12} />
                              <Text fontSize="xs">
                                {invoice.client?.name ?? "—"}
                              </Text>
                            </HStack>
                            <HStack gap="1.5" color="gray.400">
                              <LuCalendar size={12} />
                              <Text fontSize="xs">
                                {new Date(invoice.issued_at).toLocaleDateString(
                                  "pt-PT",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </Text>
                            </HStack>
                          </HStack>
                        </VStack>
                      </HStack>
                      <VStack align="flex-end" gap="2" flexShrink={0}>
                        <HStack gap="1.5">
                          <LuCreditCard size={14} color="#10B981" />
                          <Text
                            fontSize="lg"
                            fontWeight="extrabold"
                            color="#10B981"
                          >
                            +{Number(invoice.worker_earnings).toFixed(2)} Kz
                          </Text>
                        </HStack>
                        <Text fontSize="10px" color="gray.400">
                          Total: {Number(invoice.amount).toFixed(2)} Kz
                        </Text>
                        <Button
                          size="sm"
                          variant="outline"
                          borderRadius="lg"
                          borderColor={blue}
                          color={blue}
                          _hover={{ bg: `${blue}10` }}
                          onClick={() => generateInvoicePDF(invoice)}
                        >
                          <HStack gap="1.5"  p="4">
                            <LuDownload size={13} />
                            <Text fontSize="xs">Descarregar</Text>
                          </HStack>
                        </Button>
                      </VStack>
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
