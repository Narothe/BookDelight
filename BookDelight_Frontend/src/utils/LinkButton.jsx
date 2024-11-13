import React from 'react';
import {Link} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Button from "@mui/material/Button";

function LinkButton({ text, link }) {

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
                    // outlined: {
                    //     borderColor: '#6B7AA1',
                    //     borderWidth: '2px',
                    //     color: '#6B7AA1',
                    //     '&:hover': {
                    //         backgroundColor: '#E0E5EC',
                    //         borderColor: '#4B5C93',
                    //     },
                    // },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained" component={Link} to={link}>{text}</Button>
        </ThemeProvider>
    );

    // return (
    //     <Link to={link} className="bg-custom-light-blue hover:bg-custom-hover-light-blue text-white px-7 h-7 text-center whitespace-nowrap rounded-full active:border-custom-light-blue">
    //         <p className="pb-1">{text}</p>
    //     </Link>
    // );


}

export default LinkButton;
