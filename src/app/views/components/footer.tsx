import {
  Box,
  Flex,
  Heading, 
  Text,
  List,
  Grid,
  GridItem,
  Link
} from "@chakra-ui/react";
import { dblue, white, highlights } from "@/app/utils/COLORS";
import { LuMail, LuMapPin, LuPhone, LuSettings } from "react-icons/lu";


const navLinks = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/services" },
  { label: "Profissionais", href: "/workers" },
  { label: "Entrar", href: "/login" }

]


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
                bg={highlights}
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
                Workê
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  color={white}
                  fontSize="sm"
                  fontWeight={500}
                  opacity={0.88}
                  _hover={{
                    opacity: 1,
                    textDecoration: "none",
                    color: highlights,
                  }}
                  transition="opacity 0.2s"
                >
                  {link.label}
                </Link>
              ))}
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
                _hover={{ color: highlights }}
                gap="2"
                display="flex"
                alignItems="center"
              >
                <List.Indicator asChild color={highlights}>
                  <LuMail size={14} />
                </List.Indicator>
                contato@worke.co.ao
              </List.Item>
              <List.Item
                color="whiteAlpha.700"
                fontSize="sm"
                cursor="pointer"
                transition="color 0.2s"
                _hover={{ color: highlights }}
                gap="2"
                display="flex"
                alignItems="center"
              >
                <List.Indicator asChild color={highlights}>
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
                <List.Indicator asChild color={highlights}>
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
            © {currentYear} Workê. Todos os direitos reservados.
          </Text>
          <Flex gap="4">
            {["Privacidade", "Termos de Uso"].map((link) => (
              <Text
                key={link}
                color="whiteAlpha.500"
                fontSize="xs"
                cursor="pointer"
                transition="color 0.2s"
                _hover={{ color: white }}
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
