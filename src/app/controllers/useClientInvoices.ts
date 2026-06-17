import { useState, useEffect } from "react";
import { getClientInvoices } from "@/app/models/payments";
import type { InvoiceData } from "@/app/utils/generateInvoicePDF";

export function useClientInvoices() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getClientInvoices();
        if (!cancelled) setInvoices(data);
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { invoices, loading, error };
}