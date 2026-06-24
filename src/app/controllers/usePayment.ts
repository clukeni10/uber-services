import { useState } from "react";
import { processPayment } from "@/app/models/payments";
import type { InvoiceData } from "../types/InvoiceData";

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  async function handlePayment(
    service_id: number,
    method: "card" | "transfer" | "multicaixa",
    extra?: { card_last4?: string; phone?: string },
  ) {
    if (loading) return; // evita dupla chamada

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log("A processar pagamento:", { service_id, method, extra });

      // Simula delay de 2 segundos
      await new Promise((r) => setTimeout(r, 2000));

      const result = await processPayment(service_id, { method, ...extra });
      console.log("Resultado recebido do model:", result);

      // Em vez de 'return', lança um erro para que o catch trate e limpe o loading
      if (!result) {
        throw new Error("Resposta inválida do servidor.");
      }

      setReference(result.reference ?? null);
      setInvoiceData(result.invoice_data ?? null);
      setSuccess(true);
    } catch (err: any) {
      console.error("Erro apanhado no hook usePayment:", err);
      setError(err.message ?? "Erro desconhecido ao processar pagamento.");
    } finally {
      console.log("Fluxo finalizado: desligando o loading.");
      setLoading(false); // Agora é garantido correr!
    }
  }

  function reset() {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setReference(null);
    setInvoiceData(null);
  }

  return {
    handlePayment,
    loading,
    error,
    success,
    reference,
    invoiceData,
    reset,
  };
}
