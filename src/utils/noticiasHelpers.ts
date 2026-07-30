/**
 * Gera um Slug URL-friendly a partir de um título.
 */
export function generateSlug(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * Conta palavras em um texto simples ou HTML extraído.
 */
export function countWords(content: string): number {
  const plainText = content.replace(/<[^>]*>/g, '').trim();
  if (!plainText) return 0;
  return plainText.split(/\s+/).length;
}

/**
 * Conta caracteres excluindo tags HTML.
 */
export function countCharacters(content: string): number {
  return content.replace(/<[^>]*>/g, '').length;
}
