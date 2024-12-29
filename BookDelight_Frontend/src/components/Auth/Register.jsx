import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    CircularProgress,
    Typography,
    LinearProgress,
    DialogContent,
    DialogTitle, DialogActions
} from "@mui/material";
import axios from "axios";
import LogoLink from "../../utils/LogoLink";
import {useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";
import theme from "../../utils/SimpleButtonTheme";
import {ThemeProvider} from "@mui/material/styles";
import BootstrapDialog from "../../utils/BootstrapDialog";
import {useAuth} from "./SessionHandling";

// Register page

const getPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
};

function Register() {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [openView, setViewOpen] = useState(false);

    const handleClickViewOpen = () => {
        setViewOpen(true);
    };

    const handleViewClose = () => {
        setViewOpen(false);
    };

    const strength = getPasswordStrength(password);

    const getStrengthLabel = () => {
        switch (strength) {
            case 0:
            case 1:
                return "Very Weak";
            case 2:
                return "Weak";
            case 3:
                return "Medium";
            case 4:
                return "Strong";
            case 5:
                return "Very Strong";
            default:
                return "";
        }
    };

    const getStrengthColor = () => {
        switch (strength) {
            case 0:
            case 1:
                return "red";
            case 2:
                return "orange";
            case 3:
                return "purple";
            case 4:
                return "blue";
            case 5:
                return "green";
            default:
                return "";
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            // Rejestracja
            const registerResponse = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/register`,
                { email, password, username, firstName, lastName, birthday },
                { headers: { "Content-Type": "application/json" } }
            );

            toast.success("Register successful! Logging you in...", {
                position: "top-center",
            });

            const loginResponse = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/login`,
                { identity:email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            const { token, user } = loginResponse.data;

            login({ token, user });

            setTimeout(() => {
                navigate("/user/change-photo");
            }, 1500);

        } catch (err) {
            console.error("Register or login failed:", err);
            toast.error("Invalid data. Please try again.", {
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
                    <h1 className="text-xl lg:text-2xl font-bold font-mono">Register</h1>
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
                            label="Email address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Box mt={2}>
                            <Typography variant="body2" style={{color: getStrengthColor()}}>
                                {getStrengthLabel()}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={(strength / 5) * 100}
                                style={{height: 10, backgroundColor: "#e0e0e0", borderRadius: 5}}
                            />
                        </Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flex w-full">
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" onClick={handleClickViewOpen}>
                                    View Hint
                                </Button>
                            </ThemeProvider>
                        </div>
                        <BootstrapDialog
                            onClose={handleViewClose}
                            aria-labelledby="customized-dialog-title"
                            open={openView}
                        >
                            <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                                Hint
                            </DialogTitle>
                            <DialogContent dividers>
                                <Typography gutterBottom>
                                    <p>The password must contain:</p>
                                    <p>- upper and lower case letters</p>
                                    <p>- special character</p>
                                    <p>- number</p>
                                    <p>- must be longer than 8 characters</p>
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleViewClose}>
                                    Close
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="username"
                            label="Username"
                            id="username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="firstName"
                            label="First name"
                            id="firstName"
                            autoComplete="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="lastname"
                            label="Last name"
                            id="lastName"
                            autoComplete="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="birthday"
                            label="Birthday"
                            id="birthday"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                        <div className="flex w-full mt-6">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24}/> : "Sign Up"}
                            </Button>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Register;
