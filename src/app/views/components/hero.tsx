import { Box, Grid, GridItem, Heading, Text, Input, Button, Flex } from "@chakra-ui/react";
import { blue, dblue2, white, orange } from "@/app/utils/COLORS";
import { FiSearch, FiMapPin, FiShield, FiStar, FiClock, FiThumbsUp } from "react-icons/fi";

const stats = [
  { value: "50k+", label: "Serviços concluídos" },
  { value: "4.9★", label: "Avaliação média" },
  { value: "10k+", label: "Profissionais" },
  { value: "100%", label: "Verificados" },
];

const features = [
  {
    Icon: FiShield,
    title: "Verificação completa",
    desc: "Antecedentes e documentos validados.",
  },
  {
    Icon: FiClock,
    title: "Resposta rápida",
    desc: "Profissionais respondem em minutos.",
  },
  {
    Icon: FiStar,
    title: "Avaliações reais",
    desc: "Reputação construída por clientes.",
  },
];

const AVATAR_INITIALS = ["CA", "MS", "RC", "JP"];

export default function Hero() {
  return (
    <Box>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} minH="90vh">
        {/* Left — copy + search */}
        <GridItem bg={blue} display="flex" alignItems="center">
          <Box px={{ base: 8, lg: 16 }} py={16} maxW="600px">
            {/* Badge */}
            <Flex
              as="span"
              display="inline-flex"
              align="center"
              gap={2}
              bg="rgba(255,255,255,0.15)"
              color={white}
              borderRadius="full"
              px={4}
              py={1.5}
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="wide"
              mb={6}
            >
              <Box w="8px" h="8px" borderRadius="full" bg={orange} />
              PLATAFORMA #1 EM SERVIÇOS VERIFICADOS
            </Flex>

            {/* Headline */}
            <Heading
              as="h1"
              fontSize={{ base: "4xl", lg: "6xl" }}
              fontWeight="bold"
              color={white}
              lineHeight="1.1"
              mb={6}
            >
              Serviços de confiança,{" "}
              <Box as="span" color={orange}>
                na hora certa
              </Box>
            </Heading>

            {/* Sub-copy */}
            <Text color="whiteAlpha.800" fontSize="lg" mb={10} lineHeight="1.7">
              Conectamos você a profissionais qualificados, avaliados pela comunidade e prontos
              para resolver. Rápido, seguro e sem complicações.
            </Text>

            {/* Search bar */}
            <Flex
              bg={white}
              borderRadius="xl"
              overflow="hidden"
              p={2}
              gap={2}
              flexDir={{ base: "column", sm: "row" }}
            >
              <Flex flex={1} align="center" gap={2} px={3}>
                <Box color="gray.400" display="flex" alignItems="center">
                  <FiSearch size={18} />
                </Box>
                <Input
                  variant="unstyled"
                  placeholder="Que serviço você precisa?"
                  fontSize="sm"
                  color="gray.700"
                  _placeholder={{ color: "gray.400" }}
                />
              </Flex>

              <Box w="1px" bg="gray.200" display={{ base: "none", sm: "block" }} my={1} />

              <Flex flex={1} align="center" gap={2} px={3}>
                <Box color="gray.400" display="flex" alignItems="center">
                  <FiMapPin size={18} />
                </Box>
                <Input
                  variant="unstyled"
                  placeholder="Sua cidade"
                  fontSize="sm"
                  color="gray.700"
                  _placeholder={{ color: "gray.400" }}
                />
              </Flex>

              <Button
                bg={orange}
                color={white}
                fontWeight="bold"
                fontSize="sm"
                letterSpacing="wider"
                px={8}
                py={6}
                borderRadius="lg"
                _hover={{ bg: "#e56b0a" }}
                flexShrink={0}
              >
                BUSCAR
              </Button>
            </Flex>

            {/* Social proof row */}
            <Flex align="center" gap={4} mt={8} flexWrap="wrap">
              {/* Avatar stack — manual circles */}
              <Flex>
                {AVATAR_INITIALS.map((initials, i) => (
                  <Box
                    key={initials}
                    w="34px"
                    h="34px"
                    borderRadius="full"
                    bg="rgba(255,255,255,0.25)"
                    border="2px solid"
                    borderColor={blue}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    ml={i === 0 ? 0 : "-10px"}
                    fontSize="10px"
                    fontWeight="bold"
                    color={white}
                  >
                    {initials}
                  </Box>
                ))}
                <Box
                  w="34px"
                  h="34px"
                  borderRadius="full"
                  bg="rgba(255,255,255,0.15)"
                  border="2px solid"
                  borderColor={blue}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  ml="-10px"
                  fontSize="10px"
                  color={white}
                >
                  +10k
                </Box>
              </Flex>

              <Box>
                <Flex gap={0.5} mb={0.5} align="center">
                  {[...Array(5)].map((_, i) => (
                    <Box key={i} as="span" color={orange} fontSize="lg" lineHeight="1">
                      ★
                    </Box>
                  ))}
                  <Text as="span" color={white} fontWeight="bold" ml={1} fontSize="sm">
                    4.9/5
                  </Text>
                </Flex>
                <Text color="whiteAlpha.700" fontSize="sm">
                  Avaliados por +50.000 clientes
                </Text>
              </Box>
            </Flex>
          </Box>
        </GridItem>

        {/* Right — floating cards around professional image */}
        <GridItem
          bg={dblue2}
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          minH="400px"
        >
          {/* Rating card — top left */}
          <Flex
            position="absolute"
            top={8}
            left={8}
            bg={white}
            borderRadius="2xl"
            px={5}
            py={4}
            shadow="lg"
            align="center"
            gap={3}
            zIndex={1}
          >
            <Flex
              w="42px"
              h="42px"
              bg={orange}
              borderRadius="xl"
              align="center"
              justify="center"
              color={white}
              fontSize="xl"
            >
              ★
            </Flex>
            <Box>
              <Text fontWeight="bold" fontSize="xl" lineHeight="1">4.9 ★</Text>
              <Text fontSize="xs" color="gray.500">Média geral</Text>
            </Box>
          </Flex>

          {/* Verified badge — bottom right */}
          <Flex
            position="absolute"
            bottom="160px"
            right={8}
            bg={white}
            borderRadius="2xl"
            px={5}
            py={3}
            shadow="lg"
            align="center"
            gap={2}
            zIndex={1}
          >
            <Box color={blue} display="flex" alignItems="center">
              <FiShield size={18} />
            </Box>
            <Text fontWeight="semibold" fontSize="sm" color="gray.700">
              100% Verificado
            </Text>
          </Flex>

          {/* Contratações card — bottom left */}
          <Flex
            position="absolute"
            bottom={8}
            left={8}
            bg={white}
            borderRadius="2xl"
            px={5}
            py={4}
            shadow="lg"
            align="center"
            gap={3}
            zIndex={1}
          >
            <Flex
              w="42px"
              h="42px"
              bg={orange}
              borderRadius="xl"
              align="center"
              justify="center"
              color={white}
            >
              <FiThumbsUp size={20} />
            </Flex>
            <Box>
              <Text fontWeight="bold" fontSize="lg" lineHeight="1">+2.000 contratações</Text>
              <Text fontSize="xs" color="gray.500">somente esta semana</Text>
            </Box>
          </Flex>

          {/* Professional image placeholder */}
          <Box
            w="75%"
            h="70%"
            bg="rgba(255,255,255,0.08)"
            borderRadius="3xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="whiteAlpha.400" fontSize="sm">
              [Imagem do profissional]
            </Text>
          </Box>
        </GridItem>
      </Grid>

      {/* ── Stats bar ─────────────────────────────────────────────────────────── */}
      <Box bg={blue}>
        <Grid templateColumns={{ base: "1fr 1fr", md: "repeat(4, 1fr)" }}>
          {stats.map(({ value, label }, i) => (
            <Box
              key={label}
              px={8}
              py={8}
              textAlign="center"
              borderRight={i < stats.length - 1 ? "1px solid" : "none"}
              borderColor="whiteAlpha.200"
            >
              <Heading as="p" fontSize="4xl" fontWeight="bold" color={white} mb={1}>
                {value}
              </Heading>
              <Text fontSize="sm" color="whiteAlpha.700">{label}</Text>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* ── Trust features ────────────────────────────────────────────────────── */}
      <Box bg="white" py={12} px={{ base: 6, md: 16 }}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
          {features.map(({ Icon, title, desc }) => (
            <Flex key={title} align="center" gap={4}>
              <Flex
                w="52px"
                h="52px"
                bg={blue}
                borderRadius="xl"
                align="center"
                justify="center"
                flexShrink={0}
              >
                <Icon size={22} color={white} />
              </Flex>
              <Box>
                <Text fontWeight="bold" fontSize="md" color="gray.800">{title}</Text>
                <Text fontSize="sm" color="gray.500">{desc}</Text>
              </Box>
            </Flex>
          ))}
        </Grid>
      </Box>

      {/* ── Section header preview ────────────────────────────────────────────── */}
      <Box bg="gray.50" py={20} textAlign="center" px={6}>
        <Text
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="widest"
          color={orange}
          mb={4}
          textTransform="uppercase"
        >
          O QUE OFERECEMOS
        </Text>
        <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" color="gray.900" mb={4}>
          Serviços para todos os momentos
        </Heading>
        <Text color="gray.500" fontSize="lg" maxW="560px" mx="auto">
          Das pequenas reparações à grande mudança, temos o profissional certo para você.
        </Text>
      </Box>
    </Box>
  );
}