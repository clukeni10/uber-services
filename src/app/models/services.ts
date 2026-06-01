{/* Ficheiro que faz a chamada a API (Backend) para todas as funções que têm haver com os agendamentos de serviços */} 


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
    amount: number;
    method: "card" | "transfer";
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