"use client";
import { logout } from "@/app/models/auth";
import { blue, white, highlights } from "@/app/utils/COLORS";
import {
  Box, Flex, Heading, VStack, HStack,
  Text, Link, IconButton, Separator,
} from "@chakra-ui/react";
import {
  LuSettings, LuUser, LuBriefcase, LuHouse,
  LuChevronLeft, LuLogOut, LuChevronRight, LuFileText,
} from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "@/app/context/SidebarContext";


interface NavLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

function getRole(): string {
  const stored = localStorage.getItem("user");
  if (!stored) return "guest";
  return JSON.parse(stored).role ?? "guest";
}

function getNavLinks(): NavLink[] {
  const role = getRole();

  if (role === "worker") return [
    { label: "Início",   href: "/worker/dashboard", icon: LuHouse     },
    { label: "Serviços", href: "/worker/services",  icon: LuBriefcase },
    { label: "Faturas",  href: "/worker/invoices",  icon: LuFileText  },
  ];

  if (role === "admin") return [
    { label: "Dashboard",    href: "/admin/dashboard", icon: LuHouse     },
    { label: "Utilizadores", href: "/admin/users",     icon: LuUser      },
    { label: "Serviços",     href: "/admin/services",  icon: LuBriefcase },
    { label: "Faturas",      href: "/admin/invoices",  icon: LuFileText  },
  ];

  if (role === "client") return [
    { label: "Início",        href: "/client/dashboard",     icon: LuHouse     },
    { label: "Serviços",      href: "/client/services",      icon: LuBriefcase },
    { label: "Profissionais", href: "/client/professionals", icon: LuUser      },
    { label: "Faturas",       href: "/client/invoices",      icon: LuFileText  },
  ];

}

function getProfileRoute(): string {
  const role = getRole();
  if (role === "worker") return "/worker/profile";
  if (role === "admin")  return "/admin/profile";
  if (role === "client") return "/client/profile";
  return "/login";
}

interface NavItemProps {
  link: NavLink;
  collapsed: boolean;
  isActive: boolean;
}

function NavItem({ link, collapsed, isActive }: NavItemProps) {
  const Icon = link.icon;
  return (
    <Link href={link.href} textDecoration="none" _hover={{ textDecoration: "none" }}>
      <HStack
        gap="3" px="3" py="2.5" borderRadius="xl"
        bg={isActive ? "whiteAlpha.200" : "transparent"}
        color={white} opacity={isActive ? 1 : 0.75}
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
}

export default function Sidebar() {
  const { collapsed, setCollapsed, sidebarW, mobileOpen, setMobileOpen } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const navLinks = getNavLinks();
  const profileRoute = getProfileRoute();

  return (
    <>
      {/* Overlay mobile */}
      {mobileOpen && (
        <Box
          display={{ base: "block", md: "none" }}
          position="fixed" inset="0" bg="blackAlpha.600" zIndex={99}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Box
        as="aside" position="fixed" top="0" left="0"
        h="100vh" zIndex={100}
        bg={blue}
        transition="all 0.25s ease"
        display="flex" flexDir="column" overflow="hidden"
        // Desktop
        w={{ base: "220px", md: sidebarW }}
        // Mobile — entra/sai pelo lado esquerdo
        transform={{ base: mobileOpen ? "translateX(0)" : "translateX(-100%)", md: "translateX(0)" }}
      >
        {/* Logo */}
        <Flex h="64px" px="4" align="center" gap="3" flexShrink={0}
          borderBottom="1px solid" borderColor="whiteAlpha.200">
          <Box w="36px" h="36px" rounded="md" bg={highlights} flexShrink={0}
            display="flex" alignItems="center" justifyContent="center">
            <LuSettings color={white} size={18} />
          </Box>
          {(!collapsed || mobileOpen) && (
            <Heading color={white} fontSize="md" fontWeight={700} letterSpacing="tight" whiteSpace="nowrap">
              Workê
            </Heading>
          )}
        </Flex>

        {/* Nav links */}
        <VStack align="stretch" gap="1" px="2" pt="4" flex="1">
          {navLinks.map((link) => (
            <NavItem
              key={link.href}
              link={link}
              collapsed={collapsed && !mobileOpen}
              isActive={location.pathname === link.href}
            />
          ))}
        </VStack>

        {/* Bottom */}
        <VStack gap="1" px="2" pb="4" flexShrink={0}>
          <Separator borderColor="whiteAlpha.200" mb="1" />

          <HStack gap="3" px="3" py="2.5" borderRadius="xl"
            color={white} opacity={0.75} w="full"
            transition="all 0.15s" cursor="pointer"
            _hover={{ bg: "whiteAlpha.200", opacity: 1 }}
            justify={collapsed && !mobileOpen ? "center" : "flex-start"}
            onClick={() => { navigate(profileRoute); setMobileOpen(false); }}
          >
            <Flex w="28px" h="28px" borderRadius="full" bg={highlights}
              alignItems="center" justifyContent="center" flexShrink={0}>
              <LuUser size={14} color={white} />
            </Flex>
            {(!collapsed || mobileOpen) && (
              <Text fontSize="sm" fontWeight={500} whiteSpace="nowrap">Perfil</Text>
            )}
          </HStack>

          <HStack gap="3" px="3" py="2.5" borderRadius="xl"
            color={white} opacity={0.75} w="full"
            transition="all 0.15s" cursor="pointer"
            _hover={{ bg: "red.500", opacity: 1 }}
            justify={collapsed && !mobileOpen ? "center" : "flex-start"}
            onClick={() => { logout(); navigate("/login"); }}
          >
            <LuLogOut size={18} />
            {(!collapsed || mobileOpen) && (
              <Text fontSize="sm" fontWeight={500} whiteSpace="nowrap">Terminar sessão</Text>
            )}
          </HStack>

          {/* Collapse toggle — só desktop */}
          <Box display={{ base: "none", md: "flex" }} w="full"
            justifyContent={collapsed ? "center" : "flex-end"} px="1" mt="1">
            <IconButton
              aria-label="Colapsar sidebar" variant="ghost" size="sm"
              color={white} _hover={{ bg: "whiteAlpha.200" }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <LuChevronRight size={16} /> : <LuChevronLeft size={16} />}
            </IconButton>
          </Box>
        </VStack>
      </Box>
    </>
  );
}