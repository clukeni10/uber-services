import { useState, useEffect } from "react";
import { getMe, updateMe } from "../models/users";


interface User {
      id: number;
      name: string;
      email: string;
      phone: string;
      address: string;
      birthday: string;
      role: string;
      image: string;
      created_at: string;
}

export function useUser() {
      const [user, setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
            getMe()
                  .then(setUser)
                  .catch((err) => setError(err.message))
                  .finally(() => setLoading(false));
      }, []);

      async function handleUpdate(userData: Omit<User, "id" | "role">) {
            try {
                  await updateMe(userData);
                  setUser((prev) => prev ? { ...prev, ...userData } : prev);
            } catch (err: any) {
                  setError(err.message);
            }
      }

      return { user, loading, error, handleUpdate };
}