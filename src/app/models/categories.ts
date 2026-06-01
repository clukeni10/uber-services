{/* Ficheiro que faz a chamada a API (Backend) para todas as funções que têm haver com categorias dos workers */} 


const BASE_URL = "http://localhost:3001/api";

function getHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getCategories() {
    const res = await fetch(`${BASE_URL}/categories`, {
        headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
}

export async function getWorkersByCategory(category: string) {
    const res = await fetch(`${BASE_URL}/workers/category/${encodeURIComponent(category)}`, {
        headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
}