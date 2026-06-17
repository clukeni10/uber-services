import { Box, Grid, Text, Flex, Heading, Button } from "@chakra-ui/react";
import { blue, highlights, white, bg } from "@/app/utils/COLORS";
import { FiCheckCircle, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Professional } from "@/app/types/Professional";



const professionals: Professional[] = [
  {
    initials: "CA",
    avatarBg: blue,
    name: "Carlos Almeida",
    role: "Eletricista certificado",
    city: "Luanda, Luanda",
    rating: 4.9,
    reviews: 184,
  },
  {
    initials: "MS",
    avatarBg: highlights,
    name: "Mariana Silva",
    role: "Profissional de limpeza",
    city: "Talatona, Luanda",
    rating: 4.8,
    reviews: 232,
  },
  {
    initials: "RC",
    avatarBg: blue,
    name: "Rafael Costa",
    role: "Canalizador especializado",
    city: "Viana, Luanda",
    rating: 5.0,
    reviews: 97,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <Flex align="center" gap={1}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Box key={i} as="span" color={highlights} fontSize="md" lineHeight="1">
          {i <= Math.floor(rating) ? "★" : "☆"}
        </Box>
      ))}
    </Flex>
  );
}

export default function TopProfessionals() {
  return (
    <Box bg={bg} py={20} px={{ base: 6, md: 16 }}>

      <Flex
        justify="space-between"
        align="flex-start"
        mb={10}
        flexWrap="wrap"
        gap={4}
      >
        <Box>
          <Text
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="widest"
            color={highlights}
            mb={3}
            textTransform="uppercase"
          >
            PROFISSIONAIS EM DESTAQUE
          </Text>
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="bold"
            color="gray.900"
          >
            Os mais bem avaliados da semana
          </Heading>
        </Box>

        <Button
          bg={white}
          border="2px solid"
          borderColor={blue}
          color={blue}
          borderRadius="xl"
          px={6}
          py={3}
          fontWeight="bold"
          fontSize="sm"
          display="flex"
          alignItems="center"
          gap={2}
          _hover={{ bg: blue, color: white }}
          transition="all 0.2s"
          flexShrink={0}
          alignSelf="center"
        >
          <Link to="/workers">
            Ver todos →
          </Link>
        </Button>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {professionals.map(
          ({ initials, avatarBg, name, role, city, rating, reviews }) => (
            <Box
              key={name}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="2xl"
              p={6}
              bg="white"
              _hover={{
                borderColor: blue,
                boxShadow: "0 4px 24px rgba(28,111,210,0.08)",
              }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <Flex justify="space-between" align="flex-start" mb={4}>
                <Flex align="center" gap={3}>
                  <Box position="relative">
                    <Flex
                      w="56px"
                      h="56px"
                      borderRadius="full"
                      bg={avatarBg}
                      align="center"
                      justify="center"
                      color={white}
                      fontWeight="bold"
                      fontSize="lg"
                    >
                      {initials}
                    </Flex>

                    <Box
                      position="absolute"
                      bottom="2px"
                      right="2px"
                      w="12px"
                      h="12px"
                      borderRadius="full"
                      bg="green.400"
                      border="2px solid white"
                    />
                  </Box>

                  <Box>
                    <Text fontWeight="bold" fontSize="md" color="gray.800">
                      {name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {role}
                    </Text>
                    <Flex align="center" gap={1} mt={1}>
                      <Box color="gray.400" display="flex" alignItems="center">
                        <FiMapPin size={11} />
                      </Box>
                      <Text fontSize="xs" color="gray.400">
                        {city}
                      </Text>
                    </Flex>
                  </Box>
                </Flex>


                <Flex align="center" gap={1} color={blue}>
                  <FiCheckCircle size={14} />
                  <Text fontSize="xs" fontWeight="semibold" color={blue}>
                    VERIFICADO
                  </Text>
                </Flex>
              </Flex>


              <Box borderTop="1px solid" borderColor="gray.100" my={4} />


              <Flex align="center" gap={3}>
                <StarRating rating={rating} />
                <Text fontWeight="bold" color="gray.800" fontSize="md">
                  {rating.toFixed(1)}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  ({reviews} avaliações)
                </Text>
              </Flex>
            </Box>
          ),
        )}
      </Grid>
    </Box>
  );
}
