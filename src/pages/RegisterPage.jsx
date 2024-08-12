import React, { useState } from "react";
import { Alert, Button, TextField, Snackbar, Stack, Box } from "@mui/material";



const RegisterPage = () => {
        const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [openAlert, setOpenAlert] = useState(false);

    const handleRegister = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstname,
                    lastname,
                    phone,
                    address,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setPassword("");
                setEmail("");
                setFirstName("");
                setLastName("");
                setAddress("");
                setPhone("");
    
                setAlertMessage("Registration successful!");
                setAlertSeverity("success");
            } else {
                setAlertMessage(data.error || "Registration failed. Please try again.");
                setAlertSeverity("error");
            }
        } catch (error) {
            console.error("Error registering:", error);
            setAlertMessage("Registration failed. Please try again.");
            setAlertSeverity("error");
        }
        setOpenAlert(true);
    };
    

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            padding={2}
        >
            <Box
                component="form"
                display="flex"
                flexDirection="column"
                alignItems="center"
                maxWidth={400}
                width="100%"
            >
                <h1>Register Page</h1>
                <Stack spacing={2} width="100%">
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        sx={{ maxWidth: 350 }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        sx={{ maxWidth: 350 }}
                    />
                    <TextField
                        label="First Name"
                        variant="outlined"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                        sx={{ maxWidth: 350 }}
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                        sx={{ maxWidth: 350 }}
                    />
                    
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                        sx={{ maxWidth: 350 }}
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                        sx={{ maxWidth: 350 }} 
                    />
                    <Button
                        onClick={handleRegister}
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ maxWidth: 350 }}
                    >
                        Register
                    </Button>
                </Stack>
            </Box>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                action={
                    <Button color="inherit" onClick={handleCloseAlert}>
                        Close
                    </Button>
                }
            >
                <Alert onClose={handleCloseAlert} severity={alertSeverity}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RegisterPage;
