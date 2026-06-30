{/* Ficheiro que faz a chamada a API (Backend) para todas as funções que têm haver com busca dos workers*/}
const BASE_URL = "http://localhost:3001/api/workers";

function getHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getWorkerEarnings() {
  const res = await fetch("http://localhost:3001/api/workers/earnings", {
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function getWorkers(params: { search?: string; category?: string; city?: string }) {
    const query = new URLSearchParams(); 
    if (params.search) query.append("search", params.search);
    if (params.category) query.append("category", params.category);
    if (params.city) query.append("city", params.city);

    const res = await fetch(`${BASE_URL}?${query.toString()}`, {
        headers: getHeaders(),
    }); 

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
}

export async function getWorkerMe() {
    const res = await fetch("http://localhost:3001/api/workers/me", {
        headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
}

export async function updateWorkerMe(workerData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;
    image: string;
    specialty: string;
    bio: string;
    hourly_rate: number;
    is_available: boolean;
}) {
    const res = await fetch("http://localhost:3001/api/workers/me", {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(workerData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
}

export async function getWorkerById(id: number) {
    const res = await fetch(`http://localhost:3001/api/workers/${id}`, {
        headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error); 
    return data;
}

export async function getWorkerStats() {
  const res = await fetch("http://localhost:3001/api/workers/stats", {
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function getWorkerFilters() {
    const res = await fetch(`${BASE_URL}/filters`, {
        headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data; 
}