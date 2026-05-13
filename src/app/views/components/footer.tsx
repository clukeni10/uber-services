import {
  Box,
  Flex,
  Heading,
  Text,
  List,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { dblue, white, lblue } from "@/app/utils/COLORS";
import { LuMail, LuMapPin, LuPhone, LuSettings } from "react-icons/lu";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" w="100%" bg={dblue}>

      <Box px={{ base: "6", md: "10", lg: "16" }} py={{ base: "10", md: "14" }}>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          }}
          gap={{ base: "10", md: "8" }}
        >

          <GridItem colSpan={{ base: 1, sm: 2, lg: 1 }}>
            <Flex align="center" gap={3} mb={4}>
              <Box
                w="42px"
                h="42px"
                rounded="md"
                bg={lblue}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <LuSettings color={white} size={22} />
              </Box>
              <Heading
                color={white}
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight={700}
                letterSpacing="tight"
              >
                Uber-Services
              </Heading>
            </Flex>
            <Text
              color="whiteAlpha.700"
              fontSize="sm"
              maxW="260px"
              lineHeight="tall"
            >
              Conectando você a profissionais verificados, com segurança e
              confiança.
            </Text>
          </GridItem>

    
          <GridItem>
            <Heading
              color={white}
              fontSize="md"
              fontWeight={700}
              letterSpacing="tight"
              mb={4}
            >
              Navegação
            </Heading>
            <List.Root
              as="nav"
              variant="plain"
              display="flex"
              flexDir="column"
              gap="3"
            >
              {["Início", "Serviços", "Profissionais", "Como Funciona"].map(
                (item) => (
                  <List.Item
                    key={item}
                    color="whiteAlpha.700"
                    fontSize="sm"
                    cursor="pointer"
                    transition="color 0.2s"
                    _hover={{ color: "orange.300" }}
                  >
                    {item}
                  </List.Item>
                ),
              )}
            </List.Root>
          </GridItem>


          <GridItem>
            <Heading
              color={white}
              fontSize="md"
              fontWeight={700}
              letterSpacing="tight"
              mb={4}
            >
              Contactos
            </Heading>
            <List.Root variant="plain" display="flex" flexDir="column" gap="3">
              <List.Item
                color="whiteAlpha.700"
                fontSize="sm"
                cursor="pointer"
                transition="color 0.2s"
                _hover={{ color: "orange.300" }}
                gap="2"
                display="flex"
                alignItems="center"
              >
                <List.Indicator asChild color="orange.400">
                  <LuMail size={14} />
                </List.Indicator>
                contato@uberservices.com
              </List.Item>
              <List.Item
                color="whiteAlpha.700"
                fontSize="sm"
                cursor="pointer"
                transition="color 0.2s"
                _hover={{ color: "orange.300" }}
                gap="2"
                display="flex"
                alignItems="center"
              >
                <List.Indicator asChild color="orange.400">
                  <LuPhone size={14} />
                </List.Indicator>
                +244 999 999 999
              </List.Item>
              <List.Item
                color="whiteAlpha.700"
                fontSize="sm"
                gap="2"
                display="flex"
                alignItems="center"
              >
                <List.Indicator asChild color="orange.400">
                  <LuMapPin size={14} />
                </List.Indicator>
                Benfica, Luanda, Angola
              </List.Item>
            </List.Root>
          </GridItem>

  
          <GridItem>
            <Heading
              color={white}
              fontSize="md"
              fontWeight={700}
              letterSpacing="tight"
              mb={4}
            >
              Confiança
            </Heading>
            <Text
              color="whiteAlpha.700"
              fontSize="sm"
              lineHeight="tall"
              maxW="220px"
            >
              Todos os profissionais passam por verificação de antecedentes e
              validação de documentos.
            </Text>
          </GridItem>
        </Grid>
      </Box>


      <Box
        borderTop="1px solid"
        borderColor="whiteAlpha.200"
        px={{ base: "6", md: "10", lg: "16" }}
        py="4"
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align="center"
          gap="2"
        >
          <Text color="whiteAlpha.500" fontSize="xs">
            © {currentYear} Uber-Services. Todos os direitos reservados.
          </Text>
          <Flex gap="4">
            {["Privacidade", "Termos de Uso"].map((link) => (
              <Text
                key={link}
                color="whiteAlpha.500"
                fontSize="xs"
                cursor="pointer"
                transition="color 0.2s"
                _hover={{ color: "orange.300" }}
              >
                {link}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
