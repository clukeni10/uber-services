import { IconButton, Box } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { useSidebar } from "@/app/context/SidebarContext";
import { blue, white } from "@/app/utils/COLORS";

export default function MobileMenuButton() {
  const { setMobileOpen } = useSidebar();

  return (
    <Box
      display={{ base: "flex", md: "none" }}
      position="fixed" top="4" left="4" zIndex={98}
    >
      <IconButton
        aria-label="Abrir menu"
        bg={blue} color={white}
        borderRadius="xl" shadow="md"
        _hover={{ opacity: 0.9 }}
        onClick={() => setMobileOpen(true)}
      >
        <LuMenu size={20} />
      </IconButton>
    </Box>
  );
}