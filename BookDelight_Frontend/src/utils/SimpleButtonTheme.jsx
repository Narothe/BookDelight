import {createTheme} from "@mui/material/styles";

// Theme for simple buttons

function SimpleButtonTheme() {

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
                        minWidth: '5rem',
                        '&:hover': {
                            color: '#ffffff',
                        },
                    },
                },
            },
        },
    });

    return (theme);
}

export default SimpleButtonTheme;
