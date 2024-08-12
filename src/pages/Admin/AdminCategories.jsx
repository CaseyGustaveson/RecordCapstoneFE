import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CATEGORY_API_URL = import.meta.env.VITE_CATEGORY_API_URL;

const AdminCategories = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const checkAuth = () => {
      if (!token) {
        navigate("/login");
      } else if (role !== "ADMIN") {
        navigate("/");
      } else {
        fetchCategories();
      }
    };
    checkAuth();
  }, [navigate, token, role]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORY_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        throw new Error("An error occurred");
      }
      setIsLoading(false);
    } catch (error) {
      setError("Failed to fetch categories");
      setIsLoading(false);
    }
  };
  const addCategory = async () => {
    try {
      const response = await axios.post(
        CATEGORY_API_URL,
        { ...newCategory, name: newCategory.name.toUpperCase() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories([...categories, response.data]);
      setNewCategory({ name: "" });
      setSuccess("Category added successfully");
    } catch (error) {
      setError("Failed to add category");
    }
  };
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${CATEGORY_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      setError("Failed to delete category");
    }
  };
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Box padding={2}>
      <Stack spacing={2} direction="row">
        <TextField
          label="Category Name"
          variant="outlined"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ name: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={addCategory}>
          Add Category
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Typography variant="h4" gutterBottom>Categories</Typography>
      <Stack spacing={2}>
        {categories.map((category) => (
          <Box key={category.id} display="flex" alignItems="center">
            <Typography>{category.name}</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteCategory(category.id)}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Stack>
      </Box>
  );
};

export default AdminCategories;
