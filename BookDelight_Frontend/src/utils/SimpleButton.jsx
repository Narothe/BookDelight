import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Button from "@mui/material/Button";
import theme from "../utils/SimpleButtonTheme";

function SimpleButton({ text }) {



    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained">{text}</Button>
        </ThemeProvider>
    );

    // return (
    //     <button className="bg-orange-100 hover:bg-orange-200 px-7 rounded-full">
    //         <p className="pb-1">{text}</p>
    //     </button>
    // );
}

export default SimpleButton;
