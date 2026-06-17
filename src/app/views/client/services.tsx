import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Heading,
  Grid,
  Badge,
  Spinner,
  Center,
  Tabs,
  Button,
} from "@chakra-ui/react";
import {
  LuPlug,
  LuWrench,
  LuSparkles,
  LuPaintbrush,
  LuHammer,
  LuTruck,
  LuScissors,
  LuLeaf,
  LuStar,
  LuMapPin,
  LuBadgeCheck,
  LuX,
  LuCalendar,
  LuCreditCard,
  LuBriefcase,
  LuClock,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { blue, white } from "@/app/utils/COLORS";
import { useServicesPage } from "@/app/controllers/useServicePage";
import { useClientServices } from "@/app/controllers/useClientServices";
import type { Worker } from "@/app/types/WorkerType";
import type { Service } from "@/app/types/ServiceType";

const iconMap: Record<string, React.ElementType> = {
  LuPlug,
  LuWrench,
  LuSparkles,
  LuPaintbrush,
  LuHammer,
  LuTruck,
  LuScissors,
  LuLeaf,
};

const categoryColors = [
  { bg: `${blue}15`, color: blue },
  { bg: "#F9731615", color: "#F97316" },
  { bg: "#10B98115", color: "#10B981" },
  { bg: "#8B5CF615", color: "#8B5CF6" },
  { bg: "#EF444415", color: "#EF4444" },
  { bg: "#F59E0B15", color: "#F59E0B" },
  { bg: "#06B6D415", color: "#06B6D4" },
  { bg: "#EC489915", color: "#EC4899" },
];

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  pending: { label: "Pendente", color: "#F59E0B", bg: "#F59E0B15" },
  accepted: { label: "Aceite", color: "#3B82F6", bg: "#3B82F615" },
  active: { label: "Em curso", color: "#8B5CF6", bg: "#8B5CF615" },
  completed: { label: "Concluído", color: "#10B981", bg: "#10B98115" },
  cancelled: { label: "Cancelado", color: "#EF4444", bg: "#EF444415" },
};

