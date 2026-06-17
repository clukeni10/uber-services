const BASE_URL = "http://localhost:3001/api/payments";

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function processPayment(
  service_id: number,
  data: {
    method: "card" | "transfer" | "multicaixa";
    card_last4?: string;
    phone?: string;
  }
) {
  const res = await fetch(`${BASE_URL}/${service_id}/pay`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
}

export async function getClientPayments() {
  const res = await fetch(`${BASE_URL}/client`, { headers: getHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function getInvoice(service_id: number) {
  const res = await fetch(`${BASE_URL}/invoice/${service_id}`, {
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function getClientInvoices() {
  const res = await fetch(`${BASE_URL}/invoices/client`, {
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}