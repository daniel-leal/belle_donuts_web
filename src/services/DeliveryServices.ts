import axios from '@config/axiosConfig'
import { OperatingHoursResponse } from '@interfaces/OperatingHours'
import { ProductsResponse } from '@interfaces/Product'

export const fetchProducts = async () => {
  try {
    const response = await axios.get<ProductsResponse>('/products')
    return response.data.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const fetchOperatingHours = async () => {
  try {
    const response = await axios.get<OperatingHoursResponse>('/operating_hours')
    return response.data.data
  } catch (error) {
    console.error('Error fetching operating hours:', error)
    throw error
  }
}
