import { Box, Grid, GridItem, Text, Flex, Heading, Button } from "@chakra-ui/react";
import { blue, highlights_hover, highlights, white } from "@/app/utils/COLORS";
import {
  FiTrendingUp,
  FiCreditCard,
  FiCalendar,
  FiHeadphones,
  FiCheckCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const perks = [
  {
    Icon: FiTrendingUp,
    title: "Mais visibilidade",
    desc: "Apareça para milhares de clientes que procuram os seus serviços todos os dias.",
  },
  {
    Icon: FiCreditCard,
    title: "Pagamento garantido",
    desc: "Receba com segurança após a conclusão. Sem incumprimentos, sem surpresas.",
  },
  {
    Icon: FiCalendar,
    title: "Agenda sob controlo",
    desc: "Define horários, área de atendimento e preços dos seus serviços.",
  },
  {
    Icon: FiHeadphones,
    title: "Apoio dedicado",
    desc: "Equipa pronta para ajudar em cada etapa, do registo ao primeiro trabalho.",
  },
];

export default function ForProfessionals() {
  return (
    <Box bg="white" py={20} px={{ base: 6, md: 16 }}>
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={16}
        alignItems="center"
      >

        <GridItem>

          <Flex
            display="inline-flex"
            align="center"
            gap={2}
            bg="highlights.50"
            color={highlights}
            borderRadius="full"
            px={4}
            py={1.5}
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="wide"
            mb={6}
          >
            <FiTrendingUp size={13} />
            PARA PROFISSIONAIS
          </Flex>

          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color="gray.900"
            mb={2}
            lineHeight="1.2"
          >
            É profissional?
          </Heading>
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color={highlights}
            mb={6}
            lineHeight="1.2"
          >
            Multiplique os seus clientes
          </Heading>

          <Text color="gray.600" fontSize="md" lineHeight="1.8" mb={10}>
            Faça parte da maior plataforma de serviços verificados do país.
            Registe-se gratuitamente e receba propostas no seu telemóvel em
            poucos minutos.
          </Text>


          <Grid templateColumns="1fr 1fr" gap={6} mb={10}>
            {perks.map(({ Icon, title, desc }) => (
              <Flex key={title} gap={3} align="flex-start">
                <Flex
                  w="40px"
                  h="40px"
                  bg="blue.50"
                  borderRadius="lg"
                  align="center"
                  justify="center"
                  flexShrink={0}
                  mt={0.5}
                >
                  <Icon size={18} color={blue} />
                </Flex>
                <Box>
                  <Text fontWeight="bold" fontSize="sm" color="gray.800" mb={1}>
                    {title}
                  </Text>
                  <Text fontSize="xs" color="gray.500" lineHeight="1.6">
                    {desc}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Grid>


          <Flex align="center" gap={4} flexWrap="wrap">
            <Button
              bg={highlights}
              color={white}
              borderRadius="xl"
              px={8}
              py={6}
              fontWeight="bold"
              fontSize="sm"
              letterSpacing="wider"
              _hover={{ bg: highlights_hover }}
              transition="background 0.2s"
            >
              <Link to="/register">
                REGISTE-SE GRATUITAMENTE
              </Link>

            </Button>
            <Flex align="center" gap={2} color="green.500">
              <FiCheckCircle size={16} />
              <Text fontSize="sm" fontWeight="medium">
                Sem mensalidade
              </Text>
            </Flex>
          </Flex>
        </GridItem>

        <GridItem position="relative">

          <Box
            border="1px solid"
            borderColor="gray.200"
            borderRadius="2xl"
            overflow="hidden"
            bg="white"
            shadow="xl"
          >

            <Flex
              align="center"
              justify="space-between"
              p={6}
              borderBottom="1px solid"
              borderColor="gray.100"
            >
              <Flex align="center" gap={3}>
                <Flex
                  w="50px"
                  h="50px"
                  bg={highlights}
                  borderRadius="xl"
                  align="center"
                  justify="center"
                  color={white}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  JM
                </Flex>
                <Box>
                  <Text fontWeight="bold" color="gray.800">
                    João Mendes
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Eletricista · Luanda
                  </Text>
                </Box>
              </Flex>
              <Flex align="center" gap={1}>
                <Box w="8px" h="8px" borderRadius="full" bg="green.400" />
                <Text fontSize="sm" color="green.500" fontWeight="medium">
                  Online
                </Text>
              </Flex>
            </Flex>


            <Box>

              <Flex
                justify="space-between"
                align="center"
                px={6}
                py={4}
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                <Box>
                  <Text fontSize="xs" color="gray.400" mb={0.5}>
                    Pedidos este mês
                  </Text>
                  <Text fontWeight="bold" fontSize="xl" color="gray.800">
                    38
                  </Text>
                </Box>
                <Box
                  bg="green.50"
                  color="green.600"
                  borderRadius="lg"
                  px={3}
                  py={1}
                  fontSize="sm"
                  fontWeight="bold"
                >
                  +24%
                </Box>
              </Flex>


              <Flex
                justify="space-between"
                align="center"
                px={6}
                py={4}
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                <Box>
                  <Text fontSize="xs" color="gray.400" mb={0.5}>
                    Receita gerada
                  </Text>
                  <Text fontWeight="bold" fontSize="xl" color="gray.800">
                    4.820.000 Kz
                  </Text>
                </Box>
                <Box
                  bg="green.50"
                  color="green.600"
                  borderRadius="lg"
                  px={3}
                  py={1}
                  fontSize="sm"
                  fontWeight="bold"
                >
                  +18%
                </Box>
              </Flex>


              <Flex
                justify="space-between"
                align="center"
                px={6}
                py={4}
                borderBottom="1px solid"
                borderColor="gray.100"
              >
                <Box>
                  <Text fontSize="xs" color="gray.400" mb={0.5}>
                    Avaliação média
                  </Text>
                  <Flex align="center" gap={1}>
                    <Text fontWeight="bold" fontSize="xl" color="gray.800">
                      4.9
                    </Text>
                    <Text color={highlights}>★</Text>
                  </Flex>
                </Box>
                <Box
                  bg="blue.50"
                  color={blue}
                  borderRadius="lg"
                  px={3}
                  py={1}
                  fontSize="sm"
                  fontWeight="bold"
                >
                  124 avaliações
                </Box>
              </Flex>


              <Box px={6} py={4}>
                <Text
                  fontSize="xs"
                  color="gray.400"
                  mb={1}
                  letterSpacing="wide"
                  fontWeight="semibold"
                >
                  PRÓXIMO SERVIÇO
                </Text>
                <Text fontWeight="bold" color="gray.800" fontSize="sm">
                  Instalação de chuveiro · Hoje às 14h
                </Text>
                <Text fontSize="xs" color="gray.400" mt={0.5}>
                  Talatona, Luanda · 180.000 Kz
                </Text>
              </Box>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}