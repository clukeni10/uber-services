import { blue, white } from "@/app/utils/COLORS";
import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Heading,
  Separator,
  IconButton,
} from "@chakra-ui/react";
import {
  LuPencil,
  LuMail,
  LuPhone,
  LuMapPin,
  LuCake,
  LuClock,
  LuHeart,
  LuStar,
} from "react-icons/lu";

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <VStack gap="1" align="center" flex="1">
      <Flex
        w="38px"
        h="38px"
        rounded="full"
        bg={`${blue}15`}
        alignItems="center"
        justifyContent="center"
        color={blue}
        fontSize="16px"
      >
        <Icon />
      </Flex>
      <Text
        fontSize="9px"
        color="gray.400"
        fontWeight="semibold"
        letterSpacing="wide"
        textTransform="uppercase"
      >
        {label}
      </Text>
      <Text
        fontSize="11px"
        color="gray.600"
        fontWeight="medium"
        textAlign="center"
      >
        {value}
      </Text>
    </VStack>
  );
}

export default function ClientProfile() {
  return (
    <Box h="100vh">
      <Flex flexDir="column" h="100%">
        <Box
          h="50%"
          bg={blue}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box w="70vw" bg={white} rounded="xl" p="6" shadow="lg">
            <HStack justify="space-between" align="flex-start">
              <HStack gap="4" align="center">
                <Flex
                  bg={blue}
                  w="72px"
                  h="72px"
                  rounded="full"
                  alignItems="center"
                  justifyContent="center"
                  color={white}
                  fontSize="xl"
                  fontWeight="bold"
                  flexShrink={0}
                >
                  CF
                </Flex>

                <VStack align="flex-start" gap="0.5">
                  <Heading fontSize="lg" fontWeight="bold" color="gray.800">
                    Nome do User
                  </Heading>
                  <Text fontSize="xs" color="gray.400">
                    Membro desde 2026
                  </Text>
                </VStack>
              </HStack>

              <IconButton
                aria-label="Editar perfil"
                variant="ghost"
                size="sm"
                color={blue}
                _hover={{ bg: `${blue}15` }}
              >
                <LuPencil />
              </IconButton>
            </HStack>

            <Separator my="4" borderColor="gray.100" />

            <HStack gap="2" justify="space-between">
              <InfoItem icon={LuMail} label="Email" value="user@email.com" />
              <Separator
                orientation="vertical"
                h="60px"
                borderColor="gray.100"
              />
              <InfoItem
                icon={LuPhone}
                label="Telefone"
                value="+244 900 000 000"
              />
              <Separator
                orientation="vertical"
                h="60px"
                borderColor="gray.100"
              />
              <InfoItem
                icon={LuMapPin}
                label="Endereço"
                value="Luanda, Angola"
              />
              <Separator
                orientation="vertical"
                h="60px"
                borderColor="gray.100"
              />
              <InfoItem icon={LuCake} label="Aniversário" value="1 Jan 1990" />
            </HStack>
          </Box>
        </Box>

        <Box
          h="50%"
          bg={white}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box w="70vw" p="6">
            <HStack gap="4" align="stretch">
              {/* Serviços Contratados */}
              <Box
                flex="1"
                rounded="xl"
                border="1px solid"
                borderColor="gray.100"
                p="5"
                shadow="sm"
                _hover={{
                  shadow: "md",
                  borderColor: blue,
                  cursor: "pointer",
                  transform: "translateY(-2px)",
                  transition: "all 0.2s ease",
                }}
                transition="all 0.2s ease"
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
                    <LuClock />
                  </Flex>
                  <VStack align="flex-start" gap="0">
                    <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                      24
                    </Text>
                    <Text fontSize="xs" color="gray.400" fontWeight="medium">
                      Serviços Contratados
                    </Text>
                  </VStack>
                </VStack>
              </Box>

              {/* Profissionais Favoritos */}
              <Box
                flex="1"
                rounded="xl"
                border="1px solid"
                borderColor="gray.100"
                p="5"
                shadow="sm"
                _hover={{
                  shadow: "md",
                  borderColor: blue,
                  cursor: "pointer",
                  transform: "translateY(-2px)",
                  transition: "all 0.2s ease",
                }}
                transition="all 0.2s ease"
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
                    <LuHeart />
                  </Flex>
                  <VStack align="flex-start" gap="0">
                    <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                      8
                    </Text>
                    <Text fontSize="xs" color="gray.400" fontWeight="medium">
                      Profissionais Favoritos
                    </Text>
                  </VStack>
                </VStack>
              </Box>

              {/* Avaliação Média */}
              <Box
                flex="1"
                rounded="xl"
                border="1px solid"
                borderColor="gray.100"
                p="5"
                shadow="sm"
                _hover={{
                  shadow: "md",
                  borderColor: blue,
                  cursor: "pointer",
                  transform: "translateY(-2px)",
                  transition: "all 0.2s ease",
                }}
                transition="all 0.2s ease"
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
                    <LuStar />
                  </Flex>
                  <VStack align="flex-start" gap="0">
                    <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                      4.8
                    </Text>
                    <Text fontSize="xs" color="gray.400" fontWeight="medium">
                      Avaliação Média Dada
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            </HStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
