import { useState } from "react";
import { register } from "../models/auth";
import { useNavigate } from "react-router-dom";

export function useRegister() {
      const navigate = useNavigate();
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      async function handleRegister(name: string, email: string, password: string) {
            setLoading(true);
            setError(null);

            try {
                  await register(name, email, password);
                  navigate("/login");
            } catch (err: any) {
                  setError(err.message);
            } finally {
                  setLoading(false)
            }
      }

      return { handleRegister, error, loading };
}