import { useWorkerProfile } from "@/app/controllers/useWorkerProfile";
import { bg, blue, white } from "@/app/utils/COLORS";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Heading,
  Separator,
  Spinner,
  createListCollection,
  Avatar,
} from "@chakra-ui/react";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuCake,
  LuStar,
  LuWallet,
  LuClock,
  LuBriefcase,
} from "react-icons/lu";
import { useState, useMemo } from "react";
import InfoItem from "../components/infoItem";
import Sidebar from "../components/sidebar";
import { useSidebar } from "@/app/context/SidebarContext";
import { usePageTitle } from "@/app/hooks/usePageTitle";
import { useWorkerStats } from "@/app/controllers/useWorkerStats";
import { EditProfileDialog } from "../components/edit_profile_dialog";

const specialties = createListCollection({
  items: [
    { label: "Barbeiro", value: "barbeiro" },
    { label: "Electricista", value: "electricista" },
    { label: "Canalizador", value: "canalizador" },
    { label: "Pintor", value: "pintor" },
    { label: "Diarista", value: "diarista" },
    { label: "Montador", value: "montador" },
    { label: "Jardinagem", value: "jardinagem" },
    { label: "Mudanças", value: "mudancas" },
  ],
});

export default function ProfessionalProfile() {
  usePageTitle("Meu Perfil | Workê");

  const { worker, loading, handleUpdate } = useWorkerProfile();
  const { stats } = useWorkerStats();
  const { sidebarW } = useSidebar();
   const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    image: "",
    specialty: "",
    bio: "",
    hourly_rate: 0,
    is_available: true,
  });

  // Torna a lista de cards 100% dinâmica dependendo do estado real dos hooks
  const statCards = useMemo(() => {
    return [
      {
        icon: LuStar,
        value: worker?.rating_avg
          ? parseFloat(String(worker.rating_avg)).toFixed(1)
          : "—",
        label: "Avaliação Média",
      },
      {
        icon: LuWallet,
        value: worker?.total_earnings 
          ? `${Number(worker.total_earnings).toLocaleString("pt-AO")} Kz` 
          : "0 Kz",
        label: "Ganhos Totais",
      },
      {
        icon: LuClock,
        value: stats?.services?.completed !== undefined 
          ? String(stats.services.completed) 
          : "0",
        label: "Serviços Feitos",
      },
      {
        icon: LuBriefcase,
        value: worker?.hourly_rate 
          ? `${Number(worker.hourly_rate).toLocaleString("pt-AO")} Kz/h` 
          : "—",
        label: "Preço por Hora",
      },
    ];
  }, [worker, stats]);

  function onOpenChange(open: boolean) {
    if (open && worker) {
      setForm({
        name: worker.name ?? "",
        email: worker.email ?? "",
        phone: worker.phone ?? "",
        address: worker.address ?? "",
        birthday: worker.birthday ? worker.birthday.split("T")[0] : "",
        image: worker.image ?? "",
        specialty: worker.specialty ?? "",
        bio: worker.bio ?? "",
        hourly_rate: worker.hourly_rate ?? 0,
        is_available: worker.is_available ?? true,
      });
    }
  }

  async function onSave() {
    await handleUpdate(form);
  }

  if (loading)
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <VStack gap="3">
          <Spinner color={blue} size="xl" animationDuration="0.8s" />
          <Text color={blue} fontSize="sm" fontWeight="medium">
            A carregar...
          </Text>
        </VStack>
      </Flex>
    );

  return (
    <Box display="flex" h="100vh" bg="gray.50">
      <Sidebar />

      <Box
        flex="1"
        ml={{ base: "0", md: sidebarW }}
        transition="margin 0.25s ease"
        overflow="auto"
        bg={bg}
      >
        <Box maxW="1100px" mx="auto" px="8" py="8">
          <Box
            bg={white}
            borderRadius="2xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
            overflow="hidden"
          >
            <Box bg={blue} h="100px" position="relative">
              <Box
                position="absolute"
                inset="0"
                opacity={0.08}
                backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
                backgroundSize="32px 32px"
              />
            </Box>

            <Box px="6" pb="6">
              <HStack
                justify="space-between"
                align="flex-end"
                mt="-36px"
                mb="4"
              >
                {worker?.image ? (
                  <Box
                    w="72px"
                    h="72px"
                    rounded="full"
                    overflow="hidden"
                    border="4px solid"
                    borderColor={white}
                    shadow="md"
                    flexShrink={0}
                    position="relative"
                  >
                    <Avatar.Root w="100%" h="100%">
                      <Avatar.Image
                        src={
                          worker.image
                            ? `http://localhost:3001/${worker.image}`
                            : undefined
                        }
                        alt={worker.name}
                        objectFit="cover"
                      />

                      <Avatar.Fallback
                        name={worker.name}
                        bg="#0E1B2D"
                        p="6"
                        color="white"
                        fontWeight="bold"
                        fontSize="xl"
                      />
                    </Avatar.Root>
                  </Box>
                ) : (
                  <Flex
                    bg={blue}
                    w="72px"
                    h="72px"
                    rounded="full"
                    alignItems="center"
                    justifyContent="center"
                    color={white}
                    fontSize="2xl"
                    fontWeight="bold"
                    border="4px solid"
                    borderColor={white}
                    shadow="md"
                    flexShrink={0}
                  >
                    {worker?.name?.charAt(0).toUpperCase() ?? "?"}
                  </Flex>
                )}

                <EditProfileDialog 
  role="worker"
  form={form}
  setForm={setForm}
  onOpenChange={onOpenChange}
  onSave={onSave}
  isSaving={isSaving}
  specialties={specialties}
  blue={blue}
  white={white}
/>
              </HStack>

              <HStack gap="2" align="center">
                <Heading fontSize="lg" fontWeight="bold" color="gray.800">
                  {worker?.name}
                </Heading>
                <Box
                  px="2"
                  py="0.5"
                  borderRadius="full"
                  bg={worker?.is_available ? "#10B98115" : "gray.100"}
                  color={worker?.is_available ? "#10B981" : "gray.400"}
                  fontSize="10px"
                  fontWeight="semibold"
                >
                  {worker?.is_available ? "Disponível" : "Indisponível"}
                </Box>
              </HStack>
              <Text fontSize="xs" color={blue} fontWeight="medium" mt="0.5">
                {worker?.specialty ?? "Sem especialidade"}
              </Text>
              {worker?.bio && (
                <Text fontSize="sm" color="gray.500" mt="1">
                  {worker.bio}
                </Text>
              )}

              <Separator my="4" borderColor="gray.100" />

              <HStack gap="2" justify="space-between">
                <InfoItem
                  icon={LuMail}
                  label="Email"
                  value={worker?.email ?? "-"}
                />
                <Separator
                  orientation="vertical"
                  h="60px"
                  borderColor="gray.100"
                />
                <InfoItem
                  icon={LuPhone}
                  label="Telefone"
                  value={worker?.phone ?? "-"}
                />
                <Separator
                  orientation="vertical"
                  h="60px"
                  borderColor="gray.100"
                />
                <InfoItem
                  icon={LuMapPin}
                  label="Endereço"
                  value={worker?.address ?? "-"}
                />
                <Separator
                  orientation="vertical"
                  h="60px"
                  borderColor="gray.100"
                />
                <InfoItem
                  icon={LuCake}
                  label="Aniversário"
                  value={worker?.birthday ?? "-"}
                />
              </HStack>
            </Box>
          </Box>

          {/* Secção de Cards Totalmente Dinâmica */}
          <HStack gap="4" mt="6" align="stretch">
            {statCards.map((s) => {
              const Icon = s.icon;
              return (
                <Box
                  key={s.label}
                  flex="1"
                  rounded="2xl"
                  border="1px solid"
                  borderColor="gray.100"
                  bg={white}
                  p="5"
                  shadow="sm"
                  transition="all 0.2s ease"
                  _hover={{
                    shadow: "md",
                    borderColor: blue,
                    cursor: "pointer",
                    transform: "translateY(-2px)",
                  }}
                >
                  <VStack align="flex-start" gap="3">
                    <Flex
                      w="40px"
                      h="40px"
                      rounded="full"
                      bg={`${blue}15`}
                      alignItems="center"
                      justifyContent="center"
                      color={blue}
                    >
                      <Icon />
                    </Flex>
                    <VStack align="flex-start" gap="0">
                      <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                        {s.value}
                      </Text>
                      <Text fontSize="xs" color="gray.400" fontWeight="medium">
                        {s.label}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              );
            })}
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}