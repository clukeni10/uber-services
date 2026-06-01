import { Box, Flex, Grid, Heading, Text, } from "@chakra-ui/react";
import Header from "../components/header";
import { blue, white } from "@/app/utils/COLORS";
import type { ServiceCard } from "@/app/types/ServiceCard";
import { FiZap, FiTool, FiCamera, FiEdit3, FiPackage, FiScissors, FiSmartphone, FiTruck } from "react-icons/fi";
import { GiVacuumCleaner } from "react-icons/gi";
import Card from "../components/card";
import { LuLeaf } from "react-icons/lu";

const services: ServiceCard[] = [ 
    {
        Icon: FiZap,
        title: "Electricista",
        desc: "Instalações e reparações elétricas.",
    },
    {
        Icon: FiTool,
        title: "Canalizador",
        desc: "Reparações de canalização e água.",
    },
    {
        Icon: GiVacuumCleaner,
        title: "Diarista",
        desc: "Limpeza e organização do lar.",
    },
    {
        Icon: FiEdit3,
        title: "Pintor",
        desc: "Pintura interior e exterior.",
    },
    {
        Icon: FiPackage,
        title: "Montador",
        desc: "Montagem de móveis e equipamentos.",
    },
    {
        Icon: FiTruck,
        title: "Mudanças",
        desc: "Transporte e mudança de bens.",
    },
    {
        Icon: FiScissors,
        title: "Cabeleireiro",
        desc: "Corte e tratamento de cabelo.",
    },
    {
        Icon: LuLeaf,
        title: "Jardinagem",
        desc: "Manutenção e cuidado de jardins.",
    },
    {
        Icon: FiCamera,
        title: "Fotógrafo",
        desc: "Sessões fotográficas, eventos e cobertura profissional.",
    },
    {
        Icon: FiSmartphone,
        title: "Técnico de Informática",
        desc: "Assistência técnica, formatação, redes e manutenção de equipamentos.",
    },
];

export default function Services() {
    return (
        <Box>
            <Header />
            <Box bg={blue} w="100%" h="30vh" p="8">
                <Flex flexDir="column" justifyContent="center" gap="4">
                    <Heading color={white} fontSize="5xl" fontWeight="bolder">Todos os Serviços</Heading>
                    <Text fontSize="xl">
                        Encontre o profissional ideal para qualquer necessidade do seu dia a dia.
                    </Text>
                </Flex>
            </Box>
            <Box bg="white" py={20} px={{ base: 6, md: 16 }}>
                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                    {services.map((s) => (
                        <Card key={s.title} {...s} />
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}