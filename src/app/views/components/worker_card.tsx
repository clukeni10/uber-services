import  { white, blue } from "@/app/utils/COLORS";
import  { HStack, Flex, VStack, Box, Text, Badge } from "@chakra-ui/react";
import { LuBadgeCheck, LuMapPin, LuStar } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import type { Worker } from "@/app/types/WorkerType";

export default function WorkerCard({worker}: {worker: Worker}){
      const navigate = useNavigate();
        return (
          <Box
            bg={white}
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.100"
            p="5"
            shadow="sm"
            transition="all 0.2s ease"
            _hover={{
              transform: "translateY(-3px)",
              shadow: "md",
              borderColor: blue,
              cursor: "pointer",
            }}
            onClick={() => navigate(`/client/workers/${worker.id}`)}
          >
            <HStack gap="3" align="flex-start">
              <Flex
                w="52px"
                h="52px"
                borderRadius="full"
                flexShrink={0}
                bg={blue}
                color={white}
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
                fontSize="lg"
              >
                {worker?.image ? (
                  <Box
                    w="72px"
                    h="72px"
                    rounded="full"
                    overflow="hidden"
                    border="4px solid"
                    borderColor={white}
                    shadow="md"
                    flexShrink={0}
                    position="relative"
                  >
                    <img
                      src={worker.image}
                      alt={worker.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                ) : (
                  <Flex
                    bg={blue}
                    w="72px"
                    h="72px"
                    rounded="full"
                    alignItems="center"
                    justifyContent="center"
                    color={white}
                    fontSize="2xl"
                    fontWeight="bold"
                    border="4px solid"
                    borderColor={white}
                    shadow="md"
                    flexShrink={0}
                  >
                    {worker?.name?.charAt(0).toUpperCase() ?? "?"}
                  </Flex>
                )}
              </Flex>
              <VStack align="flex-start" gap="0.5" flex="1" minW="0">
                <HStack gap="1">
                  <Text fontWeight="bold" fontSize="sm" color="gray.800">
                    {worker.name}
                  </Text>
                  <LuBadgeCheck size={14} color={blue} />
                </HStack>
                <Text fontSize="xs" color="gray.500">
                  {worker.specialty ?? "Sem especialidade"}
                </Text>
                <HStack gap="1" color="gray.400">
                  <LuMapPin size={11} />
                  <Text fontSize="xs">{worker.address ?? "Sem localização"}</Text>
                </HStack>
              </VStack>
            </HStack>
      
            {/* Rating + preço */}
            <HStack
              justify="space-between"
              mt="4"
              pt="3"
              borderTop="1px solid"
              borderColor="gray.100"
            >
              <HStack gap="1">
                <LuStar size={13} color="#F59E0B" fill="#F59E0B" />
                <Text fontSize="sm" fontWeight="bold">
                  {worker.rating_avg ? worker.rating_avg.toFixed(1) : "—"}
                </Text>
              </HStack>
              <Text fontSize="sm" fontWeight="bold" color={blue}>
                {worker.hourly_rate ? worker.hourly_rate.toFixed(2) : "—"}
              </Text>
            </HStack>
      
            <Badge
              mt="3"
              w="full"
              textAlign="center"
              borderRadius="lg"
              py="1"
              bg={worker.is_available ? "#10B98115" : "gray.100"}
              color={worker.is_available ? "#10B981" : "gray.400"}
              fontSize="xs"
            >
              {worker.is_available ? "Disponível" : "Indisponível"}
            </Badge>
          </Box>
        );
}