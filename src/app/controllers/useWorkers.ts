import { useState, useEffect } from "react";
import { getWorkers } from "@/app/models/workers";
import type { Worker, UseWorkersParams } from "../types/WorkerType";

export function useWorkers(params: UseWorkersParams) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getWorkers(params)
      .then((data) => { if (!cancelled) setWorkers(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [params.search, params.category, params.city]);

  return { workers, loading, error };
}