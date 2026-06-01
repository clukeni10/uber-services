"use client";
import { Portal, Select, createListCollection } from "@chakra-ui/react";

interface FiltersProps {
    onCategoryChange: (value: string) => void;
    onCityChange: (value: string) => void;
}

const categories = createListCollection({
    items: [
        { label: "Todas as categorias", value: "" },
        { label: "Barbeiro", value: "barbeiro" },
        { label: "Electricista", value: "electricista" },
        { label: "Canalizador", value: "canalizador" },
        { label: "Pintor", value: "pintor" },
        { label: "Diarista", value: "diarista" },
    ],
});

const cities = createListCollection({
    items: [
        { label: "Todas as cidades", value: "" },
        { label: "Luanda", value: "luanda" },
        { label: "Belas", value: "belas" },
        { label: "Cazenga", value: "cazenga" },
        { label: "Viana", value: "viana" },
    ],
});

export default function Filters({ onCategoryChange, onCityChange }: FiltersProps) {
    return (
        <>
            <Select.Root
                collection={categories} width="180px"
                onValueChange={(e) => onCategoryChange(e.value[0] ?? "")}
            >
                <Select.HiddenSelect />
                <Select.Control>
                    <Select.Trigger bg="gray.50" borderRadius="xl" border="none" fontSize="sm">
                        <Select.ValueText placeholder="Categoria" />
                    </Select.Trigger>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content>
                            {categories.items.map((item) => (
                                <Select.Item item={item} key={item.value}>
                                    {item.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>

            <Select.Root
                collection={cities} width="180px"
                onValueChange={(e) => onCityChange(e.value[0] ?? "")}
            >
                <Select.HiddenSelect />
                <Select.Control>
                    <Select.Trigger bg="gray.50" borderRadius="xl" border="none" fontSize="sm">
                        <Select.ValueText placeholder="Cidade" />
                    </Select.Trigger>
                </Select.Control>
                <Portal> 
                    <Select.Positioner>
                        <Select.Content>
                            {cities.items.map((item) => (
                                <Select.Item item={item} key={item.value}>
                                    {item.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
        </>
    );
}