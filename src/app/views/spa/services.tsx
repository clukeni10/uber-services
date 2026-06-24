import { Box, Flex, Grid, Heading, Text, HStack, VStack, Badge, Input, InputGroup } from "@chakra-ui/react";
import Header from "../components/header";
import Footer from "../components/footer";
import { blue, white, highlights } from "@/app/utils/COLORS";
import { useState } from "react";
import {
  LuZap, LuWrench, LuSparkles, LuPaintbrush, LuHammer,
  LuTruck, LuScissors, LuLeaf, LuCamera, LuSmartphone,
  LuArrowRight, LuSearch,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "@/app/hooks/usePageTitle";

const services = [ 
  { 
    icon: LuZap,
    title: "Electricista",
    desc: "Instalações, reparações e manutenção elétrica residencial e comercial com segurança garantida.",
    color: "#F59E0B",
    count: 124,
  },
  {
    icon: LuWrench,
    title: "Canalizador",
    desc: "Fugas, desentupimentos e instalações hidráulicas com profissionais experientes e certificados.",
    color: "#3B82F6",
    count: 86,
  },
  {
    icon: LuSparkles,
    title: "Diarista",
    desc: "Limpeza profunda, organização e manutenção do lar com profissionais de confiança.",
    color: "#10B981",
    count: 210,
  },
  {
    icon: LuPaintbrush,
    title: "Pintor",
    desc: "Pintura interior e exterior com acabamento profissional e materiais de qualidade.",
    color: "#8B5CF6",
    count: 72,
  },
  {
    icon: LuHammer,
    title: "Montador",
    desc: "Montagem de móveis, prateleiras e organização de espaços de forma rápida e eficiente.",
    color: "#F97316",
    count: 58,
  },
  {
    icon: LuTruck,
    title: "Mudanças",
    desc: "Transporte e mudanças com equipa qualificada, cuidado garantido com os teus bens.",
    color: "#06B6D4",
    count: 41,
  },
  {
    icon: LuScissors,
    title: "Cabeleireiro",
    desc: "Corte, tratamento e styling profissional no conforto da tua casa ou em salão.",
    color: "#EC4899",
    count: 65,
  },
  {
    icon: LuLeaf,
    title: "Jardinagem",
    desc: "Manutenção, poda e design de jardins por profissionais apaixonados pela natureza.",
    color: "#22C55E",
    count: 33,
  },
  {
    icon: LuCamera,
    title: "Fotógrafo",
    desc: "Sessões fotográficas, eventos e cobertura profissional com equipamento de topo.",
    color: "#EF4444",
    count: 29,
  },
  {
    icon: LuSmartphone,
    title: "Técnico de Informática",
    desc: "Assistência técnica, formatação, redes e manutenção de equipamentos informáticos.",
    color: "#6366F1",
    count: 47,
  },
];

export default function Services() {
        usePageTitle('Serviços | Workê');
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box bg={white} minH="100vh">
      <Header />

      {/* Hero */}
      <Box
        bg={blue} position="relative" overflow="hidden"
        px={{ base: 6, md: 16 }} py={{ base: 14, md: 20 }}
      >
        <Box
          position="absolute" inset="0" opacity={0.08}
          backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
          backgroundSize="32px 32px"
        />
        <Box position="absolute" top="-80px" right="-80px" w="300px" h="300px"
          borderRadius="full" bg="whiteAlpha.100" />
        <Box position="absolute" bottom="-60px" left="-60px" w="200px" h="200px"
          borderRadius="full" bg="whiteAlpha.100" />

        <Box maxW="800px" mx="auto" position="relative" textAlign="center">
          <Badge
            bg="whiteAlpha.200" color={white} borderRadius="full"
            px="4" py="1.5" fontSize="xs" fontWeight="semibold" mb="5"
          >
            Todos os Serviços
          </Badge>
          <Heading
            color={white} fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold" lineHeight="1.15" mb="4"
          >
            Encontra o profissional{" "}
            <Box as="span" color={highlights}>ideal para si</Box>
          </Heading>
          <Text color="whiteAlpha.800" fontSize={{ base: "sm", md: "md" }} mb="8" maxW="500px" mx="auto" lineHeight="1.8">
            Profissionais verificados, avaliações reais e contratação em minutos.
            Escolhe o serviço que precisas e encontra quem o faz melhor.
          </Text>

          {/* Search */}
          <Box maxW="480px" mx="auto" p="4">
            <InputGroup startElement={<LuSearch size={16} color="gray" />} >
              <Input
                placeholder="Pesquisar serviços..."
                bg={white} borderRadius="xl" fontSize="sm"
                border="none" shadow="lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                
              />
            </InputGroup>
          </Box>
        </Box>
      </Box>

      {/* Stats */}
      <Box bg="gray.50" px={{ base: 6, md: 16 }} py="8" borderBottom="1px solid" borderColor="gray.100">
        <HStack maxW="700px" mx="auto" justify="center" gap={{ base: 6, md: 12 }} flexWrap="wrap">
          {[
            { value: `${services.length}`,                                            label: "Categorias"         },
            { value: `${services.reduce((a, s) => a + s.count, 0)}+`,               label: "Profissionais"      },
            { value: filtered.length < services.length ? `${filtered.length}` : "10+", label: "Resultados"      },
          ].map((s) => (
            <VStack key={s.label} gap="0" textAlign="center">
              <Text fontSize="2xl" fontWeight="extrabold" color={blue}>{s.value}</Text>
              <Text fontSize="xs" color="gray.400">{s.label}</Text>
            </VStack>
          ))}
        </HStack>
      </Box>

      {/* Grid de serviços */}
      <Box px={{ base: 6, md: 16 }} py={{ base: 12, md: 16 }}>
        <Box maxW="1100px" mx="auto">
          {filtered.length === 0 ? (
            <Flex h="200px" alignItems="center" justifyContent="center">
              <VStack gap="2">
                <Text color="gray.400" fontWeight="medium">Nenhum serviço encontrado</Text>
                <Text color="gray.300" fontSize="sm">Tenta outro termo de pesquisa</Text>
              </VStack>
            </Flex>
          ) : (
            <Grid
              templateColumns={{ base: "1fr", sm: "repeat(2,1fr)", lg: "repeat(3,1fr)" }}
              gap="5"
            >
              {filtered.map((s) => {
                const Icon = s.icon;
                return (
                  <Box
                    key={s.title}
                    bg={white} borderRadius="2xl" p="6"
                    border="1px solid" borderColor="gray.100" shadow="sm"
                    transition="all 0.25s ease" cursor="pointer"
                    _hover={{
                      transform: "translateY(-4px)",
                      shadow: "lg",
                      borderColor: s.color,
                    }}
                    onClick={() => navigate("/login")}
                    position="relative" overflow="hidden"
                  >
                    {/* Número decorativo */}
                    <Box
                      position="absolute" bottom="-10px" right="-5px"
                      fontSize="80px" fontWeight="extrabold"
                      color="gray.50" lineHeight="1" userSelect="none"
                      pointerEvents="none"
                    >
                      {String(services.indexOf(s) + 1).padStart(2, "0")}
                    </Box>

                    <Flex
                      w="52px" h="52px" borderRadius="xl"
                      bg={`${s.color}15`} color={s.color}
                      alignItems="center" justifyContent="center"
                      mb="4" position="relative"
                    >
                      <Icon size={22} />
                    </Flex>

                    <Text fontWeight="bold" fontSize="md" color="gray.800" mb="2">
                      {s.title}
                    </Text>
                    <Text fontSize="xs" color="gray.500" lineHeight="1.8" mb="4">
                      {s.desc}
                    </Text>

                    <HStack justify="space-between" align="center">
                      <Badge
                        bg={`${s.color}15`} color={s.color}
                        borderRadius="full" px="2.5" py="1" fontSize="10px" fontWeight="semibold"
                      >
                        {s.count} profissionais
                      </Badge>
                      <Flex
                        w="28px" h="28px" borderRadius="full"
                        bg={`${s.color}15`} color={s.color}
                        alignItems="center" justifyContent="center"
                        transition="all 0.2s"
                        _groupHover={{ bg: s.color, color: white }}
                      >
                        <LuArrowRight size={13} />
                      </Flex>
                    </HStack>
                  </Box>
                );
              })}
            </Grid>
          )}
        </Box>
      </Box>

      {/* CTA */}
      <Box bg="gray.50" px={{ base: 6, md: 16 }} py={{ base: 14, md: 20 }} borderTop="1px solid" borderColor="gray.100">
        <Box
          maxW="700px" mx="auto" bg={blue} borderRadius="3xl"
          p={{ base: 8, md: 12 }} textAlign="center"
          position="relative" overflow="hidden"
        >
          <Box position="absolute" top="-60px" right="-60px" w="200px" h="200px"
            borderRadius="full" bg="whiteAlpha.100" />
          <Box position="absolute" bottom="-40px" left="-40px" w="150px" h="150px"
            borderRadius="full" bg="whiteAlpha.100" />

          <Heading color={white} fontSize={{ base: "xl", md: "2xl" }} fontWeight="extrabold" mb="3" position="relative">
            Não encontras o que precisas?
          </Heading>
          <Text color="whiteAlpha.800" fontSize="sm" mb="7" maxW="400px" mx="auto" lineHeight="1.8" position="relative">
            Regista-te na plataforma e descreve o que precisas. Os nossos profissionais entram em contacto contigo.
          </Text>
          <HStack gap="3" justify="center" flexWrap="wrap" position="relative">
            <Box
              bg={white} color={blue} px="7" py="3" borderRadius="xl"
              fontWeight="bold" fontSize="sm" cursor="pointer"
              _hover={{ opacity: 0.9, transform: "translateY(-2px)" }}
              transition="all 0.2s"
              onClick={() => navigate("/register")}
            >
              Criar conta grátis
            </Box>
            <Box
              bg="whiteAlpha.200" color={white} px="7" py="3" borderRadius="xl"
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

      <Footer />
    </Box>
  );
}