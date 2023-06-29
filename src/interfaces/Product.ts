export interface Product {
  description: string
  id: string
  image_url: string
  name: string
  price: number
  type: string
  category: string
  formattedPrice: string
}

export interface ProductsResponse {
  data: Product[]
}
