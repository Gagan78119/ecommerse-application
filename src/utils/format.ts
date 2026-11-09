/** Format a numeric price for display, e.g. 50 → "₹ 50.00" */
export function formatPrice(value: number): string {
  return `₹ ${value.toFixed(2)}`;
}
