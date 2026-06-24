import { Box, VStack, Text, Heading, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { blue, white, highlights } from "@/app/utils/COLORS";
import { LuArrowLeft, LuHouse } from "react-icons/lu";
import { usePageTitle } from "../hooks/usePageTitle";

function RobotIcon() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Antena */}
      <line x1="60" y1="8" x2="60" y2="22" stroke={highlights} strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="6" r="4" fill={highlights} />

      {/* Cabeça */}
      <rect x="28" y="22" width="64" height="48" rx="12" fill={`${blue}15`} stroke={blue} strokeWidth="2" />

      {/* Olhos */}
      <circle cx="44" cy="44" r="8" fill={white} stroke={blue} strokeWidth="2" />
      <circle cx="76" cy="44" r="8" fill={white} stroke={blue} strokeWidth="2" />
      <circle cx="44" cy="44" r="4" fill={blue} />
      <circle cx="76" cy="44" r="4" fill={blue} />
      <circle cx="46" cy="42" r="1.5" fill={white} />
      <circle cx="78" cy="42" r="1.5" fill={white} />

      {/* Boca — linha ondulada (confuso) */}
      <path d="M42 58 Q50 54 60 58 Q70 62 78 58" stroke={highlights} strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Pescoço */}
      <rect x="52" y="70" width="16" height="8" rx="4" fill={`${blue}20`} stroke={blue} strokeWidth="1.5" />

      {/* Corpo */}
      <rect x="22" y="78" width="76" height="44" rx="12" fill={`${blue}15`} stroke={blue} strokeWidth="2" />

      {/* Painel do corpo */}
      <rect x="36" y="88" width="48" height="24" rx="8" fill={white} stroke={`${blue}40`} strokeWidth="1.5" />

      {/* Luzes do painel */}
      <circle cx="48" cy="96" r="4" fill={highlights} opacity="0.9" />
      <circle cx="60" cy="96" r="4" fill={`${blue}`} opacity="0.6" />
      <circle cx="72" cy="96" r="4" fill={highlights} opacity="0.5" />

      {/* Linha do painel */}
      <rect x="42" y="105" width="36" height="3" rx="1.5" fill={`${blue}30`} />

      {/* Braço esquerdo */}
      <rect x="4" y="80" width="16" height="36" rx="8" fill={`${blue}15`} stroke={blue} strokeWidth="2" />
      <circle cx="12" cy="118" r="6" fill={`${blue}20`} stroke={blue} strokeWidth="1.5" />

      {/* Braço direito */}
      <rect x="100" y="80" width="16" height="36" rx="8" fill={`${blue}15`} stroke={blue} strokeWidth="2" />
      <circle cx="108" cy="118" r="6" fill={`${blue}20`} stroke={blue} strokeWidth="1.5" />
    </svg>
  );
}

export default function NotFound() {
  usePageTitle("Página não encontrada | Workê");
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh" bg="gray.50"
      display="flex" alignItems="center" justifyContent="center"
      px="6" position="relative" overflow="hidden"
    >
      {/* Grid decorativo */}
      <Box
        position="absolute" inset="0" opacity={0.04}
        backgroundImage="linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)"
        backgroundSize="40px 40px"
      />

      {/* Círculos decorativos */}
      <Box position="absolute" top="-100px" right="-100px" w="400px" h="400px"
        borderRadius="full" bg={`${blue}08`} />
      <Box position="absolute" bottom="-80px" left="-80px" w="300px" h="300px"
        borderRadius="full" bg={`${highlights}10`} />

      <VStack gap="8" textAlign="center" position="relative" maxW="520px">

        {/* Robô */}
        <Box
          css={{
            animation: "float 3s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-12px)" },
            },
          }}
        >
          <RobotIcon />
        </Box>

        {/* 404 */}
        <Box position="relative">
          <Text
            fontSize="120px" fontWeight="extrabold" lineHeight="1"
            color="gray.100" userSelect="none"
            position="absolute" top="50%" left="50%"
            transform="translate(-50%, -50%)"
            whiteSpace="nowrap"
          >
            404
          </Text>
          <VStack gap="2" position="relative">
            <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" color="gray.800">
              Página não encontrada
            </Heading>
            <Text fontSize="sm" color="gray.500" lineHeight="1.8" maxW="380px">
              Esta página não existe ou ainda está em desenvolvimento.
              Entretanto, podes voltar ao início ou explorar a plataforma.
            </Text>
          </VStack>
        </Box>

        {/* Detalhes coloridos */}
        <HStack gap="3" flexWrap="wrap" justify="center">
          <Box
            px="3" py="1.5" borderRadius="full"
            bg={`${highlights}15`} color={highlights}
            fontSize="11px" fontWeight="semibold"
            border="1px solid" borderColor={`${highlights}30`}
          >
            Erro 404
          </Box>
          <Box
            px="3" py="1.5" borderRadius="full"
            bg={`${blue}10`} color={blue}
            fontSize="11px" fontWeight="semibold"
            border="1px solid" borderColor={`${blue}20`}
          >
            Página em desenvolvimento
          </Box>
        </HStack>

        {/* Botões */}
        <HStack gap="3" flexWrap="wrap" justify="center">
          <Box
            px="6" py="3" borderRadius="xl" bg={blue} color={white}
            fontWeight="semibold" fontSize="sm" cursor="pointer"
            _hover={{ opacity: 0.9, transform: "translateY(-2px)" }}
            transition="all 0.2s"
            onClick={() => navigate("/")}
          >
            <HStack gap="2">
              <LuHouse size={15} />
              <Text>Ir para o início</Text>
            </HStack>
          </Box>
          <Box
            px="6" py="3" borderRadius="xl"
            bg={white} color="gray.600"
            border="1px solid" borderColor="gray.200"
            fontWeight="semibold" fontSize="sm" cursor="pointer"
            _hover={{ bg: "gray.50", transform: "translateY(-2px)" }}
            transition="all 0.2s"
            onClick={() => navigate(-1)}
          >
            <HStack gap="2">
              <LuArrowLeft size={15} />
              <Text>Voltar atrás</Text>
            </HStack>
          </Box>
        </HStack>

      </VStack>
    </Box>
  );
}