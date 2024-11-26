import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${baseURL}/products`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch products' );
  }
};

export const fetchProductById = async (id: number) => {
  try {
    const response = await axios.get(`${baseURL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch product');
  }
};
