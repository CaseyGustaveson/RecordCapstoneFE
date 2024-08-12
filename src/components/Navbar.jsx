import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField, Box } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, userRole, setIsLoggedIn, setUserRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  

  const handleNavigation = (path) => {
    navigate(path);
  };

  const backButton = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
      <Toolbar>
        <IconButton color="inherit" onClick={backButton}>
          <ArrowBack />
        </IconButton>
        <Button color="inherit" onClick={() => handleNavigation('/')} sx={{ textTransform: 'none' }}>
          <Typography variant="h6">
            My Record Shop
          </Typography>
        </Button>
        <Box display="flex" alignItems="center" sx={{ marginLeft: 'auto' }}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
            InputProps={{
              sx: { backgroundColor: 'white' },
            }}
            sx={{ marginRight: '8px', width: '200px' }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: '#76eec6', color: '#fff' }}
            onClick={handleSearchSubmit}
          >
            Search
          </Button>
        </Box>
        <Button color="inherit" onClick={() => handleNavigation('/')}>Home</Button>
        <Button color="inherit" onClick={() => handleNavigation('/products')}>Shop</Button>
        {!isLoggedIn ? (
          <>
            <Button color="inherit" onClick={() => handleNavigation('/register')}>Register</Button>
            <Button color="inherit" onClick={() => handleNavigation('/login')}>Login</Button>
          </>
        ) : (
          <>
            <IconButton color="inherit" onClick={() => handleNavigation(userRole === 'ADMIN' ? '/admin' : '/profile')}>
              <AccountCircleIcon />
              <Typography variant="body2" sx={{ marginLeft: '8px' }}>Profile</Typography>
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
        <IconButton color="inherit" onClick={() => handleNavigation('/cart')}>
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
