import type { Service } from "@/app/types/ServiceType";
import { white, blue } from "@/app/utils/COLORS";
import { Badge, Box, Avatar, HStack, VStack, Text } from "@chakra-ui/react";
import { LuCalendar, LuCreditCard, LuBadgeCheck } from "react-icons/lu";

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

export default function ClientServiceCard({
  service: s,
  renderActions,
}: {
  service: Service;
  renderActions?: (s: Service) => React.ReactNode;
}) {
  const config = statusConfig[s.status];

  const workerName = (s as any).worker_name || "Prestador";
  const workerImage = (s as any).worker_image;
  const specialty = (s as any).specialty ?? "Sem especialidade";

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
        <HStack gap="3" align="flex-start">
          {/* Contentor do Avatar idêntico ao segundo modelo */}
          <Box
            w="72px"
            h="72px"
            rounded="full"
            border="3px solid"
            borderColor="white"
            shadow="lg"
            flexShrink={0}
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.100"
          >
            <Avatar.Root w="100%" h="100%">
              <Avatar.Image
                src={
                  workerImage
                    ? `http://localhost:3001/${workerImage}` // Mantém o teu padrão de URL se as imagens vierem do backend
                    : undefined
                }
                alt={workerName}
                objectFit="cover"
              />

              <Avatar.Fallback
                name={workerName}
                bg="#0E1B2D"
                p="6"
                color="white"
                fontWeight="bold"
                fontSize="xl"
              />
            </Avatar.Root>
          </Box>

          {/* Alinhamento de Textos com o Ícone Check */}
          <VStack align="flex-start" gap="0.5" flex="1" minW="0">
            <HStack gap="1">
              <Text fontWeight="bold" fontSize="sm" color="gray.800">
                {workerName}
              </Text>
              <LuBadgeCheck size={14} color={blue} />
            </HStack>

            <Text fontSize="xs" color="gray.500">
              {specialty}
            </Text>
          </VStack>
        </HStack>

        {/* Badge do Status (Lado Direito) */}
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
