import React from 'react';
import { Box, Typography} from '@mui/material';

const CheckoutPage = () => {
    return (
        <Box padding={2} display="flex" justifyContent="center" alignItems="center" height="80vh" flexDirection = "column"
        textAlign = "center">
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>
            <Typography variant="h6">
                Thank you for your purchase! Your order is being processed.
            </Typography>
        </Box>
    );
};

export default CheckoutPage;
