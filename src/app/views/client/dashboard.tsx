import {
  Box,
  HStack,
  Flex,
  Text,
  Heading,
  VStack,
  Grid,
} from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import { blue, white } from "@/app/utils/COLORS";
import {
  LuClock,
  LuHeart,
  LuStar,
  LuBriefcase,
  LuTrendingUp,
  LuBell,
} from "react-icons/lu";

const stats = [
  { label: "Serviços Contratados", value: "24", icon: LuClock, color: blue },
  { label: "Favoritos", value: "8", icon: LuHeart, color: "#E11D48" },
  { label: "Avaliação Média", value: "4.8", icon: LuStar, color: "#F59E0B" },
  { label: "Em Andamento", value: "1", icon: LuBriefcase, color: "#10B981" },
];

const recentActivity = [
  {
    title: "Instalação de ar-condicionado",
    prof: "Rafael Costa",
    time: "Hoje, 14:00",
    status: "Em andamento",
    color: "#F59E0B",
  },
  {
    title: "Pintura quarto",
    prof: "Juliana Pereira",
    time: "02 mai",
    status: "Concluído",
    color: "#10B981",
  },
  {
    title: "Limpeza pós-obra",
    prof: "Mariana Silva",
    time: "24 abr",
    status: "Concluído",
    color: "#10B981",
  },
];

export default function ClientDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user?.name?.split(" ")[0] ?? "Utilizador";

  return (
    <Box display="flex" h="100vh" bg="gray.50">
      <Sidebar />

      {/* Conteúdo principal */}
      <Box flex="1" ml="220px" overflow="auto">
        <Box maxW="1100px" mx="auto" px="8" py="8">
          {/* Top bar */}
          <HStack justify="space-between" mb="8">
            <VStack align="flex-start" gap="0">
              <Text fontSize="sm" color="gray.400">
                Bem-vindo de volta 👋
              </Text>
              <Heading fontSize="2xl" fontWeight="extrabold" color="gray.800">
                Olá, {firstName}
              </Heading>
            </VStack>
            <Flex
              w="40px"
              h="40px"
              borderRadius="full"
              bg={white}
              border="1px solid"
              borderColor="gray.100"
              alignItems="center"
              justifyContent="center"
              shadow="sm"
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
            >
              <LuBell size={18} color="gray" />
            </Flex>
          </HStack>

          {/* Stats */}
          <Grid
            templateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
            gap="4"
            mb="8"
          >
            {stats.map((s) => {
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
                  transition="all 0.2s ease"
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "md",
                    borderColor: s.color,
                  }}
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
                  <Text
                    fontSize="xs"
                    color="gray.400"
                    fontWeight="medium"
                    mt="0.5"
                  >
                    {s.label}
                  </Text>
                </Box>
              );
            })}
          </Grid>

          {/* Actividade recente + Banner */}
          <Grid templateColumns={{ base: "1fr", lg: "1.6fr 1fr" }} gap="6">
            {/* Actividade recente */}
            <Box
              bg={white}
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.100"
              shadow="sm"
              overflow="hidden"
            >
              <HStack
                justify="space-between"
                px="5"
                py="4"
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                <Text fontWeight="bold" color="gray.800">
                  Actividade Recente
                </Text>
                <Text
                  fontSize="xs"
                  color={blue}
                  fontWeight="semibold"
                  cursor="pointer"
                >
                  Ver tudo
                </Text>
              </HStack>
              <VStack gap="0" divideY="1px" divideColor="gray.100">
                {recentActivity.map((a) => (
                  <HStack
                    key={a.title}
                    px="5"
                    py="4"
                    w="full"
                    justify="space-between"
                    _hover={{ bg: "gray.50" }}
                    transition="background 0.15s"
                  >
                    <HStack gap="3">
                      <Box
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg={a.color}
                        flexShrink={0}
                      />
                      <VStack align="flex-start" gap="0">
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color="gray.800"
                        >
                          {a.title}
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          com {a.prof} · {a.time}
                        </Text>
                      </VStack>
                    </HStack>
                    <Box
                      px="2.5"
                      py="1"
                      borderRadius="full"
                      bg={`${a.color}15`}
                      color={a.color}
                      fontSize="10px"
                      fontWeight="semibold"
                      whiteSpace="nowrap"
                    >
                      {a.status}
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </Box>

            {/* Banner CTA */}
            <Box
              bg={blue}
              borderRadius="2xl"
              p="6"
              color={white}
              position="relative"
              overflow="hidden"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
              minH="200px"
            >
              {/* Decorativo */}
              <Box
                position="absolute"
                top="-30px"
                right="-30px"
                w="140px"
                h="140px"
                borderRadius="full"
                bg="whiteAlpha.100"
              />
              <Box
                position="absolute"
                bottom="-40px"
                right="30px"
                w="100px"
                h="100px"
                borderRadius="full"
                bg="whiteAlpha.100"
              />

              <Box position="relative">
                <Flex
                  w="40px"
                  h="40px"
                  borderRadius="xl"
                  bg="whiteAlpha.200"
                  alignItems="center"
                  justifyContent="center"
                  mb="3"
                >
                  <LuTrendingUp size={20} />
                </Flex>
                <Text fontWeight="extrabold" fontSize="lg" lineHeight="1.3">
                  Precisa de um serviço?
                </Text>
                <Text fontSize="xs" color="whiteAlpha.800" mt="1">
                  Encontre profissionais verificados perto de si.
                </Text>
              </Box>

              <Box
                mt="6"
                bg={white}
                color={blue}
                borderRadius="xl"
                py="2.5"
                textAlign="center"
                fontWeight="bold"
                fontSize="sm"
                cursor="pointer"
                position="relative"
                _hover={{ opacity: 0.9 }}
                onClick={() => (window.location.href = "/professionals")}
              >
                Explorar profissionais
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
