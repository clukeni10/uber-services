import { blue, white, highlights, highlights_hover } from "@/app/utils/COLORS"; // Ajusta o caminho do import se necessário
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Button,
  VStack,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/services" },
  { label: "Workers", href: "/workers" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      as="header"
      bg={blue}
      position="sticky"
      top={0}
      zIndex={100}
      w="100%"
      borderBottom="1px solid"
      borderColor="rgba(0,0,0,0.2)"
    >
      <Flex
        px={{ base: 4, md: 8 }}
        h="72px"
        align="center"
        justify="space-between"
        maxW="1280px"
        mx="auto"
      >
        {/* Logo & Brand Name */}
        <Flex align="center" gap={4}>
          {/* Aumentado radicalmente para 80px no desktop e adicionado uma margem negativa para não quebrar o alinhamento */}
          <Box
            w={{ base: "64px", md: "80px" }}
            h={{ base: "64px", md: "80px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            my="-10px" /* Impede que o logo gigante estique o Header verticalmente de forma feia */
          >
            <img
              src="/logo.png"
              alt="Workê Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform:
                  "scale(1.1)" /* Força um ganho de 10% extra eliminando possíveis bordas invisíveis da imagem */,
              }}
            />
          </Box>

          {/* Nome com a fonte Sedgwick Ave Display */}
          <Heading
            color={white}
            fontSize={{
              base: "3xl",
              md: "4xl",
            }} /* Subimos para 4xl para acompanhar o peso do novo logo */
            fontWeight={400}
            letterSpacing="0.02em"
            fontFamily="'Sedgwick Ave Display', cursive"
            lineHeight="1"
            mt="2px"
          >
            Workê
          </Heading>
        </Flex>

        {/* Desktop Navigation */}
        <HStack gap={7} display={{ base: "none", md: "flex" }}>
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
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
              transition="opacity 0.2s"
            >
              {link.label}
            </Link>
          ))}
          <Button
            bg={highlights}
            color={white}
            fontWeight={700}
            fontSize="sm"
            px={6}
            h="38px"
            borderRadius="full"
            _hover={{ bg: highlights_hover, transform: "translateY(-1px)" }}
            _active={{ transform: "scale(0.97)" }}
            transition="all 0.2s"
          >
            <Link href="/login" color={white} textDecoration="none">
              Entrar
            </Link>
          </Button>
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Abrir menu"
          onClick={() => setIsOpen((v) => !v)}
          variant="ghost"
          color={white}
          _hover={{ bg: "whiteAlpha.200" }}
        >
          {isOpen ? <LuX size={22} /> : <LuMenu size={22} />}
        </IconButton>
      </Flex>

      {/* Mobile Drawer/Menu */}
      <Box
        display={{ md: "none" }}
        overflow="hidden"
        maxH={isOpen ? "400px" : "0px"}
        transition="max-height 0.3s ease"
        bg={blue}
      >
        <VStack align="stretch" gap={4} px={4} pb={4}>
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
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
              transition="opacity 0.2s"
            >
              {link.label}
            </Link>
          ))}
          <Button
            bg={highlights}
            color={white}
            fontWeight={700}
            borderRadius="full"
            _hover={{ bg: highlights_hover }}
            w="100%"
          >
            Entrar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
