import type { InfoItemProps } from "@/app/types/InfoItemProps";
import { blue } from "@/app/utils/COLORS";
import { VStack, Flex, Text } from "@chakra-ui/react";

export default function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
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
