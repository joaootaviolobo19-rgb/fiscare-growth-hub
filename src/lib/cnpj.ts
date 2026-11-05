const CNPJ_LENGTH = 14;
const GROUPS = [2, 3, 3, 4, 2];
const SEPARATORS = [".", ".", "/", "-"];
const WEIGHTS_1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const WEIGHTS_2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

export function normalizeCnpj(value: string) {
  return value
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, "")
    .slice(0, CNPJ_LENGTH);
}

/** Máscara progressiva: funciona enquanto a pessoa digita e aceita as letras do CNPJ alfanumérico. */
export function formatCnpj(value: string) {
  const chars = normalizeCnpj(value);
  let formatted = "";
  let index = 0;
  for (let group = 0; group < GROUPS.length && index < chars.length; group++) {
    const size = GROUPS[group] ?? 0;
    if (group > 0) formatted += SEPARATORS[group - 1] ?? "";
    formatted += chars.slice(index, index + size);
    index += size;
  }
  return formatted;
}

function checkDigit(base: string, weights: number[]) {
  let sum = 0;
  for (let i = 0; i < base.length; i++) {
    sum += (base.charCodeAt(i) - 48) * (weights[i] ?? 0);
  }
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

export function isValidCnpj(value: string) {
  const chars = normalizeCnpj(value);
  if (chars.length !== CNPJ_LENGTH) return false;
  if (/^([0-9A-Z])\1{13}$/.test(chars)) return false;
  if (!/^\d{2}$/.test(chars.slice(12))) return false;
  const first = checkDigit(chars.slice(0, 12), WEIGHTS_1);
  const second = checkDigit(chars.slice(0, 13), WEIGHTS_2);
  return chars.charAt(12) === String(first) && chars.charAt(13) === String(second);
}
