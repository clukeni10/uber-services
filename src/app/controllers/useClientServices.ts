import { useState, useEffect } from "react";
import { getClientServices, cancelService } from "@/app/models/services";
import type { Service } from "../types/ServiceType";

export function useClientServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  async function fetchServices() {
    setLoading(true);
    try {
      const data = await getClientServices();
      setServices(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await getClientServices();
        if (!cancelled) setServices(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  async function handleCancel(id: number) {
    setActionLoading(id);
    await cancelService(id);
    await fetchServices();
    setActionLoading(null);
  }

  const pending   = services.filter((s) => s.status === "pending");
  const active    = services.filter((s) => s.status === "accepted" || s.status === "active");
  const completed = services.filter((s) => s.status === "completed");
  const cancelled = services.filter((s) => s.status === "cancelled");

  return {
    services, loading, actionLoading,
    pending, active, completed, cancelled,
    handleCancel,
    refetch: fetchServices,
  };
}