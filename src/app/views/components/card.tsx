import type { ServiceCard } from "@/app/types/ServiceCard";
import { blue } from "@/app/utils/COLORS";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";


export default function Card({ Icon, title, desc }: ServiceCard) {
    return (
        <Box
            border="1px solid"
            borderColor="gray.200"
            borderRadius="2xl"
            p={8}
            bg="white"
            transition="box-shadow 0.2s, border-color 0.2s"
            _hover={{ borderColor: blue, boxShadow: "0 4px 24px rgba(28,111,210,0.08)" }}
            cursor="pointer"
        >
            <Flex
                w="60px"
                h="60px"
                bg="blue.50"
                borderRadius="xl"
                align="center"
                justify="center"
                mb={6}
            >
                <Icon size={26} color={blue} />
            </Flex>

            <Heading as="h3" fontSize="xl" fontWeight="bold" color="gray.800" mb={3}>
                {title}
            </Heading>
            <Text fontSize="sm" color="gray.500" lineHeight="1.7">
                {desc}
            </Text>
        </Box>
    );
}