import { useState, useEffect } from "react";
import {
      getWorkerServices, acceptService, refuseService,
      startService, completeService,
} from "@/app/models/services";
import type { Service } from "../types/ServiceType";

export function useWorkerServices() {
      const [services, setServices] = useState<Service[]>([]);
      const [loading, setLoading] = useState(true);
      const [actionLoading, setActionLoading] = useState<number | null>(null);

      async function fetchServices() {
            setLoading(true);
            try {
                  const data = await getWorkerServices();
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
                        const data = await getWorkerServices();
                        if (!cancelled) setServices(data);
                  } finally {
                        if (!cancelled) setLoading(false);
                  }
            }

            load();
            return () => { cancelled = true; };
      }, []);

      async function handleAccept(id: number) {
            setActionLoading(id);
            await acceptService(id);
            await fetchServices();
            setActionLoading(null);
      }

      async function handleRefuse(id: number) {
            setActionLoading(id);
            await refuseService(id);
            await fetchServices();
            setActionLoading(null);
      }

      async function handleStart(id: number) {
            setActionLoading(id);
            await startService(id);
            await fetchServices();
            setActionLoading(null);
      }

      async function handleComplete(id: number) {
            setActionLoading(id);
            await completeService(id);
            await fetchServices();
            setActionLoading(null);
      }

      const pending = services.filter((s) => s.status === "pending");
      const active = services.filter((s) => s.status === "accepted" || s.status === "active");
      const completed = services.filter((s) => s.status === "completed");
      const cancelled = services.filter((s) => s.status === "cancelled");

      return {
            services, loading, actionLoading,
            pending, active, completed, cancelled,
            handleAccept, handleRefuse, handleStart, handleComplete,
            refetch: fetchServices,
      };
}