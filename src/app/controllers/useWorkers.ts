import { useState, useEffect } from "react";
import { getWorkers } from "@/app/models/workers";
import type { UseWorkersParams } from "../types/WorkerType";


export function useWorkers(params: UseWorkersParams) {
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getWorkers(params)
            .then(setWorkers)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [params.search, params.category, params.city]);

    return { workers, loading, error };
}