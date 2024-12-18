import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import axios from "axios";

const SessionHandling = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    const login = (data) => {
        setAuthData(data);
        localStorage.setItem("authData", JSON.stringify(data));

        setupTokenExpiryWatcher(data.token);
    };

    const logout = async () => {
        try {
            if (authData?.token) {
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${authData.token}`,
                        },
                    }
                );
            }
            toast("Logout. See You next time", {
                position: "top-center",
                icon: "👋🏽",
            });
        } catch (err) {
            console.error("Error during logout:", err);
        } finally {
            setAuthData(null);
            localStorage.removeItem("authData");
        }
    };

    const setupTokenExpiryWatcher = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now();
            const expiryTime = decodedToken.exp * 1000;

            if (expiryTime > currentTime) {
                const timeUntilExpiry = expiryTime - currentTime;

                setTimeout(() => {
                    toast("Your session has expired!", {
                        position: "top-center",
                        icon: "⏳",
                    });
                    logout();
                }, timeUntilExpiry);
            } else {
                toast("Your session has expired!", {
                    position: "top-center",
                    icon: "⏳",
                });
                logout();
            }
        } catch (error) {
            console.error("Error setting up token expiry watcher:", error);
            logout();
        }
    };

    useEffect(() => {
        const storedAuthData = localStorage.getItem("authData");

        if (storedAuthData) {
            const parsedData = JSON.parse(storedAuthData);
            const decodedToken = jwtDecode(parsedData.token);
            const isTokenValid = decodedToken.exp * 1000 > Date.now();

            if (isTokenValid) {
                setAuthData(parsedData);
                setupTokenExpiryWatcher(parsedData.token);
            } else {
                toast("Your session has expired!", {
                    position: "top-center",
                    icon: "⏳",
                });
                logout();
            }
        }
    }, []);

    return (
        <SessionHandling.Provider value={{ authData, login, logout }}>
            {children}
        </SessionHandling.Provider>
    );
};

export const useAuth = () => useContext(SessionHandling);
