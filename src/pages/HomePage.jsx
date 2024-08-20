import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const styles = {
    backgroundContainer: {
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    },
    contentContainer: {
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '20px',
      borderRadius: '10px',
    },
    button: {
      marginTop: '20px',
    },
    infoText: {
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.backgroundContainer}>
      <Container style={styles.contentContainer}>
        <Typography variant="h2" gutterBottom>
          Welcome to Our Store!
        </Typography>
        <Typography variant="h6" paragraph>
          Shop our wide collection of records!
        </Typography>
    <Button component={Link} to="/products" variant="contained" color="primary" size="large" style={styles.button}>
  Shop Now
</Button>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
          </Grid>
          <Grid item xs={12} sm={6}>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