export default function ClientServices() {
  const {
    categories,
    workers,
    selectedCategory,
    setSelectedCategory,
    loadingCategories,
    loadingWorkers,
  } = useServicesPage();

  const {
    pending,
    active,
    completed,
    cancelled,
    loading: loadingServices,
    actionLoading,
    handleCancel,
  } = useClientServices();

  const totalPedidos =
    pending.length + active.length + completed.length + cancelled.length;

  return (
    <Box display="flex" minH="100vh" bg="gray.50">
      <Sidebar />

      <Box w="100%" ml="220px">
        {/* Hero */}
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
          <Box maxW="1100px" mx="auto" position="relative">
            <Heading
              color={white}
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              mb={2}
            >
              Serviços
            </Heading>
            <Text color="whiteAlpha.800" fontSize="sm">
              Explore categorias, contrate profissionais e acompanhe os seus
              pedidos.
            </Text>
          </Box>
        </Box>

        <Box maxW="1100px" mx="auto" px="6" py="8">
          <Tabs.Root defaultValue="explorar" variant="enclosed">
            <Tabs.List
              mb="6"
              bg={white}
              borderRadius="xl"
              p="1"
              border="1px solid"
              borderColor="gray.100"
              gap="12px"
            >
              <Tabs.Trigger
                value="explorar"
                borderRadius="lg"
                fontSize="sm"
                fontWeight="semibold"
              >
                <HStack gap="2">
                  <LuBriefcase size={14} />
                  <Text>Explorar</Text>
                </HStack>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="pedidos"
                borderRadius="lg"
                fontSize="sm"
                fontWeight="semibold"
              >
                <HStack gap="2">
                  <LuClock size={14} />
                  <Text>Os meus pedidos</Text>
                  {totalPedidos > 0 && (
                    <Badge
                      bg={`${blue}15`}
                      color={blue}
                      borderRadius="full"
                      fontSize="10px"
                    >
                      {totalPedidos}
                    </Badge>
                  )}
                </HStack>
              </Tabs.Trigger>
            </Tabs.List>

            {/* Tab Explorar */}
            <Tabs.Content value="explorar">
              <Text
                fontWeight="extrabold"
                fontSize="lg"
                color="gray.800"
                mb="4"
              >
                Categorias
              </Text>

              {loadingCategories ? (
                <Center h="120px">
                  <Spinner color={blue} />
                </Center>
              ) : (
                <Grid
                  templateColumns={{
                    base: "repeat(2,1fr)",
                    sm: "repeat(4,1fr)",
                    lg: "repeat(8,1fr)",
                  }}
                  gap="3"
                  mb="8"
                >
                  {categories.map((c, i) => {
                    const Icon = iconMap[c.icon] ?? LuWrench;
                    const palette = categoryColors[i % categoryColors.length];
                    const isSelected = selectedCategory === c.name;
                    return (
                      <Box
                        key={c.id}
                        bg={isSelected ? palette.color : white}
                        borderRadius="2xl"
                        border="1.5px solid"
                        borderColor={isSelected ? palette.color : "gray.100"}
                        p="4"
                        cursor="pointer"
                        transition="all 0.2s ease"
                        shadow={isSelected ? "md" : "sm"}
                        _hover={{
                          borderColor: palette.color,
                          transform: "translateY(-2px)",
                          shadow: "md",
                        }}
                        onClick={() =>
                          setSelectedCategory(isSelected ? null : c.name)
                        }
                        textAlign="center"
                      >
                        <Flex
                          w="40px"
                          h="40px"
                          borderRadius="xl"
                          mx="auto"
                          mb="2"
                          bg={isSelected ? "whiteAlpha.300" : palette.bg}
                          color={isSelected ? white : palette.color}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon size={18} />
                        </Flex>
                        <Text
                          fontSize="xs"
                          fontWeight="bold"
                          color={isSelected ? white : "gray.700"}
                        >
                          {c.name}
                        </Text>
                        <Text
                          fontSize="10px"
                          color={isSelected ? "whiteAlpha.800" : "gray.400"}
                          mt="0.5"
                        >
                          {c.description}
                        </Text>
                        <Text
                          fontSize="10px"
                          color={isSelected ? "whiteAlpha.800" : "gray.400"}
                          mt="0.5"
                        >
                          {c.worker_count} disponíveis
                        </Text>
                      </Box>
                    );
                  })}
                </Grid>
              )}

              <HStack justify="space-between" mb="4">
                <VStack align="flex-start" gap="0">
                  <Text fontWeight="extrabold" fontSize="lg" color="gray.800">
                    {selectedCategory
                      ? `Profissionais — ${selectedCategory}`
                      : "Top Profissionais"}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    {selectedCategory
                      ? `Workers disponíveis em ${selectedCategory}`
                      : "Os mais bem avaliados da plataforma"}
                  </Text>
                </VStack>
                {selectedCategory && (
                  <HStack
                    gap="1.5"
                    px="3"
                    py="1.5"
                    borderRadius="full"
                    bg="gray.100"
                    cursor="pointer"
                    _hover={{ bg: "gray.200" }}
                    onClick={() => setSelectedCategory(null)}
                  >
                    <Text fontSize="xs" color="gray.600" fontWeight="medium">
                      Limpar filtro
                    </Text>
                    <LuX size={12} color="gray" />
                  </HStack>
                )}
              </HStack>

              {loadingWorkers ? (
                <Center h="200px">
                  <Spinner color={blue} size="xl" />
                </Center>
              ) : workers.length === 0 ? (
                <Center h="200px">
                  <VStack>
                    <Text color="gray.400" fontWeight="medium">
                      Nenhum profissional disponível
                    </Text>
                    <Text color="gray.300" fontSize="sm">
                      Tente outra categoria
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
            </Tabs.Content>

            {/* Tab Os meus pedidos */}
            <Tabs.Content value="pedidos">
              {loadingServices ? (
                <Center h="200px">
                  <Spinner color={blue} size="xl" />
                </Center>
              ) : totalPedidos === 0 ? (
                <Center h="200px">
                  <VStack>
                    <Text color="gray.400" fontWeight="medium">
                      Ainda não tens pedidos
                    </Text>
                    <Text color="gray.300" fontSize="sm">
                      Explora as categorias e contrata um profissional
                    </Text>
                  </VStack>
                </Center>
              ) : (
                <VStack gap="6" align="stretch">
                  {/* Pendentes */}
                  {pending.length > 0 && (
                    <ServiceSection
                      title="Pendentes"
                      services={pending}
                      renderActions={(s) => (
                        <Button
                          size="sm"
                          variant="outline"
                          borderRadius="lg"
                          borderColor="red.200"
                          color="red.500"
                          _hover={{ bg: "red.50" }}
                          loading={actionLoading === s.id}
                          onClick={() => handleCancel(s.id)}
                        >
                          Cancelar
                        </Button>
                      )}
                    />
                  )}

                  {/* Ativos */}
                  {active.length > 0 && (
                    <ServiceSection title="Em curso" services={active} />
                  )}

                  {/* Concluídos */}
                  {completed.length > 0 && (
                    <ServiceSection title="Concluídos" services={completed} />
                  )}

                  {/* Cancelados */}
                  {cancelled.length > 0 && (
                    <ServiceSection title="Cancelados" services={cancelled} />
                  )}
                </VStack>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </Box>
  );
}

function ServiceSection({
  title,
  services,
  renderActions,
}: {
  title: string;
  services: Service[];
  renderActions?: (s: Service) => React.ReactNode;
}) {
  return (
    <Box>
      <Text fontWeight="bold" fontSize="md" color="gray.700" mb="3">
        {title}
      </Text>
      <VStack gap="3" align="stretch">
        {services.map((s) => (
          <ClientServiceCard
            key={s.id}
            service={s}
            renderActions={renderActions}
          />
        ))}
      </VStack>
    </Box>
  );
}

function ClientServiceCard({
  service: s,
  renderActions,
}: {
  service: Service;
  renderActions?: (s: Service) => React.ReactNode;
}) {
  const config = statusConfig[s.status];

  return (
    <Box
      bg={white}
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.100"
      p="5"
      shadow="sm"
      transition="all 0.2s"
      _hover={{ shadow: "md", borderColor: "gray.200" }}
    >
      <HStack justify="space-between" align="flex-start" mb="3">
        <HStack gap="3">
          {(s as any).worker_image ? (
            <Box
              w="44px"
              h="44px"
              borderRadius="full"
              overflow="hidden"
              flexShrink={0}
            >
              <img
                src={(s as any).worker_image}
                alt={(s as any).worker_name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ) : (
            <Flex
              w="44px"
              h="44px"
              borderRadius="full"
              flexShrink={0}
              bg={`${blue}15`}
              color={blue}
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              fontSize="md"
            >
              {(s as any).worker_name?.charAt(0).toUpperCase()}
            </Flex>
          )}
          <VStack align="flex-start" gap="0">
            <Text fontWeight="bold" fontSize="sm" color="gray.800">
              {(s as any).worker_name}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {(s as any).specialty ?? "—"}
            </Text>
          </VStack>
        </HStack>

        <Badge
          bg={config.bg}
          color={config.color}
          borderRadius="full"
          px="3"
          py="1"
          fontSize="xs"
        >
          {config.label}
        </Badge>
      </HStack>

      <Box bg="gray.50" borderRadius="xl" px="4" py="3" mb="3">
        <Text fontSize="sm" color="gray.700">
          {s.description}
        </Text>
      </Box>

      <HStack gap="4" justify="space-between" flexWrap="wrap">
        <HStack gap="1.5" color="gray.500">
          <LuCalendar size={13} />
          <Text fontSize="xs">
            {s.scheduled_at
              ? new Date(s.scheduled_at).toLocaleString("pt-PT", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"}
          </Text>
        </HStack>
        <HStack gap="1.5">
          <LuCreditCard size={13} color={blue} />
          <Text fontSize="xs" fontWeight="bold" color={blue}>
            {s.amount ? `${parseFloat(String(s.amount)).toFixed(2)} Kz` : "—"}
          </Text>
        </HStack>

        {renderActions && renderActions(s)}
      </HStack>
    </Box>
  );
}

function WorkerCard({ worker }: { worker: Worker }) {
  const navigate = useNavigate();
  return (
    <Box
      bg={white}
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.100"
      p="5"
      shadow="sm"
      transition="all 0.2s ease"
      cursor="pointer"
      _hover={{
        transform: "translateY(-3px)",
        shadow: "md",
        borderColor: blue,
      }}
      onClick={() => navigate(`/client/workers/${worker.id}`)}
    >
      <HStack gap="3" align="flex-start">
        {worker.image ? (
          <Box
            w="52px"
            h="52px"
            borderRadius="full"
            border="2px solid"
            borderColor={blue}
            flexShrink={0}
            overflow="hidden"
          >
            <img
              src={worker.image}
              alt={worker.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ) : (
          <Flex
            w="52px"
            h="52px"
            borderRadius="full"
            flexShrink={0}
            bg={blue}
            color={white}
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            fontSize="lg"
          >
            {worker.name?.charAt(0).toUpperCase()}
          </Flex>
        )}
        <VStack align="flex-start" gap="0.5" flex="1" minW="0">
          <HStack gap="1">
            <Text fontWeight="bold" fontSize="sm" color="gray.800">
              {worker.name}
            </Text>
            <LuBadgeCheck size={14} color={blue} />
          </HStack>
          <Text fontSize="xs" color="gray.500">
            {worker.specialty ?? "Sem especialidade"}
          </Text>
          <HStack gap="1" color="gray.400">
            <LuMapPin size={11} />
            <Text fontSize="xs">{worker.address ?? "Sem localização"}</Text>
          </HStack>
        </VStack>
      </HStack>

      <HStack
        justify="space-between"
        mt="4"
        pt="3"
        borderTop="1px solid"
        borderColor="gray.100"
      >
        <HStack gap="1">
          <LuStar size={13} color="#F59E0B" fill="#F59E0B" />
          <Text fontSize="sm" fontWeight="bold">
            {worker.rating_avg ? worker.rating_avg.toFixed(1) : "—"}
          </Text>
        </HStack>
        <Text fontSize="sm" fontWeight="bold" color={blue}>
          {worker.hourly_rate
            ? `${worker.hourly_rate.toFixed(2)} Kz/h`
            : "Preço a combinar"}
        </Text>
      </HStack>

      <Badge
        mt="3"
        w="full"
        textAlign="center"
        borderRadius="lg"
        py="1"
        bg={worker.is_available ? "#10B98115" : "gray.100"}
        color={worker.is_available ? "#10B981" : "gray.400"}
        fontSize="xs"
      >
        {worker.is_available ? "Disponível" : "Indisponível"}
      </Badge>
    </Box>
  );
}
