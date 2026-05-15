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

export async function register(name: string, email: string, password: string) {
      const res = await fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
}

export function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
}