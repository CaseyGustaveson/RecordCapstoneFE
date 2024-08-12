import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, TextField, Snackbar, Alert, Box } from '@mui/material';
import { getUserProfile, updateUserProfile } from '../api/profileApi'; 
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
    const [profile, setProfile] = useState({ firstname: '', lastname: '', email: '', password: '', address: '' });
    const [isEditing, setIsEditing] = useState({ firstname: false, lastname: false, email: false, password: false, address: false });
    const [message, setMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(token);
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setMessage('Error fetching profile');
                setAlertSeverity('error');
                setShowSnackbar(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProfile = await updateUserProfile(token, profile);
            setProfile(updatedProfile);
            setMessage('Profile updated successfully');
            setAlertSeverity('success');
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile');
            setAlertSeverity('error');
        } finally {
            setShowSnackbar(true);
        }
    };
    

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    if (isLoading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <Container>
            <Box display = "flex" justifyContent="center" flexDirection={"column"} alignItems = "center" mb = {2}>
            <Typography variant="h4" gutterBottom>
                Profile
                </Typography>
                </Box>
            <form onSubmit={handleSubmit}>
                <Box display = "flex" justifyContent="center" alignItems = "center"mb = {2}>
                    <TextField
                        label="First Name"
                        name="firstname"
                        value={profile.firstname || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing.firstname}
                        halfWidth
                        margin="normal"
                    />
                    <Button onClick={() => handleEditToggle('firstname')}>
                        {isEditing.firstname ? 'Save' : 'Edit'}
                    </Button>
                </Box>
                <Box display = "flex" justifyContent="center" alignItems = "center" mb = {2}>
                    <TextField
                        label="Last Name"
                        name="lastname"
                        value={profile.lastname || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing.lastname}
                        halfWidth
                        margin="normal"
                    />
                    <Button onClick={() => handleEditToggle('lastname')}>
                        {isEditing.lastname ? 'Save' : 'Edit'}
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <TextField
                        label="Address"
                        name="address"
                        value={profile.address || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing.address}
                        halfWidth
                        margin="normal"
                    />
                    <Button onClick={() => handleEditToggle('address')}>
                        {isEditing.address ? 'Save' : 'Edit'}
                    </Button>
                </Box>
                    <Box display = "flex" justifyContent="center" alignItems = "center" mb = {2}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={profile.email || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing.email}
                        halfWidth
                        margin="normal"
                    />
                    <Button onClick={() => handleEditToggle('email')}>
                        {isEditing.email ? 'Save' : 'Edit'}
                    </Button>
    </Box>
    <Box display = "flex" justifyContent="center" alignItems = "center" mb = {2}>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={profile.password || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing.password}
                        halfWidth
                        margin="normal"
                    />
                    <Button onClick={() => handleEditToggle('password')}>
                        {isEditing.password ? 'Save' : 'Edit'}
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" mb={2} mr={9}  >
                <Button type="submit" variant="contained" color="primary">
                    Update Profile
                    </Button>
                    </Box>
                    
            </form>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={alertSeverity}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ProfilePage;