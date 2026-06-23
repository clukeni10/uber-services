import {
  Box,
  Heading,
  Text,
  Input,
  InputGroup,
  Grid,
  VStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import Filters from "../components/filters";
import { blue, white } from "@/app/utils/COLORS";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import { useWorkers } from "@/app/controllers/useWorkers";
import WorkerCard from "../components/worker_card";
import { useSidebar } from "@/app/context/SidebarContext";
import MobileMenuButton from "../components/mobile_menu_button";


{
  /* Devo editar isso para separar componentes, por enquanto fica assim pq está a funcionar mas vai ser modificado */
}
export default function ClientWorkers() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const { sidebarW } = useSidebar();
  const { workers, loading } = useWorkers({ search, category, city });

  return (
    <Box display="flex" minH="100vh" bg="gray.50">
      <Sidebar />
      <MobileMenuButton /> 

      <Box
        w="100%"
        flex="1"
        ml={{ base: "0", md: sidebarW }}
        transition="margin 0.25s ease"
      >
        <Box
          bg={blue}
          w="100%"
          px={{ base: 4, md: 10 }}
          py={10}
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            inset="0"
            opacity={0.08}
            backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
            backgroundSize="32px 32px"
          />
          <Box w="100%" maxW="1000px" mx="auto" position="relative">
            <Heading
              color={white}
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              mb={2}
            >
              Explorar Profissionais
            </Heading>
            <Text color="whiteAlpha.800" fontSize="sm" mb={6}>
              Filtre por categoria, cidade ou nome — e contrate em minutos.
            </Text>

            <Box
              bg={white}
              borderRadius="2xl"
              p="3"
              display="flex"
              flexDir={{ base: "column", md: "row" }}
              gap="3"
            >
              <InputGroup
                flex="1"
                startElement={<LuSearch size={16} color="gray" />}
              >
                <Input
                  placeholder="Pesquisar profissionais..."
                  border="none"
                  bg="gray.50"
                  borderRadius="xl"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  fontSize="sm"
                />
              </InputGroup>
              <Filters onCategoryChange={setCategory} onCityChange={setCity} />
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
                <Text color="gray.400" fontWeight="medium">
                  Nenhum profissional encontrado
                </Text>
                <Text color="gray.300" fontSize="sm">
                  Tente ajustar os filtros
                </Text>
              </VStack>
            </Center>
          ) : (
            <Grid
              templateColumns={{
                base: "1fr",
                sm: "repeat(2,1fr)",
                lg: "repeat(3,1fr)",
              }}
              gap="5"
            >
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
