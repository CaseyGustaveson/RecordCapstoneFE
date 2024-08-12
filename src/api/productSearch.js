import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const PRODUCTS_API_URL = `${API_URL}/api/products`;

// Fetch products by search query
export const getProductsBySearch = async (query) => {
  try {
    const response = await axios.get(`${PRODUCTS_API_URL}/search`, {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error; // Ensure the error is properly handled
  }
};

// Fetch all products with pagination
export const getProducts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${PRODUCTS_API_URL}/paginate`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], totalPages: 1 };
  }
};

// Fetch a single product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${PRODUCTS_API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(PRODUCTS_API_URL, productData, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${PRODUCTS_API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    await axios.delete(`${PRODUCTS_API_URL}/${productId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return null;
  }
};

// Fetch products by category
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(PRODUCTS_API_URL, {
      params: { categoryId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};
