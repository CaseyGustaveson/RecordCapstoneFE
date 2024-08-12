import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

const PRODUCTS_API_URL = import.meta.env.VITE_PRODUCTS_API_URL;
const CATEGORY_API_URL = import.meta.env.VITE_CATEGORY_API_URL;

const AdminProducts = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    releaseYear: "",
    price: "",
    quantity: "",
    categoryId: "",
    imageUrl: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
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
        fetchInitialData();
      }
    };

    const fetchInitialData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get(PRODUCTS_API_URL, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(CATEGORY_API_URL, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (
          Array.isArray(productsResponse.data) &&
          Array.isArray(categoriesResponse.data)
        ) {
          setProducts(productsResponse.data);
          setCategories(categoriesResponse.data);
        } else {
          throw new Error("Unexpected response format");
        }
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, token, role]);

  const handleSubmit = async () => {
    if (editMode) {
      await editProduct(currentProductId);
    } else {
      await addProduct();
    }
  };

  const addProduct = async () => {
    try {
      console.log("Adding product with data:", newProduct); // Log the product data
      const response = await axios.post(
        PRODUCTS_API_URL,
        {
          ...newProduct,
          categoryId: newProduct.categoryId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts([...products, response.data]);
      setNewProduct({
        name: "",
        releaseYear: "",
        price: "",
        quantity: "",
        categoryId: "",
        imageUrl: "",
      });
      setSuccess("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message); // Log the error response
      setError("Failed to add product");
    }
  };

  const editProduct = async (id) => {
    try {
      const response = await axios.put(
        `${PRODUCTS_API_URL}/${id}`,
        {
          ...newProduct,
          price: newProduct.price.toString(), // Ensure price is a string
          categoryId: newProduct.categoryId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(
        products.map((product) => (product.id === id ? response.data : product))
      );
      setNewProduct({
        name: "",
        releaseYear: "",
        price: "",
        quantity: "",
        categoryId: "",
        imageUrl: "",
      });
      setEditMode(false);
      setCurrentProductId(null);
      setSuccess("Product edited successfully");
    } catch (error) {
      setError("Failed to edit product");
    }
  };

  const handleEditClick = (product) => {
    setNewProduct(product);
    setEditMode(true);
    setCurrentProductId(product.id);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${PRODUCTS_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product.id !== id));
      setSuccess("Product deleted successfully");
    } catch (error) {
      setError("Failed to delete product");
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Stack spacing={2} direction="row" width="80%">
          <TextField
            label="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Release Year"
            value={newProduct.releaseYear}
            onChange={(e) =>
              setNewProduct({ ...newProduct, releaseYear: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Quantity"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={newProduct.categoryId}
              onChange={(e) =>
                setNewProduct({ ...newProduct, categoryId: e.target.value })
              }
              displayEmpty
              inputProps={{ "aria-label": "Select Category" }}
            >
              <MenuItem value=""></MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            {editMode ? "Save Changes" : "Add Product"}
          </Button>
        </Stack>
      </Box>
      <Grid container spacing={2} marginTop={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              padding={2}
              border="1px solid #ccc"
              borderRadius={5}
              height="100%"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <Typography variant="h5">Album: {product.name}</Typography>
                <Typography variant="body1">
                  Release Year: {product.releaseYear}
                </Typography>
                <Typography variant="body1">${product.price}</Typography>
                <Typography variant="body1">
                  {product.quantity} copies available
                </Typography>
                <Typography variant="body1">
                  Category: {getCategoryName(product.categoryId)}
                </Typography>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="100%"
                marginTop={2}
              >
                <Button
                  variant="contained"
                  onClick={() => handleEditClick(product)}
                  sx={{ width: "80%", marginBottom: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => deleteProduct(product.id)}
                  sx={{ width: "80%" }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess("")}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminProducts;