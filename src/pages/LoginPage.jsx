import React, { useState } from 'react';
import { Alert, Typography, Button, TextField, Snackbar, Stack, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';

const LoginPage = ({ setIsLoggedIn, setUserRole }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [openAlert, setOpenAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            console.log('Attempting login with:', { email, password });
    
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Login successful:', data);
            console.log('User role:', data.role);
    
            setAlertMessage('Login successful!');
            setAlertSeverity('success');
            setOpenAlert(true);
    
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
    
            setIsLoggedIn(true);
            setUserRole(data.role);
    
            if (data.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setAlertMessage(error.message || 'Login failed.');
            setAlertSeverity('error');
            setOpenAlert(true);
        } finally {
            setLoading(false);
        }
    };
    const handleSingup = () => {
        navigate('/register');
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="70vh"
            padding={3}
        >
            <Typography variant="h4" align="center" gutterBottom>Login Page</Typography>
            <Stack spacing={2} width="100%" maxWidth={400}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />
                <Button
                    onClick={handleLogin}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
                <Button onClick={handleSingup} variant="outlined" color="primary" fullWidth>
                    Sign up
                </Button>
            </Stack>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                action={
                    <Button color="inherit" size="small" onClick={handleCloseAlert}>
                        Close
                    </Button>
                }
            >
                <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginPage;
