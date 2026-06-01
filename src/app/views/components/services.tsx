import { Box, Grid, Flex, Button } from "@chakra-ui/react";
import { blue, white } from "@/app/utils/COLORS";
import {
  FiZap,
  FiTool,
} from "react-icons/fi";
import { GiVacuumCleaner } from "react-icons/gi";
import { Link } from "react-router-dom";
import type { ServiceCard } from "@/app/types/ServiceCard";
import Card from "./card";



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
];




export default function Services() {
  return (
    <Box bg="white" py={20} px={{ base: 6, md: 16 }}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {services.map((s) => (
          <Card key={s.title} {...s} />
        ))}
      </Grid>


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
          <Link to="/services">
            Ver todos os serviços →
          </Link>
        </Button>
      </Flex>
    </Box>
  );
}