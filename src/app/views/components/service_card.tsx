import type { Service } from "@/app/types/ServiceType";
import { white, blue } from "@/app/utils/COLORS";
import {
  HStack,
  Flex,
  VStack,
  Box,
  Badge,
  Text,
  Separator,
} from "@chakra-ui/react";
import {
  LuPhone,
  LuUser,
  LuCalendar,
  LuCreditCard,
  LuMapPin,
} from "react-icons/lu";

const statusConfig = {
  pending: { label: "Pendente", color: "#F59E0B", bg: "#F59E0B12" },
  accepted: { label: "Aceite", color: "#3B82F6", bg: "#3B82F612" },
  active: { label: "Em curso", color: "#8B5CF6", bg: "#8B5CF612" },
  completed: { label: "Concluído", color: "#10B981", bg: "#10B98112" },
  cancelled: { label: "Cancelado", color: "#EF4444", bg: "#EF444412" },
};

export default function ServiceCard({
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
      shadow="sm"
      p="5"
      transition="all 0.2s ease"
      _hover={{ shadow: "md", borderColor: "gray.200" }}
    >
      {/* Cabeçalho: cliente + estado */}
      <HStack justify="space-between" align="flex-start" mb="4">
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
            {s.category_name && (
              <Text fontSize="xs" color="gray.400">
                {s.category_name}
              </Text>
            )}
          </VStack>
        </HStack>

        <Badge
          bg={config.bg}
          color={config.color}
          borderRadius="full"
          px="3"
          py="1"
          fontSize="xs"
          fontWeight="semibold"
          display="flex"
          alignItems="center"
          gap="1.5"
        >
          <Box w="6px" h="6px" borderRadius="full" bg={config.color} />
          {config.label}
        </Badge>
      </HStack>

      {/* Descrição */}
      <Box bg="gray.50" borderRadius="xl" px="4" py="3" mb="4">
        <HStack gap="2" mb="1">
          <LuUser size={13} color="gray" />
          <Text fontSize="xs" color="gray.400" fontWeight="semibold">
            Descrição
          </Text>
        </HStack>
        <Text fontSize="sm" color="gray.700" lineHeight="1.5">
          {s.description}
        </Text>
      </Box>

      {/* Contacto: telefone + morada */}
      <VStack align="stretch" gap="1.5" mb="4">
        <HStack gap="2" color="gray.600">
          <LuPhone size={13} />
          <Text fontSize="xs">{s.client_phone ?? "—"}</Text>
        </HStack>
        <HStack gap="2" color="gray.600" align="flex-start">
          <Box mt="1px">
            <LuMapPin size={13} />
          </Box>
          <Text fontSize="xs" lineHeight="1.4">
            {s.address ?? "Morada não indicada"}
          </Text>
        </HStack>
      </VStack>

      <Separator borderColor="gray.100" mb="4" />

      {/* Meta info: data + valor */}
      <HStack justify="space-between" flexWrap="wrap">
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
        <HStack gap="1.5">
          <LuCreditCard size={13} color={blue} />
          <Text fontSize="sm" fontWeight="bold" color={blue}>
            {s.amount ? `${parseFloat(String(s.amount)).toFixed(2)} Kz` : "—"}
          </Text>
        </HStack>
      </HStack>

      {/* Ações */}
      {renderActions && <Box mt="4">{renderActions(s)}</Box>}
    </Box>
  );
}
