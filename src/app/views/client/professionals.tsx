import { Box, Heading, Text, Input, InputGroup, Flex, Grid, HStack, VStack, Badge, Spinner, Center } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import Filters from "../components/filters";
import { blue, white } from "@/app/utils/COLORS";
import { LuSearch, LuMapPin, LuStar, LuBadgeCheck } from "react-icons/lu";
import { useState } from "react";
import { useWorkers } from "@/app/controllers/useWorkers";
import { useNavigate } from "react-router-dom";

{/* Devo editar isso para separar componentes, por enquanto fica assim pq está a funcionar mas vai ser modificado */} 
export default function ClientProfessionals() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [city, setCity] = useState("");

    const { workers, loading } = useWorkers({ search, category, city });

    return (
        <Box display="flex" minH="100vh" bg="gray.50">
            <Sidebar />

            <Box w="100%" ml="220px">

                <Box bg={blue} w="100%" px={{ base: 4, md: 10 }} py={10} position="relative" overflow="hidden">
                  
                    <Box
                        position="absolute" inset="0" opacity={0.08}
                        backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
                        backgroundSize="32px 32px"
                    />
                    <Box w="100%" maxW="1000px" mx="auto" position="relative">
                        <Heading color={white} fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" mb={2}>
                            Explorar Profissionais
                        </Heading>
                        <Text color="whiteAlpha.800" fontSize="sm" mb={6}>
                            Filtre por categoria, cidade ou nome — e contrate em minutos.
                        </Text>

                        <Box bg={white} borderRadius="2xl" p="3" display="flex" flexDir={{ base: "column", md: "row" }} gap="3">
                            <InputGroup flex="1" startElement={<LuSearch size={16} color="gray" />}>
                                <Input
                                    placeholder="Pesquisar profissionais..."
                                    border="none" bg="gray.50" borderRadius="xl"
                                    value={search} onChange={(e) => setSearch(e.target.value)}
                                    fontSize="sm"
                                />
                            </InputGroup>
                            <Filters
                                onCategoryChange={setCategory}
                                onCityChange={setCity}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box maxW="1100px" mx="auto" px="6" py="8">
                    {loading ? (
                        <Center h="200px">
                            <Spinner color={blue} size="xl" />
                        </Center>
                    ) : workers.length === 0 ? (
                        <Center h="200px">
                            <VStack>
                                <Text color="gray.400" fontWeight="medium">Nenhum profissional encontrado</Text>
                                <Text color="gray.300" fontSize="sm">Tente ajustar os filtros</Text>
                            </VStack>
                        </Center>
                    ) : (
                        <Grid templateColumns={{ base: "1fr", sm: "repeat(2,1fr)", lg: "repeat(3,1fr)" }} gap="5">
                            {workers.map((w) => (
                                <WorkerCard key={w.id} worker={w} />
                            ))}
                        </Grid>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

function WorkerCard({ worker }: { worker: any }) {
    const navigate = useNavigate();
    return (
        <Box
            bg={white} borderRadius="2xl" border="1px solid" borderColor="gray.100"
            p="5" shadow="sm" transition="all 0.2s ease"
            _hover={{ transform: "translateY(-3px)", shadow: "md", borderColor: blue, cursor: "pointer" }}
            onClick={() => navigate(`/client/workers/${worker.id}`)}
        >
            <HStack gap="3" align="flex-start">
                <Flex
                    w="52px" h="52px" borderRadius="full" flexShrink={0}
                    bg={blue} color={white}
                    alignItems="center" justifyContent="center"
                    fontWeight="bold" fontSize="lg"
                >
                    {worker?.image ? (
                        <Box
                            w="72px" h="72px" rounded="full"
                            overflow="hidden"
                            border="4px solid" borderColor={white}
                            shadow="md" flexShrink={0}
                            position="relative"
                        >
                            <img
                                src={worker.image}
                                alt={worker.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </Box>
                    ) : (
                        <Flex
                            bg={blue} w="72px" h="72px" rounded="full"
                            alignItems="center" justifyContent="center"
                            color={white} fontSize="2xl" fontWeight="bold"
                            border="4px solid" borderColor={white}
                            shadow="md" flexShrink={0}
                        >
                            {worker?.name?.charAt(0).toUpperCase() ?? "?"}
                        </Flex>
                    )}
                </Flex>
                <VStack align="flex-start" gap="0.5" flex="1" minW="0">
                    <HStack gap="1">
                        <Text fontWeight="bold" fontSize="sm" color="gray.800" >{worker.name}</Text>
                        <LuBadgeCheck size={14} color={blue} />
                    </HStack>
                    <Text fontSize="xs" color="gray.500">{worker.specialty ?? "Sem especialidade"}</Text>
                    <HStack gap="1" color="gray.400">
                        <LuMapPin size={11} />
                        <Text fontSize="xs">{worker.address ?? "Sem localização"}</Text>
                    </HStack>
                </VStack>
            </HStack>

            {/* Rating + preço */}
            <HStack justify="space-between" mt="4" pt="3" borderTop="1px solid" borderColor="gray.100">
                <HStack gap="1">
                    <LuStar size={13} color="#F59E0B" fill="#F59E0B" />
                    <Text fontSize="sm" fontWeight="bold">
                        {worker.rating_avg ? parseFloat(worker.rating_avg).toFixed(1) : "—"}
                    </Text>
                </HStack>
                <Text fontSize="sm" fontWeight="bold" color={blue}>
                    {worker.hourly_rate ? `$${parseFloat(worker.hourly_rate).toFixed(2)}/h` : "Preço a combinar"}
                </Text>
            </HStack>

            <Badge
                mt="3" w="full" textAlign="center" borderRadius="lg" py="1"
                bg={worker.is_available ? "#10B98115" : "gray.100"}
                color={worker.is_available ? "#10B981" : "gray.400"}
                fontSize="xs"
            >
                {worker.is_available ? "Disponível" : "Indisponível"}
            </Badge>
        </Box>
    );
}