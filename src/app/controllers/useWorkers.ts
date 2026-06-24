import { useState, useEffect } from "react";
import { getWorkers, getWorkerFilters } from "@/app/models/workers"; 
import type { Worker, UseWorkersParams } from "../types/WorkerType";

export function useWorkers(params: UseWorkersParams) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true); // Garante que ativa o loading ao mudar os filtros

    getWorkers(params)
      .then((data) => {
        if (!cancelled) setWorkers(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [params.search, params.category, params.city]);

  return { workers, loading, error };
}

// 🆕 NOVO HOOK: Para controlar os filtros dinâmicos vindos da BD
interface FilterItem {
  label: string;
  value: string;
}

export function useWorkerFilters() {
  const [filters, setFilters] = useState<{
    categories: FilterItem[];
    cities: FilterItem[];
  }>({
    categories: [],
    cities: [],
  });
  const [loadingFilters, setLoadingFilters] = useState(true);

  useEffect(() => {
    getWorkerFilters()
      .then((data) => {
        /* console.log("=== DADOS QUE CHEGARAM DO BACKEND ===", data); */
        setFilters(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar filtros no controller:", err.message);
      })
      .finally(() => {
        setLoadingFilters(false);
      });
  }, []);

  return { filters, loadingFilters };
}
