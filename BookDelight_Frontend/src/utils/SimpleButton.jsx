import React from 'react';
import {ThemeProvider} from "@mui/material/styles";
import Button from "@mui/material/Button";
import theme from "../utils/SimpleButtonTheme";

// Button with additional styles

function SimpleButton({ text }) {

    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained">{text}</Button>
        </ThemeProvider>
    );
}

export default SimpleButton;
