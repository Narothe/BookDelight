import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Button from "@mui/material/Button";


function SimpleButton({ text }) {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#BBBFCA',
                dark: '#262c37',
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        width: '5rem',
                        '&:hover': {
                            color: '#ffffff',
                        },
                    },
                    // outlined: {
                    //     borderColor: '#FFEDD5',
                    //     borderWidth: '2px',
                    //     color: '#FFEDD5',
                    //     '&:hover': {
                    //         backgroundColor: '#ecece0',
                    //         borderColor: '#4B5C93',
                    //     },
                    // },
                },
            },
        },
    });

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
