export function validateScheduledAt(scheduled_at: string): string | null {
    if (!scheduled_at) return "A data e hora são obrigatórias.";

    const scheduled = new Date(scheduled_at);
    const now = new Date();

    if (isNaN(scheduled.getTime())) return "Data e hora inválidas.";
    if (scheduled <= now) return "A data e hora têm de ser no futuro.";

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

/**
 * Valida se o utilizador forneceu uma data de nascimento válida e se é maior de idade (18+).
 */
export function validateBirthday(birthday: string): string | null {
    if (!birthday) return "A data de nascimento é obrigatória.";

    const birthDate = new Date(birthday);
    const now = new Date();

    // Verifica se a string da data é interpretável
    if (isNaN(birthDate.getTime())) return "Data de nascimento inválida.";

    // Impede datas no futuro
    if (birthDate >= now) return "A data de nascimento não pode ser no futuro.";

    // Calcula a idade exata baseada no ano, mês e dia
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDifference = now.getMonth() - birthDate.getMonth();
    const dayDifference = now.getDate() - birthDate.getDate();

    // Ajusta a idade caso o aniversário ainda não tenha acontecido no ano corrente
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    if (age < 18) return "Deves ter pelo menos 18 anos de idade.";

    return null;
}

export function validateAddress(address: string): string | null {
  if (!address.trim()) return "A morada do serviço é obrigatória.";
  if (address.trim().length < 5) return "A morada deve ter pelo menos 5 caracteres.";
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return "O contacto é obrigatório.";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9) return "O contacto deve ter pelo menos 9 dígitos.";
  return null;
}