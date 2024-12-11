import React, {useEffect, useState} from 'react';
import SearchBar from "./SearchBar";
import LinkButton from "../../utils/LinkButton";
import LogoLink from "../../utils/LogoLink";
import {useAuth} from "../Auth/SessionHandling";
import {CircularProgress, Menu, MenuItem, IconButton} from "@mui/material";
import axios from "axios";
import LoadUserImage from "../../utils/LoadUserImage";
import LoadUserBlankImage from "../../utils/LoadUserBlankImage";
import {Link} from "react-router-dom";
import plus from "../../assets/plus.svg";

function DesktopNavbar() {
    const {authData, logout} = useAuth();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

    const [anchor, setAnchor] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            if (!authData) return;

            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/user/${authData.user.userId}/photo`,
                    {
                        headers: {
                            Authorization: `Bearer ${authData.token}`,
                        },
                    }
                );
                setUserData(response.data);
                // console.log("User data fetched:", response.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [authData]);

    const handleMenuOpen = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchor(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        logout();
    };

    const handleSettings = () => {
        handleMenuClose();
        window.location.href = "/settings";
    };

    const handleProfile = () => {
        handleMenuClose();
        window.location.href = `/user/${authData.user.userId}`;
    };

    return (
        <nav className="flex justify-between mb-9 p-2 border-y">
            <LogoLink/>
            <div className="flex flex-auto items-center mr-2">
                <SearchBar/>
            </div>
            {authData ? (
                <div className="flex flex-row place-content-center items-center">
                    <div className="flex justify-items-center content-center h-auto pr-1">
                        <Link
                            to="/add-book"
                            className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden hover:animate-spin border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">
                            <img src={plus} alt="advanced" className="w-5"/>

                        </Link>
                    </div>
                    {loading && <CircularProgress size={24}/>}
                    {error && (
                        <div className="w-12">
                            <IconButton onClick={handleMenuOpen} size="small">
                                <LoadUserBlankImage/>
                            </IconButton>
                        </div>
                    )}
                    {!loading && !error && userData?.photo_path && (
                        <div className="w-12 h-12">
                            <IconButton onClick={handleMenuOpen} size="small">
                                <LoadUserImage item={userData} photoUrl={photoUrl}/>
                            </IconButton>
                        </div>
                    )}
                    <Menu
                        anchorEl={anchor}
                        open={Boolean(anchor)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleSettings}>Settings</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>

                </div>
            ) : (
                <div className="grid place-content-center">
                    <LinkButton text="Log in" link="/login"/>
                </div>
            )}
        </nav>
    );
}

export default DesktopNavbar;
