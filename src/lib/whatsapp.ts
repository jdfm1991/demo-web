const DEFAULT_MESSAGE = 'Hola, quiero más información sobre sus servicios.';

/**
 * Construye un enlace de WhatsApp con mensaje dinámico.
 *
 * @param phone Número en formato internacional sin "+" (ej: "584249265304")
 * @param message Mensaje opcional. Si no se pasa, usa el mensaje por defecto.
 */
export function buildWhatsAppLink(phone: string, message?: string): string {
  const text = message ?? DEFAULT_MESSAGE;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Construye el mensaje específico para un producto o servicio.
 */
export function buildItemMessage(itemName: string): string {
  return `Hola, vi "${itemName}" en tu página y quisiera más información.`;
}