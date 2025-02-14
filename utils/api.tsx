import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Category {
    id: number; 
    image: string;
    name: string;
}

export interface Item {
    id: number; 
    name: string;
    price: number;
    description: string;
    image: string;
    stock: number;
    category_id: number;
}

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get('/categories');
    return response.data.data;  // Assuming the response structure is { data: [...] }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchItems = async (): Promise<Item[]> => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data.data;  // Assuming the response structure is { data: [...] }
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};