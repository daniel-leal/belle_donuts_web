import axios from '../config/axiosConfig';
import { ProductsResponse } from '../interfaces/Product';

export const fetchProducts = async () => {
  try {
    const response = await axios.get<ProductsResponse>('/products');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
