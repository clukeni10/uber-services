"use client";
import { blue, white, highlights, highlights_hover } from "@/app/utils/COLORS";
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
import { LuSettings, LuMenu, LuX } from "react-icons/lu";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/services" },
  { label: "Profissionais", href: "/workers" }
]


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box as="header" bg={blue} position="sticky" top={0} zIndex={100} w="100%" borderBottom="1px solid" borderColor="rgba(0,0,0,0.2)">
      <Flex
        px={{ base: 4, md: 8 }}
        h="64px"
        align="center"
        justify="space-between"
        maxW="1280px"
        mx="auto"
      >
        <Flex align="center" gap={3}>
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
            <Link href="/login" color={white} textDecoration="none">Entrar</Link>
          </Button>
        </HStack>


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

      <Box
        display={{ md: "none" }}
        overflow="hidden"
        maxH={isOpen ? "400px" : "0px"}
        transition="max-height 0.3s ease"
        bg={blue}
      >
        <VStack align="stretch" gap={0} px={4} pb={4}>
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
            mt={4}
            bg={highlights}
            color={white}
            fontWeight={700}
            borderRadius="full"
            _hover={{ bg: "#ea6c0a" }}
            w="100%"
          >
            Entrar
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
