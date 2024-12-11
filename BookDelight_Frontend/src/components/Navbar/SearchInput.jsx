import { TextField, Box } from '@mui/material';

// Search input field for the Navbar.

function SearchInput() {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
                pr: 1,
                fontSize: '0.5rem',
                justifyContent: 'center',
                maxWidth: '100%',
            '& .MuiOutlinedInput-root': {
                borderColor: '#BBBFCA',
                '&:hover fieldset': {
                    borderColor: '#BBBFCA',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#BBBFCA',
                },
            },
        }}>
            <TextField
                fullWidth
                label="Search for books"
                id="search-books"
                variant="outlined"
                size="small"
                sx={{
                    input: { fontSize: { xs: '0.875rem', md: '1rem' } },
                }}
            />
        </Box>

    );
}

export default SearchInput;
