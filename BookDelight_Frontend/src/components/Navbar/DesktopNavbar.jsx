import React from 'react';
import SearchBar from "./SearchBar";
import LinkButton from "../../utils/LinkButton";
import LogoLink from "../../utils/LogoLink";
import {useAuth} from "../Auth/SessionHandling";
import {Button} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../../utils/SimpleButtonTheme";

function DesktopNavbar() {
    const { authData, logout } = useAuth();

    return (
        <nav className="flex justify-between mb-9 p-2 border-y">
            <LogoLink/>
            <div className="flex flex-auto items-center mr-2">
                <SearchBar/>
            </div>
            {authData ? (
                <div className="grid place-content-center">
                    <ThemeProvider theme={theme}>
                        <Button
                            onClick={() => {
                                console.log("Logout button clicked"); // Debugging
                                logout();
                            }}
                            color="primary"
                            variant="contained"
                        >
                            Logout
                        </Button>
                    </ThemeProvider>
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
