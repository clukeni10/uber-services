{/* Ficheiro que faz a chamada a API (Backend) para todas as funções que têm haver com auth (autenticação de users) */} 

export async function login(email: string, password: string) {
      const res = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
      })

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
}

export async function register(name: string, email: string, password: string, role: "client" | "worker" = "client") {
      const res = await fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
}

export function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
}