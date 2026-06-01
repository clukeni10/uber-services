

import { useState, useEffect } from "react";
import { getWorkerMe, updateWorkerMe } from "@/app/models/workers";
import type { WorkerProfile } from "../types/WorkerType";



export function useWorkerProfile() {
  const [worker, setWorker] = useState<WorkerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWorkerMe()
      .then(setWorker)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleUpdate(data: Omit<WorkerProfile, "id" | "rating_avg" | "total_earnings">) {
    try {
      await updateWorkerMe(data);
      setWorker((prev) => prev ? { ...prev, ...data } : prev);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return { worker, loading, error, handleUpdate };
}