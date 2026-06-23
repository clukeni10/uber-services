import type { Service } from "@/app/types/ServiceType";
import { white, blue } from "@/app/utils/COLORS";
import { Badge, Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { LuCalendar, LuCreditCard } from "react-icons/lu";

export default function ClientServiceCard({
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
      p="5"
      shadow="sm"
      transition="all 0.2s"
      _hover={{ shadow: "md", borderColor: "gray.200" }}
    >
      <HStack justify="space-between" align="flex-start" mb="3">
        <HStack gap="3">
          {(s as any).worker_image ? (
            <Box
              w="44px"
              h="44px"
              borderRadius="full"
              overflow="hidden"
              flexShrink={0}
            >
              <img
                src={(s as any).worker_image}
                alt={(s as any).worker_name}
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
              {(s as any).worker_name?.charAt(0).toUpperCase()}
            </Flex>
          )}
          <VStack align="flex-start" gap="0">
            <Text fontWeight="bold" fontSize="sm" color="gray.800">
              {(s as any).worker_name}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {(s as any).specialty ?? "—"}
            </Text>
          </VStack>
        </HStack>

        <Badge
          bg={config.bg}
          color={config.color}
          borderRadius="full"
          px="3"
          py="1"
          fontSize="xs"
        >
          {config.label}
        </Badge>
      </HStack>

      <Box bg="gray.50" borderRadius="xl" px="4" py="3" mb="3">
        <Text fontSize="sm" color="gray.700">
          {s.description}
        </Text>
      </Box>

      <HStack gap="4" justify="space-between" flexWrap="wrap">
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
          <Text fontSize="xs" fontWeight="bold" color={blue}>
            {s.amount ? `${parseFloat(String(s.amount)).toFixed(2)} Kz` : "—"}
          </Text>
        </HStack>

        {renderActions && renderActions(s)}
      </HStack>
    </Box>
  );
}
