import React, {useState} from "react";
import LogoLink from "../../utils/LogoLink";
import {Box, Button, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useAuth} from "./SessionHandling";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../../utils/SimpleButtonTheme";
import LinkButton from "../../utils/LinkButton";

function UserVerify() {
    const {authData} = useAuth();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/user/is-verified`,
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`
                    },
                }
            );

            if (response.data === true) {
                toast.error("You are already verified! Redirecting...", {
                    position: "top-center",
                    icon: "😱",
                });

                setTimeout(() => {
                    navigate("/books");
                }, 1500);

            } else {
                const verifyResponse = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/user/verify`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${authData.token}`,
                        },
                    }
                );

                if (verifyResponse.status === 200 && verifyResponse.data.message) {
                    console.log("Verification email sent:", verifyResponse.data.message);
                    toast.success("Verification email sent!\nPlease check your mail", {
                        position: "top-center",
                    });

                    setTimeout(() => {
                        toast.success("Redirecting...", {
                            position: "top-center",
                        });

                        setTimeout(() => {
                            navigate("/books");
                        }, 1500);

                    }, 6000);
                } else {
                    console.log("Verification failed:", verifyResponse.data.error || "Unknown error");
                    toast.error(verifyResponse.data.error || "Verification failed. Please try again later.", {
                        position: "top-center",
                    });
                }
            }

        } catch (err) {
            console.error("Verify failed:", err);
            toast.error("Verify failed. Please try again later.", {
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
                    <h1 className="text-xl lg:text-2xl font-bold font-mono">Verify email</h1>
                    <p className="text-sm lg:text-base text-center mt-1">Verification will help us to show people who intend to engage with the platform for the long term 😄</p>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{mt: 1, width: "100%"}}
                    >
                        <div className="flex place-content-center pt-4">
                            <div className="flex flex-row justify-between w-48">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    >
                                    {loading ? <CircularProgress size={24}/> : "Verify"}
                                </Button>

                                <ThemeProvider theme={theme}>
                                    <LinkButton text="Cancel" link="/books"/>
                                </ThemeProvider>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default UserVerify;
