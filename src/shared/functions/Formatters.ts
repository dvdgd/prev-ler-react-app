export function formatCnpj(text: string) {
  return text.replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

export function formatCep(text: string) {
  return text.replace(/^(\d{5})(\d{0,3})$/, '$1-$2')
}
