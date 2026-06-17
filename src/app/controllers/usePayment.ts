import { useState } from "react";
import { processPayment } from "@/app/models/payments";
import type { InvoiceData } from "@/app/utils/generateInvoicePDF";

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  async function handlePayment(
    service_id: number,
    method: "card" | "transfer" | "multicaixa",
    extra?: { card_last4?: string; phone?: string }
  ) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    await new Promise((r) => setTimeout(r, 2000));

    try {
      const result = await processPayment(service_id, { method, ...extra });
console.log("RESULT:", result);
console.log("INVOICE DATA:", result.invoice_data);
setReference(result.reference);
setInvoiceData(result.invoice_data);
setSuccess(true);
return result;

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { handlePayment, loading, error, success, reference, invoiceData };
}