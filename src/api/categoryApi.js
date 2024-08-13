import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCategories = async () => {
  try {
    const response = await axios.get(API_URL/"api/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}


export const getCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/api/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL/"api/categories", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    return null;
  }
}

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axios.put(`${API_URL}/api/categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
}

export const deleteCategory = async (categoryId) => {
  try {
    await axios.delete(`${API_URL}/api/categories/${categoryId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return null;
  }
}

