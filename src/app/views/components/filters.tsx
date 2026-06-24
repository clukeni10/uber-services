"use client";
import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { useMemo } from "react";

// Definição do formato que vem do banco
interface FilterItem {
  label: string;
  value: string;
}

interface FiltersProps {
  categoriesList: FilterItem[];
  citiesList: FilterItem[];
  onCategoryChange: (value: string) => void;
  onCityChange: (value: string) => void;
}

export default function Filters({ 
  categoriesList, 
  citiesList, 
  onCategoryChange, 
  onCityChange 
}: FiltersProps) {

  // O useMemo garante que a coleção só seja recriada se a lista vinda da BD mudar
  const categoriesCollection = useMemo(() => createListCollection({
    items: [{ label: "Todas as categorias", value: "" }, ...categoriesList],
  }), [categoriesList]);

  const citiesCollection = useMemo(() => createListCollection({
    items: [{ label: "Todas as cidades", value: "" }, ...citiesList],
  }), [citiesList]);

  return (
    <>
      {/* Select de Categorias */}
      <Select.Root
        collection={categoriesCollection}
        width="180px"
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
              {categoriesCollection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      {/* Select de Cidades */}
      <Select.Root
        collection={citiesCollection}
        width="180px"
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
              {citiesCollection.items.map((item) => (
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