import { Box, Grid, Text, Flex, Heading, Button } from "@chakra-ui/react";
import { blue, white } from "@/app/utils/COLORS";
import {
  FiZap,
  FiTool,
  FiEdit3,
  FiPackage,
  FiTruck,
  FiCamera,
  FiSmartphone,
} from "react-icons/fi";
import { GiVacuumCleaner } from "react-icons/gi";


interface ServiceCard {
  Icon: React.ElementType;
  title: string;
  desc: string;
}

const services: ServiceCard[] = [
  {
    Icon: FiZap,
    title: "Eletricistas",
    desc: "Instalações, reparações e manutenção elétrica residencial e comercial.",
  },
  {
    Icon: FiTool,
    title: "Canalizadores",
    desc: "Fugas, desentupimentos e instalações hidráulicas com garantia.",
  },
  {
    Icon: GiVacuumCleaner,
    title: "Empregadas de Limpeza",
    desc: "Limpeza profunda da sua casa com profissionais de confiança.",
  },
  {
    Icon: FiEdit3,
    title: "Pintores",
    desc: "Pintura interior e exterior com acabamento profissional.",
  },
  {
    Icon: FiPackage,
    title: "Montadores",
    desc: "Montagem de móveis, prateleiras e organização de espaços.",
  },
  {
    Icon: FiTruck,
    title: "Mudanças",
    desc: "Transporte e mudanças com equipa qualificada e seguro incluído.",
  },
  {
    Icon: FiCamera,
    title: "Fotógrafos",
    desc: "Sessões fotográficas, eventos e cobertura profissional com equipamento de topo.",
  },
  {
    Icon: FiSmartphone,
    title: "Técnicos de Informática",
    desc: "Assistência técnica, formatação, redes e manutenção de equipamentos.",
  },
];

function Card({ Icon, title, desc }: ServiceCard) {
  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="2xl"
      p={8}
      bg="white"
      transition="box-shadow 0.2s, border-color 0.2s"
      _hover={{ borderColor: blue, boxShadow: "0 4px 24px rgba(28,111,210,0.08)" }}
      cursor="pointer"
    >
      {/* Icon */}
      <Flex
        w="60px"
        h="60px"
        bg="blue.50"
        borderRadius="xl"
        align="center"
        justify="center"
        mb={6}
      >
        <Icon size={26} color={blue} />
      </Flex>

      <Heading as="h3" fontSize="xl" fontWeight="bold" color="gray.800" mb={3}>
        {title}
      </Heading>
      <Text fontSize="sm" color="gray.500" lineHeight="1.7">
        {desc}
      </Text>
    </Box>
  );
}

export default function Services() {
  return (
    <Box bg="white" py={20} px={{ base: 6, md: 16 }}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {services.map((s) => (
          <Card key={s.title} {...s} />
        ))}
      </Grid>

      {/* CTA button */}
      <Flex justify="center" mt={12}>
        <Button
          bg="white"
          color={blue}
          border="2px solid"
          borderColor={blue}
          borderRadius="xl"
          px={8}
          py={6}
          fontWeight="bold"
          fontSize="md"
          display="flex"
          alignItems="center"
          gap={2}
          _hover={{ bg: blue, color: white }}
          transition="all 0.2s"
        >
          Ver todos os serviços →
        </Button>
      </Flex>
    </Box>
  );
}