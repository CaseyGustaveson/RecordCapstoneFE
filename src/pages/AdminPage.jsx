import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const AdminPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    useEffect(() => {
        const checkAuth = () => {
            if (!token) {
                navigate('/login');
            } else if (role !== 'ADMIN') {
                navigate('/unauthorized');
            } else {
                setIsLoading(false); 
            }
        };

        checkAuth();
    }, [navigate, token, role]);

    if (isLoading) {
        return <Box padding={3}>Loading...</Box>;
    }

    const handleNavigation = (path) => {
        navigate(path);
    };


    return (
        <Box padding={3}>
            <Typography variant="h4" align="center" gutterBottom>Admin Dashboard</Typography>
            <Stack direction="row" justifyContent="center" spacing={2} flexWrap="wrap">

                <Button variant="contained" onClick={() => handleNavigation('/admin/products')}>Products</Button>
                <Button variant="contained" onClick={() => handleNavigation('/admin/users/')}>Users</Button>
                <Button variant="contained" onClick={() => handleNavigation('/admin/categories')}>Categories</Button>
            </Stack>
        </Box>
    );
};

export default AdminPage;
