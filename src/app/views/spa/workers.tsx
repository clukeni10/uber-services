import {
  Box, Flex, HStack, VStack, Text, Heading, Grid, Badge,
} from "@chakra-ui/react";
import {
  LuBriefcase, LuWallet, LuStar, LuShield, LuClock,
  LuTrendingUp, LuCircleCheck, LuArrowRight, LuUsers,
  LuSmartphone, LuBadgeCheck,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { blue, white, highlights } from "@/app/utils/COLORS";
import { usePageTitle } from "@/app/hooks/usePageTitle";

const benefits = [
  {
    icon: LuWallet,
    title: "Ganhos Atrativos",
    desc: "Define o teu próprio preço por hora e recebe 98% do valor pago pelo cliente. A plataforma retém apenas 2% como taxa de serviço.",
    color: "#10B981",
  },
  {
    icon: LuClock,
    title: "Horário Flexível",
    desc: "Tu decides quando e quanto trabalhas. Ativa ou desativa a tua disponibilidade a qualquer momento através do teu perfil.",
    color: blue,
  },
  {
    icon: LuShield,
    title: "Pagamentos Seguros",
    desc: "Todos os pagamentos são processados pela plataforma antes do serviço começar. Nunca ficas sem receber o teu trabalho.",
    color: "#8B5CF6",
  },
  {
    icon: LuStar,
    title: "Reputação Online",
    desc: "Constrói o teu portfólio com avaliações reais dos clientes. Quanto melhor a tua avaliação, mais pedidos recebes.",
    color: "#F59E0B",
  },
  {
    icon: LuTrendingUp,
    title: "Crescimento Contínuo",
    desc: "Acompanha os teus ganhos totais, serviços realizados e avaliação média diretamente no teu dashboard.",
    color: "#F97316",
  },
  {
    icon: LuSmartphone,
    title: "Gestão Simples",
    desc: "Aceita ou recusa pedidos, marca serviços como iniciados ou concluídos — tudo numa interface simples e intuitiva.",
    color: "#06B6D4",
  },
];

const steps = [
  {
    number: "01",
    title: "Regista-te como Profissional",
    desc: "Cria a tua conta em segundos. Escolhe a opção 'Profissional' no registo e preenche os teus dados básicos.",
  },
  {
    number: "02",
    title: "Completa o teu Perfil",
    desc: "Adiciona a tua especialidade, bio, preço por hora e foto de perfil. Um perfil completo atrai mais clientes.",
  },
  {
    number: "03",
    title: "Recebe Pedidos",
    desc: "Os clientes encontram-te e enviam pedidos de serviço. Receves uma notificação e decides se aceitas ou não.",
  },
  {
    number: "04",
    title: "Realiza o Serviço e Recebe",
    desc: "Conclui o serviço na plataforma e os teus ganhos são automaticamente registados. Simples assim.",
  },
];

const specialties = [
  "Electricista", "Canalizador", "Diarista", "Pintor",
  "Montador", "Mudanças", "Cabeleireiro", "Jardinagem",
  "Fotógrafo", "Técnico de Informática",
];

const stats = [
  { value: "98%",   label: "dos ganhos para si"         },
  { value: "2%",    label: "taxa da plataforma"          },
  { value: "24/7",  label: "acesso ao dashboard"         },
  { value: "100%",  label: "pagamentos garantidos"       },
];

export default function Workers() {
        usePageTitle('Workers | Workê');
  const navigate = useNavigate();

  return (
    <Box bg={white} minH="100vh">
      <Header />

      {/* Hero */}
      <Box
        bg={blue} position="relative" overflow="hidden"
        px={{ base: 6, md: 16 }} py={{ base: 16, md: 24 }}
      >
        <Box
          position="absolute" inset="0" opacity={0.08}
          backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
          backgroundSize="32px 32px"
        />
        {/* Círculos decorativos */}
        <Box position="absolute" top="-80px" right="-80px" w="300px" h="300px"
          borderRadius="full" bg="whiteAlpha.100" />
        <Box position="absolute" bottom="-60px" left="-60px" w="200px" h="200px"
          borderRadius="full" bg="whiteAlpha.100" />

        <Box maxW="900px" mx="auto" position="relative" textAlign="center">
          <Badge
            bg="whiteAlpha.200" color={white} borderRadius="full"
            px="4" py="1.5" fontSize="xs" fontWeight="semibold" mb="6"
            display="inline-flex" alignItems="center" gap="2"
          >
            <LuBriefcase size={12} />
            Para Profissionais
          </Badge>

          <Heading
            color={white} fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold" lineHeight="1.15" mb="5"
          >
            Trabalha quando queres.{" "}
            <Box as="span" color={highlights}>Ganha o que mereces.</Box>
          </Heading>

          <Text
            color="whiteAlpha.800" fontSize={{ base: "md", md: "lg" }}
            maxW="600px" mx="auto" mb="10" lineHeight="1.8"
          >
            Na Workê, és tu quem define o preço, o horário e os serviços que aceitas.
            Junta-te a centenas de profissionais que já estão a ganhar com os seus talentos.
          </Text>

          <HStack gap="4" justify="center" flexWrap="wrap">
            <Box
              bg={white} color={blue} px="8" py="3.5" borderRadius="xl"
              fontWeight="bold" fontSize="sm" cursor="pointer"
              _hover={{ opacity: 0.9, transform: "translateY(-2px)" }}
              transition="all 0.2s"
              onClick={() => navigate("/register")}
            >
              Começa agora — é grátis
            </Box>
            <Box
              bg="whiteAlpha.200" color={white} px="8" py="3.5" borderRadius="xl"
              fontWeight="semibold" fontSize="sm" cursor="pointer"
              border="1px solid" borderColor="whiteAlpha.300"
              _hover={{ bg: "whiteAlpha.300" }}
              transition="all 0.2s"
              onClick={() => navigate("/login")}
            >
              Já tenho conta
            </Box>
          </HStack>
        </Box>
      </Box>

      {/* Stats */}
      <Box bg="gray.50" px={{ base: 6, md: 16 }} py="10">
        <Grid
          maxW="900px" mx="auto"
          templateColumns={{ base: "repeat(2,1fr)", md: "repeat(4,1fr)" }}
          gap="6"
        >
          {stats.map((s) => (
            <Box key={s.label} textAlign="center">
              <Text fontSize="3xl" fontWeight="extrabold" color={blue}>{s.value}</Text>
              <Text fontSize="xs" color="gray.500" mt="1">{s.label}</Text>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* O que é um Profissional */}
      <Box px={{ base: 6, md: 16 }} py={{ base: 14, md: 20 }}>
        <Box maxW="1000px" mx="auto">
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="16" alignItems="center">
            <VStack align="flex-start" gap="5">
              <Badge bg={`${blue}15`} color={highlights} borderRadius="full" px="3" py="1" fontSize="xs" fontWeight="semibold">
                O que é um Profissional?
              </Badge>
              <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" color="gray.800" lineHeight="1.3">
                O teu talento tem valor. Nós ajudamos a monetizá-lo.
              </Heading>
              <Text color="gray.500" fontSize="sm" lineHeight="1.9">
                Um Profissional na Workê é qualquer pessoa com uma competência ou serviço para oferecer —
                desde electricistas e canalizadores a cabeleireiros e fotógrafos.
                Crias o teu perfil, defines o preço e os clientes vêm até ti.
              </Text>
              <Text color="gray.500" fontSize="sm" lineHeight="1.9">
                Não precisas de experiência prévia em plataformas digitais. O nosso processo é simples,
                rápido e pensado para que te focuses no que sabes fazer melhor — o teu trabalho.
              </Text>
              <HStack gap="3">
                <Flex w="20px" h="20px" borderRadius="full" bg="#10B98115" color="#10B981"
                  alignItems="center" justifyContent="center" flexShrink={0}>
                  <LuCircleCheck size={12} />
                </Flex>
                <Text fontSize="sm" color="gray.600">Registo gratuito e sem compromissos</Text>
              </HStack>
              <HStack gap="3">
                <Flex w="20px" h="20px" borderRadius="full" bg="#10B98115" color="#10B981"
                  alignItems="center" justifyContent="center" flexShrink={0}>
                  <LuCircleCheck size={12} />
                </Flex>
                <Text fontSize="sm" color="gray.600">Pagamentos processados antes do serviço</Text>
              </HStack>
              <HStack gap="3">
                <Flex w="20px" h="20px" borderRadius="full" bg="#10B98115" color="#10B981"
                  alignItems="center" justifyContent="center" flexShrink={0}>
                  <LuCircleCheck size={12} />
                </Flex>
                <Text fontSize="sm" color="gray.600">Tu defines o teu preço e disponibilidade</Text>
              </HStack>
            </VStack>

            {/* Card ilustrativo */}
            <Box bg="gray.50" borderRadius="3xl" p="8" border="1px solid" borderColor="gray.100">
              <VStack gap="4" align="stretch">
                {/* Mini perfil mock */}
                <Box bg={white} borderRadius="2xl" p="5" shadow="sm">
                  <HStack gap="3" mb="4">
                    <Flex w="48px" h="48px" borderRadius="full" bg={blue} color={white}
                      alignItems="center" justifyContent="center" fontWeight="bold" fontSize="lg" flexShrink={0}>
                      J
                    </Flex>
                    <VStack align="flex-start" gap="0">
                      <HStack gap="1.5">
                        <Text fontWeight="bold" fontSize="sm" color="gray.800">João Silva</Text>
                        <LuBadgeCheck size={14} color={blue} />
                      </HStack>
                      <Text fontSize="xs" color={blue}>Electricista</Text>
                    </VStack>
                    <Box ml="auto" px="2.5" py="1" borderRadius="full" bg="#10B98115" color="#10B981" fontSize="10px" fontWeight="semibold">
                      Disponível
                    </Box>
                  </HStack>
                  <HStack justify="space-between" pt="3" borderTop="1px solid" borderColor="gray.100">
                    <HStack gap="1">
                      <LuStar size={13} color="#F59E0B" fill="#F59E0B" />
                      <Text fontSize="sm" fontWeight="bold">4.9</Text>
                      <Text fontSize="xs" color="gray.400">(48 avaliações)</Text>
                    </HStack>
                    <Text fontSize="sm" fontWeight="bold" color={blue}>5.000 Kz/h</Text>
                  </HStack>
                </Box>

                {/* Ganhos mock */}
                <Box bg={white} borderRadius="2xl" p="5" shadow="sm">
                  <Text fontSize="xs" color="gray.400" fontWeight="semibold" mb="3">Este mês</Text>
                  <HStack justify="space-between">
                    <VStack align="flex-start" gap="0">
                      <Text fontSize="2xl" fontWeight="extrabold" color={blue}>245.000 Kz</Text>
                      <Text fontSize="xs" color="gray.400">Ganhos totais</Text>
                    </VStack>
                    <VStack align="flex-end" gap="0">
                      <Text fontSize="xl" fontWeight="bold" color="#10B981">+23%</Text>
                      <Text fontSize="xs" color="gray.400">vs mês anterior</Text>
                    </VStack>
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </Grid>
        </Box>
      </Box>

      {/* Benefícios */}
      <Box bg="gray.50" px={{ base: 6, md: 16 }} py={{ base: 14, md: 20 }}>
        <Box maxW="1000px" mx="auto">
          <VStack gap="2" mb="12" textAlign="center">
            <Badge bg={`${blue}15`} color={highlights} borderRadius="full" px="3" py="1" fontSize="xs" fontWeight="semibold">
              Porquê escolher a Workê?
            </Badge>
            <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" color="gray.800">
              Tudo o que precisas para crescer
            </Heading>
            <Text color="gray.500" fontSize="sm" maxW="500px">
              Criámos uma plataforma pensada para profissionais que querem trabalhar com liberdade e receber com segurança.
            </Text>
          </VStack>

          <Grid templateColumns={{ base: "1fr", sm: "repeat(2,1fr)", lg: "repeat(3,1fr)" }} gap="5">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <Box key={b.title} bg={white} borderRadius="2xl" p="6" border="1px solid"
                  borderColor="gray.100" shadow="sm" transition="all 0.2s"
                  _hover={{ transform: "translateY(-3px)", shadow: "md", borderColor: b.color }}>
                  <Flex w="44px" h="44px" borderRadius="xl" bg={`${b.color}15`} color={b.color}
                    alignItems="center" justifyContent="center" mb="4">
                    <Icon size={20} />
                  </Flex>
                  <Text fontWeight="bold" fontSize="sm" color="gray.800" mb="2">{b.title}</Text>
                  <Text fontSize="xs" color="gray.500" lineHeight="1.8">{b.desc}</Text>
                </Box>
              );
            })}
          </Grid>
        </Box>
      </Box>

      {/* Como funciona */}
      <Box px={{ base: 6, md: 16 }} py={{ base: 14, md: 20 }}>
        <Box maxW="900px" mx="auto">
          <VStack gap="2" mb="12" textAlign="center">
            <Badge bg={`${blue}15`} color={highlights} borderRadius="full" px="3" py="1" fontSize="xs" fontWeight="semibold">
              Como funciona
            </Badge>
            <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" color="gray.800">
              Começa em 4 passos simples
            </Heading>
          </VStack>

          <VStack gap="4" align="stretch">
            {steps.map((s, i) => (
              <Box key={s.number} bg="gray.50" borderRadius="2xl" p="6" border="1px solid" borderColor="gray.100"
                position="relative" overflow="hidden">
                <Box
                  position="absolute" right="20px" top="50%" transform="translateY(-50%)"
                  fontSize="80px" fontWeight="extrabold" color="gray.100" lineHeight="1"
                  userSelect="none"
                >
                  {s.number}
                </Box>
                <HStack gap="4" position="relative">
                  <Flex
                    w="40px" h="40px" borderRadius="xl" bg={blue} color={white}
                    alignItems="center" justifyContent="center" flexShrink={0}
                    fontWeight="bold" fontSize="sm"
                  >
                    {i + 1}
                  </Flex>
                  <VStack align="flex-start" gap="0.5">
                    <Text fontWeight="bold" fontSize="sm" color="gray.800">{s.title}</Text>
                    <Text fontSize="xs" color="gray.500" lineHeight="1.8">{s.desc}</Text>
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* Especialidades */}
      <Box bg="gray.50" px={{ base: 6, md: 16 }} py={{ base: 14, md: 20 }}>
        <Box maxW="900px" mx="auto" textAlign="center">
          <Badge bg={`${blue}15`} color={highlights} borderRadius="full" px="3" py="1" fontSize="xs" fontWeight="semibold" mb="4">
            Especialidades
          </Badge>
          <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" color="gray.800" mb="3">
            A tua área de trabalho está aqui
          </Heading>
          <Text color="gray.500" fontSize="sm" mb="8">
            Desde serviços técnicos a criativos — se tens um talento, tens lugar na Workê.
          </Text>
          <Flex flexWrap="wrap" gap="3" justify="center">
            {specialties.map((s) => (
              <Box
                key={s} px="4" py="2" borderRadius="full" bg={white}
                border="1px solid" borderColor="gray.200"
                fontSize="sm" color="gray.600" fontWeight="medium"
                cursor="pointer" transition="all 0.15s"
                _hover={{ bg: blue, color: white, borderColor: blue, transform: "translateY(-1px)" }}
              >
                {s}
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      {/* CTA Final */}
      <Box px={{ base: 6, md: 16 }} py={{ base: 14, md: 20 }}>
        <Box
          maxW="800px" mx="auto" bg={blue} borderRadius="3xl" p={{ base: 8, md: 14 }}
          textAlign="center" position="relative" overflow="hidden"
        >
          <Box position="absolute" top="-60px" right="-60px" w="200px" h="200px"
            borderRadius="full" bg="whiteAlpha.100" />
          <Box position="absolute" bottom="-40px" left="-40px" w="150px" h="150px"
            borderRadius="full" bg="whiteAlpha.100" />

          <Flex
            w="56px" h="56px" borderRadius="full" bg="whiteAlpha.200" color={white}
            alignItems="center" justifyContent="center" mx="auto" mb="5"
          >
            <LuUsers size={24} />
          </Flex>

          <Heading color={white} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" mb="3">
            Pronto para começar?
          </Heading>
          <Text color="whiteAlpha.800" fontSize="sm" mb="8" maxW="500px" mx="auto" lineHeight="1.8">
            Regista-te hoje, completa o teu perfil e começa a receber pedidos de serviço ainda esta semana.
            É gratuito e sem compromissos.
          </Text>

          <HStack gap="4" justify="center" flexWrap="wrap">
            <Box
              bg={white} color={blue} px="8" py="3.5" borderRadius="xl"
              fontWeight="bold" fontSize="sm" cursor="pointer"
              _hover={{ opacity: 0.9, transform: "translateY(-2px)" }}
              transition="all 0.2s"
              onClick={() => navigate("/register")}
            >
              <HStack gap="2">
                <Text>Registar como Profissional</Text>
                <LuArrowRight size={15} />
              </HStack>
            </Box>
          </HStack>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}