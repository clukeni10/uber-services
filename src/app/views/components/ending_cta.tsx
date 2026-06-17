import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { blue, highlights, highlights_hover, white } from "@/app/utils/COLORS";
import { FiCheckCircle, FiZap } from "react-icons/fi";

const trustItems = [
  "Sem cadastro",
  "Resposta em minutos",
  "100% verificado",
];

export default function CTAFinal() {
  return (
    <Box bg={blue} py={24} px={{ base: 6, md: 16 }} textAlign="center">
      {/* Badge */}
      <Flex
        display="inline-flex"
        align="center"
        gap={2}
        bg="rgba(255,255,255,0.15)"
        color={white}
        borderRadius="full"
        px={5}
        py={2}
        fontSize="xs"
        fontWeight="bold"
        letterSpacing="wider"
        mb={8}
        border="1px solid"
        borderColor="rgba(255,255,255,0.3)"
      >
        <FiZap size={13} />
        COMECE AGORA · É GRÁTIS
      </Flex>

      {/* Headline */}
      <Heading
        as="h2"
        fontSize={{ base: "3xl", md: "6xl" }}
        fontWeight="extrabold"
        color={white}
        lineHeight="1.1"
        mb={4}
        maxW="800px"
        mx="auto"
      >
        Encontre o profissional ideal{" "}
        <Box as="span" color={highlights}>
          em poucos minutos
        </Box>
      </Heading>

      {/* Sub-copy */}
      <Text
        color="whiteAlpha.800"
        fontSize={{ base: "md", md: "lg" }}
        maxW="560px"
        mx="auto"
        lineHeight="1.7"
        mb={12}
      >
        Mais de 10 mil especialistas verificados prontos para atender. Sem cadastro, sem taxas
        escondidas. Apenas serviço de qualidade.
      </Text>

      {/* Buttons */}
      <Flex justify="center" gap={4} flexWrap="wrap" mb={8}>
        <Box
          as="button"
          bg={highlights}
          color={white}
          borderRadius="xl"
          px={10}
          py={5}
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="wider"
          _hover={{ bg: highlights_hover}}
          transition="background 0.2s"
        >
          SOLICITAR ORÇAMENTO AGORA
        </Box>

        <Box
          as="button"
          bg="rgba(255,255,255,0.1)"
          color={white}
          borderRadius="xl"
          px={10}
          py={5}
          fontWeight="semibold"
          fontSize="sm"
          border="1px solid"
          borderColor="rgba(255,255,255,0.3)"
          _hover={{ bg: "rgba(255,255,255,0.2)" }}
          transition="background 0.2s"
        >
          Como funciona
        </Box>
      </Flex>

      {/* Trust items */}
      <Flex justify="center" gap={8} flexWrap="wrap">
        {trustItems.map((item) => (
          <Flex key={item} align="center" gap={2} color="whiteAlpha.800">
            <FiCheckCircle size={16} />
            <Text fontSize="sm">{item}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}