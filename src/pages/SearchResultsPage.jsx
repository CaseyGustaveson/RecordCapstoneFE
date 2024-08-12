import React, { useEffect, useState } from 'react';
import { getProductsBySearch } from '../api/productSearch';
import { Typography, Box, CircularProgress, Grid, Snackbar, Alert } from '@mui/material';
import ProductCard from '../components/ProductCard'; // Adjust the import path as needed
import axios from 'axios';

const CART_API_URL = import.meta.env.VITE_CART_API_URL;

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filterTerm, setFilterTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const searchTerm = new URLSearchParams(window.location.search).get('query') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsBySearch(searchTerm);
        console.log('Fetched Products:', data);
        if (data) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        CART_API_URL,
        { productId, quantity },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Item added to cart:', response.data);
      setSuccess('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      if (error.response?.status === 403) {
        setError('Session expired. Please log in again.');
        localStorage.removeItem("token");
        setToken(null);
      } else {
        setError('Failed to add item to cart');
      }
    }
  };

  const handleAddToCart = (productId) => {
    if (!token) {
      setError('Please log in to add items to the cart.');
      return;
    }
    addToCart(productId, 1);
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Search Results
      </Typography>
      <Grid container spacing={2}>
        {filteredProducts.length === 0 ? (
          <Typography variant="body1">No products found</Typography>
        ) : (
          filteredProducts.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                onAdd={() => handleAddToCart(product.id)} // Pass the handleAddToCart function
              />
            </Grid>
          ))
        )}
      </Grid>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>
    </Box>
  );
};

export default SearchResultsPage;