import {
  Box, Flex, HStack, VStack, Text, Heading,
  Badge, Spinner, Center, Button,
} from "@chakra-ui/react";
import {
  LuFileText, LuCalendar, LuCreditCard,
  LuDownload, LuUser, LuBriefcase,
} from "react-icons/lu";
import Sidebar from "../components/sidebar";
import { blue, white } from "@/app/utils/COLORS";
import { useClientInvoices } from "@/app/controllers/useClientInvoices";
import { generateInvoicePDF, type InvoiceData } from "@/app/utils/generateInvoicePDF";

const methodLabel: Record<string, string> = {
  card:       "Cartão",
  transfer:   "Transferência",
  multicaixa: "Multicaixa Express",
};

const methodColor: Record<string, { bg: string; color: string }> = {
  card:       { bg: `${blue}15`,  color: blue       },
  transfer:   { bg: "#10B98115",  color: "#10B981"  },
  multicaixa: { bg: "#F9731615",  color: "#F97316"  },
};

export default function ClientInvoices() {
  const { invoices, loading } = useClientInvoices();

  return (
    <Box display="flex" minH="100vh" bg="gray.50">
      <Sidebar />

      <Box w="100%" ml="220px">
        {/* Hero */}
        <Box bg={blue} w="100%" px={{ base: 4, md: 10 }} py={10} position="relative" overflow="hidden">
          <Box
            position="absolute" inset="0" opacity={0.08}
            backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
            backgroundSize="32px 32px"
          />
          <Box maxW="1100px" mx="auto" position="relative">
            <Heading color={white} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" mb={1}>
              As minhas Faturas
            </Heading>
            <Text color="whiteAlpha.800" fontSize="sm">
              Histórico de todos os pagamentos efetuados.
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
                  w="64px" h="64px" borderRadius="full"
                  bg={`${blue}15`} color={blue}
                  alignItems="center" justifyContent="center"
                >
                  <LuFileText size={28} />
                </Flex>
                <Text color="gray.400" fontWeight="medium">Ainda não tens faturas</Text>
                <Text color="gray.300" fontSize="sm">As faturas aparecem após efectuares um pagamento</Text>
              </VStack>
            </Center>
          ) : (
            <VStack gap="4" align="stretch">
              {invoices.map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
              ))}
            </VStack>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function InvoiceCard({ invoice }: { invoice: InvoiceData }) {
  const palette = methodColor[invoice.method] ?? { bg: "gray.100", color: "gray.500" };

  return (
    <Box
      bg={white} borderRadius="2xl" border="1px solid" borderColor="gray.100"
      p="5" shadow="sm" transition="all 0.2s"
      _hover={{ shadow: "md", borderColor: "gray.200" }}
    >
      <HStack justify="space-between" align="flex-start" flexWrap="wrap" gap="3">

        {/* Lado esquerdo — info */}
        <HStack gap="4" align="flex-start" flex="1">
          <Flex
            w="48px" h="48px" borderRadius="xl" flexShrink={0}
            bg={`${blue}15`} color={blue}
            alignItems="center" justifyContent="center"
          >
            <LuFileText size={20} />
          </Flex>

          <VStack align="flex-start" gap="1.5" flex="1" minW="0">
            {/* Referência + método */}
            <HStack gap="2" flexWrap="wrap">
              <Text fontWeight="bold" fontSize="sm" color="gray.800">
                {invoice.reference}
              </Text>
              <Badge
                bg={palette.bg} color={palette.color}
                borderRadius="full" px="2" fontSize="10px"
              >
                {methodLabel[invoice.method] ?? invoice.method}
              </Badge>
            </HStack>

            {/* Descrição */}
            <Text fontSize="xs" color="gray.500" noOfLines={1}>
              {invoice.description}
            </Text>

            {/* Meta */}
            <HStack gap="4" flexWrap="wrap">
              <HStack gap="1.5" color="gray.400">
                <LuUser size={12} />
                <Text fontSize="xs">{invoice.worker?.name ?? "—"}</Text>
              </HStack>
              <HStack gap="1.5" color="gray.400">
                <LuBriefcase size={12} />
                <Text fontSize="xs">{invoice.worker?.specialty ?? "—"}</Text>
              </HStack>
              <HStack gap="1.5" color="gray.400">
                <LuCalendar size={12} />
                <Text fontSize="xs">
                  {new Date(invoice.issued_at).toLocaleDateString("pt-PT", {
                    day: "2-digit", month: "short", year: "numeric",
                  })}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </HStack>

        {/* Lado direito — valor + botão */}
        <VStack align="flex-end" gap="2" flexShrink={0}>
          <HStack gap="1.5">
            <LuCreditCard size={14} color={blue} />
            <Text fontSize="lg" fontWeight="extrabold" color={blue}>
              {Number(invoice.amount).toFixed(2)} Kz
            </Text>
          </HStack>
          <Text fontSize="10px" color="gray.400">
            Taxa: {Number(invoice.platform_fee).toFixed(2)} Kz
          </Text>
          <Button
            size="sm" variant="outline" borderRadius="lg"
            borderColor={blue} color={blue}
            _hover={{ bg: `${blue}10` }}
            onClick={() => generateInvoicePDF(invoice)}
          >
            <HStack gap="1.5">
              <LuDownload size={13} />
              <Text fontSize="xs">Descarregar</Text>
            </HStack>
          </Button>
        </VStack>

      </HStack>
    </Box>
  );
}