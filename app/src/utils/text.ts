/**
 * Utility functions for accent-insensitive and case-insensitive text matching
 */

export function normalizeText(str: string = ''): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function matchesSearch(target: string = '', query: string = ''): boolean {
  const normQuery = normalizeText(query);
  if (!normQuery) return true;
  return normalizeText(target).includes(normQuery);
}
