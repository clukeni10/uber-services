"use client";

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
  LuZap,
  LuWrench,
  LuSparkles,
  LuPaintbrush,
  LuHammer,
  LuTruck,
  LuScissors,
  LuLeaf,
  LuX,
  LuBriefcase,
  LuClock,
  LuCamera,
  LuSmartphone,
} from "react-icons/lu";
import Sidebar from "../components/sidebar";
import { blue, white } from "@/app/utils/COLORS";
import { useServicesPage } from "@/app/controllers/useServicePage";
import { useClientServices } from "@/app/controllers/useClientServices";
import type { Service } from "@/app/types/ServiceType";
import { useSidebar } from "@/app/context/SidebarContext";
import MobileMenuButton from "../components/mobile_menu_button";
import PaymentModal from "../components/payment_modal";
import WorkerCard from "../components/worker_card2";
import ClientServiceCard from "../components/client_service_card";
import { useState } from "react";
import { usePageTitle } from "@/app/hooks/usePageTitle";

// 1. Mapeamento robusto que aceita tanto "LuPlug" como "plug" ou "LuPlug" vindo da API
const iconMap: Record<string, React.ElementType> = {
  LuZap,
  plug: LuZap,
  LuWrench,
  wrench: LuWrench,
  LuSparkles,
  sparkles: LuSparkles,
  LuPaintbrush,
  paintbrush: LuPaintbrush,
  LuHammer,
  hammer: LuHammer,
  LuTruck,
  truck: LuTruck,
  LuScissors,
  scissors: LuScissors,
  LuLeaf,
  leaf: LuLeaf,
  LuCamera,
  camera: LuCamera,
  LuSmartphone,
  phone: LuSmartphone,
};

const categoryColors = [
  { bg: "blue.50", color: blue },
  { bg: "orange.50", color: "#F97316" },
  { bg: "emerald.50", color: "#10B981" },
  { bg: "purple.50", color: "#8B5CF6" },
  { bg: "red.50", color: "#EF4444" },
  { bg: "amber.50", color: "#F59E0B" },
  { bg: "cyan.50", color: "#06B6D4" },
  { bg: "pink.50", color: "#EC4899" },
];

export default function ClientServices() {
  usePageTitle("Explorar Serviços | Workê");

  const {
    categories = [], // Evita erros se o retorno inicial for undefined
    workers = [],
    selectedCategory,
    setSelectedCategory,
    loadingCategories,
    loadingWorkers,
  } = useServicesPage();

  const {
    pending = [],
    active = [],
    completed = [],
    cancelled = [],
    loading: loadingServices,
    actionLoading,
    handleCancel,
  } = useClientServices();

  const totalPedidos =
    pending.length + active.length + completed.length + cancelled.length;

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    id: number;
    amount: number;
    workerId: number;
    workerName: string;
  } | null>(null);
  const { refetch } = useClientServices();

  function openPaymentModal(
    id: number,
    amount: number,
    workerId: number,
    workerName: string,
  ) {
    setSelectedService({ id, amount, workerId, workerName });
    setPaymentOpen(true);
  }
  const { sidebarW } = useSidebar();

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
                <HStack gap="2" p="4">
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
                <HStack gap="2" p="4">
                  <LuClock size={14} />
                  <Text>Os meus pedidos</Text>
                  {totalPedidos > 0 && (
                    <Badge
                      bg="blue.50"
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
              ) : categories.length === 0 ? (
                /* Caso a API retorne uma lista vazia, mostra um aviso em vez de uma tela em branco */
                <Center h="120px">
                  <Text color="gray.400" fontSize="sm">
                    Nenhuma categoria encontrada.
                  </Text>
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
                    // Sanitização da string do ícone para evitar quebras se vier em lowercase
                    const iconKey = c.icon ? c.icon.trim() : "";
                    const Icon =
                      iconMap[iconKey] ??
                      iconMap[iconKey.toLowerCase()] ??
                      LuWrench;
                    const palette = categoryColors[i % categoryColors.length];
                    const isSelected = selectedCategory === c.name;

                    return (
                      <Box
                        key={c.id ?? i}
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
                        {c.description && (
                          <Text
                            fontSize="10px"
                            color={isSelected ? "whiteAlpha.800" : "gray.400"}
                            mt="0.5"
                          >
                            {c.description}
                          </Text>
                        )}
                        <Text
                          fontSize="10px"
                          color={isSelected ? "whiteAlpha.800" : "gray.400"}
                          mt="0.5"
                        >
                          {c.worker_count ?? 0} disponíveis
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

                  {active.length > 0 && (
                    <ServiceSection title="Em curso" services={active} />
                  )}

                  {completed.length > 0 && (
                    <ServiceSection
                      title="Concluídos"
                      services={completed}
                      renderActions={(
                        s: any, // Adicionado : any aqui para resolver o ts(7006)
                      ) =>
                        (s as any).payment_status === "pending" ? (
                          <Button
                            size="sm"
                            bg={blue}
                            p="4"
                            color={white}
                            borderRadius="lg"
                            onClick={() =>
                              openPaymentModal(
                                s.id,
                                Number((s as any).amount ?? 0),
                                (s as any).worker_name ?? "",
                                (s as any).worker_id ?? 0,
                              )
                            }
                          >
                            Pagar
                          </Button>
                        ) : (
                          <Badge
                            bg="emerald.50"
                            color="#10B981"
                            borderRadius="full"
                            px="2"
                            fontSize="10px"
                          >
                            Pago
                          </Badge>
                        )
                      }
                    />
                  )}

                  {cancelled.length > 0 && (
                    <ServiceSection title="Cancelados" services={cancelled} />
                  )}
                </VStack>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>

      {selectedService && (
        <PaymentModal
          isOpen={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          serviceId={selectedService.id}
          amount={selectedService.amount}
          workerName={selectedService.workerName}
          workerId={selectedService.workerId}
          onSuccess={() => {
            setPaymentOpen(false);
            refetch();
          }}
        />
      )}
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
