import React, { useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import LogoLink from "../../utils/LogoLink";
import {Link, useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { toast } from "react-hot-toast";

const theme = createTheme({
    palette: {
        primary: {
            main: '#495464',
            dark: '#E8E8E8',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    minWidth: '5rem',
                    '&:hover': {
                        color: '#000000',
                    },
                },
            },
        },
    },
});

function LoginPage() {
    const [identity, setIdentity] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/login`,
                { identity, password },
                { headers: { "Content-Type": "application/json" } }
            );
            toast.success("Login successful! Redirecting...", {
                position: "top-center",
            });
            console.log("Login successful:", response.data);

            setTimeout(() => {
                navigate("/books");
            }, 1500); // Krótkie opóźnienie przed przekierowaniem
        } catch (err) {
            console.error("Login failed:", err);
            toast.error("Invalid email or password. Please try again.", {
                position: "top-center",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-4 mt-10 justify-items-center">
            <div className="pt-2 pb-3">
                <LogoLink/>
            </div>
            <div className="border pt-4 p-2 mb-4 md:w-1/2 xl:w-1/3 rounded-md shadow-md bg-custom-new-white">
                <div className="flex flex-col border p-4 mb-4 items-center rounded-md shadow-md bg-white">
                    <h1 className="text-xl lg:text-2xl font-bold font-mono">Login</h1>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{mt: 1, width: "100%"}}
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
                        <div className="flex w-full mt-6">
                            <ThemeProvider theme={theme}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24}/> : "Sign In"}
                                </Button>
                            </ThemeProvider>
                        </div>
                    </Box>
                </div>
                <div className="flex flex-row mx-1 mb-2 justify-between text-center">
                    <div className="flex lg:flex-row flex-col items-center">
                        <p className="hover:text-custom-hover-light-blue mr-2">Don't have an account?</p>
                        <Link to="/register">
                            <p className="hover:text-custom-hover-light-blue">Sign up</p>
                        </Link>
                    </div>
                    <div className="flex items-center ">
                        <Link to="/register">
                        <p className="hover:text-custom-hover-light-blue">Forgot password?</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
