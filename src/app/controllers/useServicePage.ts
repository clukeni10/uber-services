import { useState, useEffect } from "react";
import { getCategories, getWorkersByCategory } from "@/app/models/categories";
import { getWorkers } from "@/app/models/workers";

export function useServicesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingWorkers, setLoadingWorkers] = useState(true);

  useEffect(() => {
    let cancelled = false;
    console.log("Categorias vindas da API:", categories);
    async function load() {
      try {
        const data = await getCategories();
        if (!cancelled) setCategories(data);
      } finally {
        if (!cancelled) setLoadingCategories(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoadingWorkers(true);
      try {
        const data = selectedCategory
          ? await getWorkersByCategory(selectedCategory)
          : await getWorkers({});

        if (!cancelled) {
          const sorted = [...data].sort(
            (a, b) => (b.rating_avg ?? 0) - (a.rating_avg ?? 0),
          );
          setWorkers(selectedCategory ? sorted : sorted.slice(0, 6));
        }
      } finally {
        if (!cancelled) setLoadingWorkers(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [selectedCategory]);

  return {
    categories,
    workers,
    selectedCategory,
    setSelectedCategory,
    loadingCategories,
    loadingWorkers,
  };
}
