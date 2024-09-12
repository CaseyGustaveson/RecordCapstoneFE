import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Stack, Box } from '@mui/material';

const ProductCard = ({ product, onAdd, categoryName }) => {
  const defaultImage = 'https://via.placeholder.com/200x140?text=No+Image';

  const productName = product?.name || 'No Name';
  const productPrice = product?.price?.toFixed(2) || '0.00';
  const productReleaseYear = product?.releaseYear || 'Unknown';
  const productCategory = categoryName || 'Unknown';
  const productQuantity = product?.quantity || 0;
  const productImageUrl = product?.imageUrl || defaultImage;

  return (
    <Card sx={{ width: 300, borderRadius: 2, boxShadow: 3, margin: 1, overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 Aspect Ratio
        }}
      >
        <CardMedia
          component="img"
          alt={productName}
          image={productImageUrl}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="h6" component="div" sx={{ mb: 1, textAlign: 'center', fontSize: '1rem' }}>
          {productName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.9rem' }}>
          ${productPrice}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.9rem' }}>
          Release Year: {productReleaseYear}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.9rem' }}>
          Category: {productCategory}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.9rem' }}>
          {productQuantity} in stock
        </Typography>
      </CardContent>
      <CardContent sx={{ paddingTop: 0, paddingBottom: 1 }}>
        <Stack direction="row" spacing={0.5} justifyContent="center">
          <Button variant="contained" color="primary" size="small" onClick={() => onAdd(product.id)}>
            Add To Cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
