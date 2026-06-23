export function validateScheduledAt(scheduled_at: string): string | null {
    if (!scheduled_at) return "A data e hora são obrigatórias.";

    const scheduled = new Date(scheduled_at);
    const now = new Date();

    if (isNaN(scheduled.getTime())) return "Data e hora inválidas.";
    if (scheduled <= now) return "A data e hora têm de ser no futuro.";

    // Não pode agendar com mais de 30 dias de antecedência
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    if (scheduled > maxDate) return "Não podes agendar com mais de 30 dias de antecedência.";

    return null;
}

export function validateDescription(description: string): string | null {
    if (!description.trim()) return "A descrição é obrigatória.";
    if (description.trim().length < 10) return "A descrição deve ter pelo menos 10 caracteres.";
    if (description.trim().length > 255) return "A descrição não pode exceder 255 caracteres.";
    return null;
}