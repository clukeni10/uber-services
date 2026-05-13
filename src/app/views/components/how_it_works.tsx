import { Box, Grid, Text, Flex, Heading } from "@chakra-ui/react";
import { blue, orange, white } from "@/app/utils/COLORS";
import { FiSearch, FiCalendar, FiThumbsUp } from "react-icons/fi";

interface Step {
  num: string;
  label: string;
  Icon: React.ElementType;
  title: string;
  desc: string;
  highlighted?: boolean;
}

const steps: Step[] = [
  {
    num: "01",
    label: "PASSO 01",
    Icon: FiSearch,
    title: "Busque o serviço",
    desc: "Escolha entre dezenas de categorias profissionais.",
  },
  {
    num: "02",
    label: "PASSO 02",
    Icon: FiCalendar,
    title: "Agende com facilidade",
    desc: "Compare preços e marque no horário que preferir.",
  },
  {
    num: "03",
    label: "PASSO 03",
    Icon: FiThumbsUp,
    title: "Avalie a experiência",
    desc: "Ajude a comunidade a manter o padrão de qualidade.",
    highlighted: true,
  },
];

export default function HowItWorks() {
  return (
    <Box bg="gray.50" py={20} px={{ base: 6, md: 16 }}>
      {/* Section header */}
      <Box textAlign="center" mb={14}>
        <Text
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="widest"
          color={orange}
          mb={3}
          textTransform="uppercase"
        >
          SIMPLES E SEGURO
        </Text>
        <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" color="gray.900">
          Como funciona
        </Heading>
      </Box>

      {/* Steps grid */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {steps.map(({ num, label, Icon, title, desc, highlighted }) => (
          <Box
            key={num}
            position="relative"
            border={highlighted ? "2px solid" : "1px solid"}
            borderColor={highlighted ? orange : "gray.200"}
            borderRadius="2xl"
            p={8}
            bg="white"
            overflow="hidden"
            _after={
              highlighted
                ? {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "100px",
                    bgGradient: "linear(to-t, orange.50, transparent)",
                    pointerEvents: "none",
                  }
                : undefined
            }
          >
            {/* Large background number */}
            <Text
              position="absolute"
              top={3}
              right={5}
              fontSize="7xl"
              fontWeight="extrabold"
              color={highlighted ? "orange.100" : "gray.100"}
              lineHeight="1"
              userSelect="none"
              zIndex={0}
            >
              {num}
            </Text>

            {/* Icon */}
            <Flex
              w="60px"
              h="60px"
              bg={highlighted ? orange : blue}
              borderRadius="xl"
              align="center"
              justify="center"
              mb={6}
              position="relative"
              zIndex={1}
            >
              <Icon size={26} color={white} />
            </Flex>

            {/* Label */}
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              color={highlighted ? orange : blue}
              mb={2}
              position="relative"
              zIndex={1}
            >
              {label}
            </Text>

            {/* Title */}
            <Heading
              as="h3"
              fontSize="xl"
              fontWeight="bold"
              color="gray.800"
              mb={3}
              position="relative"
              zIndex={1}
            >
              {title}
            </Heading>

            {/* Description */}
            <Text fontSize="sm" color="gray.500" lineHeight="1.7" position="relative" zIndex={1}>
              {desc}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}