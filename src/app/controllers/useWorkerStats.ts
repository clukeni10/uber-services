import { useState, useEffect } from "react";
import { getWorkerStats } from "@/app/models/workers";

export function useWorkerStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getWorkerStats();
        if (!cancelled) setStats(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { stats, loading };
}