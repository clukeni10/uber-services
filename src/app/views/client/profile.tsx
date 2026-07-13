"use client";

import { useUser } from "@/app/controllers/useUser";
import { blue, white } from "@/app/utils/COLORS";
import {
  Box,
  Flex,
  Text,
  VStack,
  Heading,
  Separator,
  Spinner,
  Avatar,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuCake,
  LuClock,
  LuHeart,
  LuStar,
} from "react-icons/lu";
import { useState } from "react";
import InfoItem from "../components/infoItem";
import Sidebar from "../components/sidebar";
import { useSidebar } from "@/app/context/SidebarContext";
import MobileMenuButton from "../components/mobile_menu_button";
import { usePageTitle } from "@/app/hooks/usePageTitle";
import { EditProfileDialog } from "../components/edit_profile_dialog";

export default function ClientProfile() {
  usePageTitle("Meu Perfil | Workê");

  const { user, loading, handleUpdate } = useUser();
  const { sidebarW } = useSidebar();
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    image: "",
    created_at: "",
  });

  function onOpenChange(open: boolean) {
    if (open && user) {
      setForm({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
        // Garante que se a data vier no formato ISO, extrai apenas YYYY-MM-DD para o input[type="date"]
        birthday: user.birthday ? user.birthday.split("T")[0] : "",
        image: user.image ?? "",
        created_at: user.created_at ?? "",
      });
    }
  }

  async function onSave() {
    try {
      setIsSaving(true);
      await handleUpdate(form);
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    } finally {
      setIsSaving(false);
    }
  }

  if (loading)
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh" bg="gray.50">
        <VStack gap="3">
          <Spinner color={blue} size="xl" animationDuration="0.8s" />
          <Text color={blue} fontSize="sm" fontWeight="medium">
            A carregar...
          </Text>
        </VStack>
      </Flex>
    );

  return (
    <Box display="flex" h="100vh" bg="#d4d4d4">
      <Sidebar />
      <MobileMenuButton />

      <Box
        flex="1"
        ml={{ base: "0", md: sidebarW }}
        transition="margin 0.25s ease"
        overflow="auto"
      >
        <Box maxW="1100px" mx="auto" px={{ base: "4", md: "8" }} py="8">
          {/* Card Principal do Perfil */}
          <Box
            bg={white}
            borderRadius="2xl"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
            overflow="hidden"
          >
            {/* Header Banner */}
            <Box bg={blue} h="100px" position="relative">
              <Box
                position="absolute"
                inset="0"
                opacity={0.08}
                backgroundImage="linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)"
                backgroundSize="32px 32px"
              />
            </Box>

            {/* Conteúdo do Perfil */}
            <Box px={{ base: "4", md: "6" }} pb="6">
              {/* Bloco de Avatar e Ação */}
              <Flex justify="space-between" align="flex-end" mt="-36px" mb="4">
                <Box
                  w="72px"
                  h="72px"
                  rounded="full"
                  border="4px solid"
                  borderColor={white}
                  shadow="md"
                  flexShrink={0}
                  position="relative"
                  bg="gray.200"
                >
                  <Avatar.Root w="100%" h="100%">
                    <Avatar.Image
                      src={
                        user?.image
                          ? user.image.startsWith("data:")
                            ? user.image
                            : `http://localhost:3001/${user.image}`
                          : undefined
                      }
                      alt={user?.name ?? "Usuário"}
                      objectFit="cover"
                    />
                    <Avatar.Fallback
                      name={user?.name ?? "?"}
                      bg="#0E1B2D"
                      p="5"
                      color="white"
                      fontWeight="bold"
                      fontSize="xl"
                    />
                  </Avatar.Root>
                </Box>

                <EditProfileDialog
                  role="client"
                  form={form}
                  setForm={setForm}
                  onOpenChange={onOpenChange}
                  onSave={onSave}
                  isSaving={isSaving}
                  blue={blue}
                  white={white}
                />
              </Flex>

              <Heading fontSize="lg" fontWeight="bold" color="gray.800">
                {user?.name}
              </Heading>
              <Text fontSize="xs" color="gray.400" mt="0.5">
                Membro desde{" "}
                {user?.created_at
                  ? new Date(user.created_at).getFullYear()
                  : "—"}
              </Text>

              <Separator my="4" borderColor="gray.100" />

              {/* Grid de Informações Básicas */}
              <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="4" w="full">
                <InfoItem
                  icon={LuMail}
                  label="Email"
                  value={user?.email ?? "-"}
                />
                <InfoItem
                  icon={LuPhone}
                  label="Telefone"
                  value={user?.phone ?? "-"}
                />
                <InfoItem
                  icon={LuMapPin}
                  label="Endereço"
                  value={user?.address ?? "-"}
                />
                <InfoItem
                  icon={LuCake}
                  label="Aniversário"
                  value={
                    user?.birthday
                      ? new Date(user.birthday).toLocaleDateString("pt-PT")
                      : "-"
                  }
                />
              </SimpleGrid>
            </Box>
          </Box>

          {/* Grid de Estatísticas */}
          <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4" mt="6">
            {[
              { icon: LuClock, value: "24", label: "Serviços Contratados" },
              { icon: LuHeart, value: "8", label: "Profissionais Favoritos" },
              { icon: LuStar, value: "4.8", label: "Avaliação Média Dada" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Box
                  key={s.label}
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
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}
