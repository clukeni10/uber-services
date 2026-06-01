import { useState, useEffect } from "react";
import { getCategories, getWorkersByCategory } from "@/app/models/categories";
import { getWorkers } from "@/app/models/workers";

export function useClientServices() {
    const [categories, setCategories] = useState<any[]>([]);
    const [workers, setWorkers] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingWorkers, setLoadingWorkers] = useState(true);

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .finally(() => setLoadingCategories(false));
    }, []);

 
    useEffect(() => {
        setLoadingWorkers(true);
        const fetch = selectedCategory
            ? getWorkersByCategory(selectedCategory)
            : getWorkers({});

        fetch
            .then((data) => {

                const sorted = [...data].sort((a, b) => (b.rating_avg ?? 0) - (a.rating_avg ?? 0));
                setWorkers(selectedCategory ? sorted : sorted.slice(0, 6));
            })
            .finally(() => setLoadingWorkers(false));
    }, [selectedCategory]);

    return {
        categories,
        workers,
        selectedCategory,
        setSelectedCategory,
        loadingCategories,
        loadingWorkers,
    };
}