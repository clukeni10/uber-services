import { useState } from "react";
import { createService } from "@/app/models/services";

export function useCreateService() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleCreate(data: {
        worker_id: number;
        description: string;
        scheduled_at: string;
        amount: number;
        method: "card" | "transfer";
    }) {
        setLoading(true);
        setError(null);
        try {
            const result = await createService(data);
            return result;
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { handleCreate, loading, error };
}