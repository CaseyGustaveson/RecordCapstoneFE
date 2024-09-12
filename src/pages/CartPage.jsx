import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = import.meta.env.VITE_API_URL;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCartItems(token);
    } else {
      setAlertMessage('No authentication token found.');
      setOpenAlert(true);
      setLoading(false);
    }
  }, []);

  const fetchCartItems = async (token) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCartItems(response.data);
    } catch (error) {
      setAlertMessage('Failed to fetch cart items. Please try again later.');
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const calculateTotalCost = () => {
      const total = cartItems.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
      }, 0);
      setTotalCost(total);
    };

    calculateTotalCost();
  }, [cartItems]);

  const updateQuantity = async (itemId, newQuantity) => {
    const token = localStorage.getItem('token');
    try {
      if (newQuantity <= 0) {
        await axios.delete(`${API_URL}/api/cart/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setCartItems(cartItems.filter((item) => item.id !== itemId));
      } else {
        await axios.put(
          `${API_URL}/api/cart/${itemId}`,
          { quantity: newQuantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setCartItems(
          cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (error) {
      setAlertMessage('Failed to update item quantity. Please try again later.');
      setOpenAlert(true);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_URL}/api/checkout`,
        { cartItems },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/checkout');
      setAlertMessage(response.data.message);
      setOpenAlert(true);
      setCartItems([]);
    } catch (error) {
      setAlertMessage('Failed to checkout. Please try again later.');
      setOpenAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    updateQuantity(itemId, 0);
  };

  return (
    <Box
      padding={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#fafafa' }}
    >
      <Typography variant="h3" gutterBottom color="primary">
        Your Cart
      </Typography>
      {loading ? (
        <CircularProgress size={50} />
      ) : cartItems.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Your cart is empty
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} display="flex" justifyContent="center">
                <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, width: '100%', maxWidth: 300 }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      style={{
                        width: '100%',
                        height: 150,
                        objectFit: 'contain',
                        borderRadius: '8px',
                        marginBottom: 8,
                      }}
                    />
                    <Typography variant="h6" gutterBottom>
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Category: {item.product.category}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      ${item.product.price.toFixed(2)}
                    </Typography>
                    <Box display="flex" alignItems="center" marginTop={1}>
                      <Typography variant="body1" marginRight={1}>
                        Quantity:
                      </Typography>
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(event) => handleQuantityChange(item.id, event)}
                        sx={{ width: 60, textAlign: 'center' }}
                        inputProps={{ min: 0 }}
                      />
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{ marginTop: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box marginTop={3} width="100%" maxWidth={600} textAlign="center">
            <Typography variant="h5">
              Total: ${totalCost.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              sx={{ marginTop: 2, padding: '10px 20px' }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertMessage.includes('Error') ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CartPage;
