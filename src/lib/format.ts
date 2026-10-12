/**
 * Formatea un precio para mostrar en la interfaz.
 * - Si es null, devuelve "A consultar".
 * - Si es un número, lo formatea con separador de miles y dos decimales.
 */
export function formatPrice(price: number | null): string {
  if (price === null || price === undefined) {
    return 'A consultar';
  }

  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}