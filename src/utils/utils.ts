export function formatPrice(price: string) {
  return `R$ ${price.replace('.', ',')}`
}
