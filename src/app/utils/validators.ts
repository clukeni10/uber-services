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

export function validateBirthday(birthday: string): string | null {
  if (!birthday) return "A data de nascimento é obrigatória.";

  // Força o formato YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(birthday)) return "Formato de data inválido.";

  const [year, month, day] = birthday.split("-").map(Number);

  // Ano mínimo razoável
  if (year < 1900 || year > new Date().getFullYear()) {
    return "Ano de nascimento inválido.";
  }

  // Mês entre 1 e 12
  if (month < 1 || month > 12) return "Mês inválido.";

  // Dia entre 1 e 31
  if (day < 1 || day > 31) return "Dia inválido.";

  const birthDate = new Date(birthday);
  if (isNaN(birthDate.getTime())) return "Data de nascimento inválida.";

  const now = new Date();
  if (birthDate >= now) return "A data de nascimento não pode ser no futuro.";

  // Calcula idade exata
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();
  const dayDiff = now.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (age < 18) return "Deves ter pelo menos 18 anos de idade.";
  if (age > 120) return "Data de nascimento inválida.";

  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return "O contacto é obrigatório.";

  const digits = phone.replace(/\D/g, "");

  if (digits.length !== 9) return "O contacto deve ter exatamente 9 dígitos.";

  // Números angolanos começam por 9
  if (!digits.startsWith("9")) return "Número angolano inválido. Deve começar por 9.";

  return null;
}

export function validateAddress(address: string): string | null {
  if (!address.trim()) return "A morada do serviço é obrigatória.";
  if (address.trim().length < 5) return "A morada deve ter pelo menos 5 caracteres.";
  return null;
}

