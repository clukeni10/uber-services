import type { NavItemProps } from "@/app/types/NavLinkType";
import { white } from "@/app/utils/COLORS";
import { HStack, Link, Text } from "@chakra-ui/react";



export default function NavItem({ link, collapsed, isActive }: NavItemProps) {
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