import { useState, useEffect } from "react";
import { Box, Grid, Heading, Text, Button, Flex, IconButton } from "@chakra-ui/react";
import { blue, white, orange } from "@/app/utils/COLORS";
import { FiShield, FiStar, FiClock, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    title: "Profissionais de confiança para a sua casa",
    desc: "De pequenas reparações a grandes remodelações. Encontre especialistas verificados e prontos para resolver o seu problema hoje mesmo.",
    cta: "Encontrar Profissional",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Limpeza impecável, sem preocupações",
    desc: "Agende serviços de limpeza com profissionais bem avaliados pela comunidade. Mais tempo livre para si, com a casa a brilhar.",
    cta: "Agendar Limpeza",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Mudanças rápidas e seguras",
    desc: "Transporte os seus pertences com o máximo cuidado. Peça orçamentos a transportadores qualificados em poucos cliques.",
    cta: "Pedir Orçamento",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  }
];

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

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <Box>
      <Box position="relative" h={{ base: "85vh", md: "90vh" }} w="100%" overflow="hidden" bg={blue}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            opacity={currentSlide === index ? 1 : 0}
            transition="opacity 0.8s ease-in-out"
            bgImage={`url('${slide.image}')`}
            bgSize="cover"

          >
            {/* Overlay Escuro para destacar o texto */}
            <Box
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bgGradient="linear(to-r, blackAlpha.800 0%, blackAlpha.600 50%, transparent 100%)"
            />

            <Flex
              position="relative"
              h="100%"
              align="center"
              maxW="7xl"
              mx="auto"
              px={{ base: 6, md: 16 }}
              zIndex={2}
            >
              <Box maxW="650px">
                <Heading
                  as="h1"
                  fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                  fontWeight="bold"
                  color={white}
                  lineHeight="1.1"
                  mb={6}
                  transform={currentSlide === index ? "translateY(0)" : "translateY(20px)"}
                  transition="all 0.8s ease-out"
                  transitionDelay="0.2s"
                  opacity={currentSlide === index ? 1 : 0}
                >
                  {slide.title}
                </Heading>

                <Text
                  color="whiteAlpha.900"
                  fontSize={{ base: "lg", md: "xl" }}
                  mb={10}
                  lineHeight="1.6"
                  transform={currentSlide === index ? "translateY(0)" : "translateY(20px)"}
                  transition="all 0.8s ease-out"
                  transitionDelay="0.4s"
                  opacity={currentSlide === index ? 1 : 0}
                >
                  {slide.desc}
                </Text>

                <Button
                  bg={orange}
                  color={white}
                  size="lg"
                  px={8}
                  py={7}
                  fontSize="md"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  borderRadius="md"
                  _hover={{ bg: "#e56b0a", transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.2s"
                  transform={currentSlide === index ? "translateY(0)" : "translateY(20px)"}
                  opacity={currentSlide === index ? 1 : 0}
                >
                  {slide.cta}
                </Button>
              </Box>
            </Flex>
          </Box>
        ))}

        <Flex
          position="absolute"
          w="100%"
          top="50%"
          transform="translateY(-50%)"
          justify="space-between"
          px={{ base: 4, md: 8 }}
          zIndex={3}
          pointerEvents="none"
        >
          <IconButton
            aria-label="Slide anterior"
            onClick={prevSlide}
            bg="blackAlpha.400"
            color="white"
            borderRadius="full"
            w="50px"
            h="50px"
            pointerEvents="auto"
            _hover={{ bg: orange }}
            backdropFilter="blur(4px)"
          >
            <FiChevronLeft size={28} />
          </IconButton>
          <IconButton
            aria-label="Próximo slide"
            onClick={nextSlide}
            bg="blackAlpha.400"
            color="white"
            borderRadius="full"
            w="50px"
            h="50px"
            pointerEvents="auto"
            _hover={{ bg: orange }}
            backdropFilter="blur(4px)">
            <FiChevronRight size={28} />
          </IconButton>
        </Flex>

        {/* Indicadores - Pontos na base */}
        <Flex
          position="absolute"
          bottom={8}
          w="100%"
          justify="center"
          gap={3}
          zIndex={3}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              w={currentSlide === index ? "32px" : "10px"}
              h="10px"
              bg={currentSlide === index ? orange : "whiteAlpha.500"}
              borderRadius="full"
              cursor="pointer"
              transition="all 0.3s ease"
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </Flex>
      </Box>


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
          Das pequenas reparações à grande mudança, temos o profissional certo para si.
        </Text>
      </Box>
    </Box>
  );
}
