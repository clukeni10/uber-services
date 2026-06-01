"use client";
import { logout } from "@/app/models/auth";
import { blue, lblue, white, orange } from "@/app/utils/COLORS";
import {
  Box,
  Flex,
  Heading,
  VStack,
  HStack,
  Text,
  Link,
  IconButton,
} from "@chakra-ui/react";

import { useState } from "react";
import {
  LuSettings,
  LuUser,
  LuBriefcase,
  LuHouse,
  LuChevronLeft,
  LuLogOut,
  LuChevronRight,
} from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";

function getNavLinks() {
  const stored = localStorage.getItem("user");
  if (stored) {
    const user = JSON.parse(stored);
    const isWorker = user.role === "worker";
    return [
      {
        label: "Início",
        href: isWorker ? "/worker/dashboard" : "/client/dashboard",
        icon: LuHouse,
      },
      {
        label: "Serviços",
        href: isWorker ? "/worker/services" : "/client/services",
        icon: LuBriefcase,
      },
      { label: "Profissionais", href: "/client/workers", icon: LuUser },
    ];
  }
  return [
    { label: "Início", href: "/", icon: LuHouse },
    { label: "Serviços", href: "/services", icon: LuBriefcase },
    { label: "Profissionais", href: "/professionals", icon: LuUser },
  ];
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navLinks = getNavLinks();

  function handleProfileClick() {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      if (user.role === "client") navigate("/client/profile");
      else if (user.role === "worker") navigate("/worker/profile");
    } else {
      navigate("/login");
    }
  }

  const w = collapsed ? "72px" : "220px";

  return (
    <Box
      as="aside"
      position="fixed"
      top="0"
      left="0"
      h="100vh"
      w={w}
      bg={blue}
      zIndex={100}
      transition="width 0.25s ease"
      display="flex"
      flexDir="column"
      overflow="hidden"
    >
      <Flex
        h="64px"
        px="4"
        align="center"
        gap="3"
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
        flexShrink={0}
      >
        <Box
          w="36px"
          h="36px"
          rounded="md"
          bg={lblue}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <LuSettings color={white} size={18} />
        </Box>
        {!collapsed && (
          <Heading
            color={white}
            fontSize="md"
            fontWeight={700}
            letterSpacing="tight"
            whiteSpace="nowrap"
          >
            Uber-Services
          </Heading>
        )}
      </Flex>

      <VStack align="stretch" gap="1" px="2" pt="4" flex="1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <HStack
                gap="3"
                px="3"
                py="2.5"
                borderRadius="xl"
                bg={isActive ? "whiteAlpha.200" : "transparent"}
                color={white}
                opacity={isActive ? 1 : 0.75}
                transition="all 0.15s"
                _hover={{ bg: "whiteAlpha.200", opacity: 1 }}
                justify={collapsed ? "center" : "flex-start"}
              >
                <Icon size={18} />
                {!collapsed && (
                  <Text fontSize="sm" fontWeight={500} whiteSpace="nowrap">
                    {link.label}
                  </Text>
                )}
              </HStack>
            </Link>
          );
        })}
      </VStack>

      <VStack gap="2" px="2" pb="4" flexShrink={0}>
        <HStack
          gap="3"
          px="3"
          py="2.5"
          borderRadius="xl"
          color={white}
          opacity={0.75}
          transition="all 0.15s"
          _hover={{ bg: "whiteAlpha.200", opacity: 1, cursor: "pointer" }}
          onClick={handleProfileClick}
          justify={collapsed ? "center" : "flex-start"}
          w="full"
        >
          <Flex
            w="28px"
            h="28px"
            borderRadius="full"
            bg={orange}
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <LuUser size={14} color={white} />
          </Flex>
          {!collapsed && (
            <Text fontSize="sm" fontWeight={500} whiteSpace="nowrap">
              Perfil
            </Text>
          )}
        </HStack>

        <HStack
          gap="3"
          px="3"
          py="2.5"
          borderRadius="xl"
          color={white}
          opacity={0.75}
          transition="all 0.15s"
          _hover={{ bg: "red.500", opacity: 1, cursor: "pointer" }}
          onClick={() => {
            logout();
            navigate("/login");
          }}
          justify={collapsed ? "center" : "flex-start"}
          w="full"
        >
          <LuLogOut size={18} />
          {!collapsed && (
            <Text fontSize="sm" fontWeight={500} whiteSpace="nowrap">
              Terminar sessão
            </Text>
          )}
        </HStack>

        {/* Collapse toggle */}
        <Box
          w="full"
          display="flex"
          justifyContent={collapsed ? "center" : "flex-end"}
          px="1"
        >
          <IconButton
            aria-label="Colapsar sidebar"
            variant="ghost"
            size="sm"
            color={white}
            _hover={{ bg: "whiteAlpha.200" }}
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? (
              <LuChevronRight size={16} />
            ) : (
              <LuChevronLeft size={16} />
            )}
          </IconButton>
        </Box>
      </VStack>
    </Box>
  );
}
