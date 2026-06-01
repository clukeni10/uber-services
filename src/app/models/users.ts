{/* Ficheiro que faz a chamada a API (Backend) para todas as funções que têm haver com busca, atualização de users */} 


const BASE_URL = "http://localhost:3001/api/users";

function getHeaders() {
      const token = localStorage.getItem("token");
      return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
      };
}

export async function getMe() {
      const res = await fetch(`${BASE_URL}/me`, {
            headers: getHeaders(),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
}

export async function updateMe(userData: {
      name: string;
      email: string;
      phone: string;
      address: string;
      birthday: string;
      image: string;
}) {
      const res = await fetch(`${BASE_URL}/me`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
}