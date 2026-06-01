import { useState, useEffect } from "react";
import { getWorkerById } from "@/app/models/workers";

export function useWorkerById(id: number) {
  const [worker, setWorker] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getWorkerById(id)
      .then(setWorker)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { worker, loading, error };
}