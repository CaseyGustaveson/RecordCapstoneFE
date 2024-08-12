import axios from "axios";

const CATEGORY_API_URL = import.meta.env.VITE_CATEGORY_API_URL;

export const fetchCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}


export const getCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${CATEGORY_API_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(CATEGORY_API_URL, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    return null;
  }
}

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axios.put(`${CATEGORY_API_URL}/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    return null;
  }
}

export const deleteCategory = async (categoryId) => {
  try {
    await axios.delete(`${CATEGORY_API_URL}/${categoryId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return null;
  }
}

