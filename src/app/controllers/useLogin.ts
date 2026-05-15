import { useState } from "react";
import { login } from "../models/auth";

export function useLogin() {
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      async function handleLogin(email: string, password: string) {
            setLoading(true);
            setError(null);

            try {
                  const data = await login(email, password);

                  localStorage.setItem("token", data.token);
                  localStorage.setItem("user", JSON.stringify(data.user));
                  return data;
            } catch (err: any) {
                  setError(err.message);
            } finally {
                  setLoading(false);
            }
      }

      return { handleLogin, loading, error };
}
