// import React from 'react';
// import LogoLink from "../../utils/LogoLink";
//
// function Login() {
//     return (
//         <div className="justify-items-center">
//             <div className="pt-2 pb-2">
//                 <LogoLink/>
//             </div>
//             <div className="border pt-4 p-2 mb-4 w-1/2 rounded-md shadow-md bg-custom-new-white">
//                 <div className="flex flex-col border p-4 mb-4 rounded-md shadow-md bg-white">
//                     <h1 className="text-2xl lg:text-3xl font-bold mb-6 font-mono">Log in</h1>
//
//
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default Login;

import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Grid, Paper, CircularProgress, Alert } from "@mui/material";
import axios from "axios";

function LoginPage() {
    const [identity, setIdentity] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/login`,
                {identity, password },
                { headers: { "Content-Type": "application/json" } }
            );
            console.log("Login successful:", response.data);
            // Symulacja nawigacji po logowaniu (zastąp prawdziwą nawigacją, np. `useNavigate`)
            alert("Login successful! Redirecting...");
            setLoading(false);
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password. Please try again.");
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
                        {error}
                    </Alert>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, width: "100%" }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "#6B7AA1" }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Sign In"}
                    </Button>
                </Box>
                <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                    <Grid item>
                        <Typography variant="body2">
                            Don't have an account? <a href="/register">Sign up</a>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">
                            <a href="/forgot-password">Forgot password?</a>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default LoginPage;
