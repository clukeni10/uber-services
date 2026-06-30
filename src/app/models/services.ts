const BASE_URL = "http://localhost:3001/api/services";

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function createService(data: {
  worker_id: number;
  description: string;
  scheduled_at: string;
  address: string;
  contact_phone: string;
}) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error);
  return result;
}

export async function getWorkerServices(status?: string) {
  const query = status ? `?status=${status}` : "";
  const res = await fetch(`${BASE_URL}/worker${query}`, { headers: getHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function getClientServices(status?: string) {
  const query = status ? `?status=${status}` : "";
  const res = await fetch(`${BASE_URL}/client${query}`, { headers: getHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function acceptService(id: number) {
  const res = await fetch(`${BASE_URL}/${id}/accept`, {
    method: "PUT", headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function refuseService(id: number) {
  const res = await fetch(`${BASE_URL}/${id}/refuse`, {
    method: "PUT", headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function startService(id: number) {
  const res = await fetch(`${BASE_URL}/${id}/start`, {
    method: "PUT", headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function completeService(id: number) {
  const res = await fetch(`${BASE_URL}/${id}/complete`, {
    method: "PUT", headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function cancelService(id: number) {
  const res = await fetch(`${BASE_URL}/${id}/cancel`, {
    method: "PUT", headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}