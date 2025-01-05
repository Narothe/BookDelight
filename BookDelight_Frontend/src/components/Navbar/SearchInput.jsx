import { TextField, Box } from "@mui/material";

function SearchInput({ value, onChange, onFocus }) {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
                fontSize: "0.5rem",
                justifyContent: "center",
                maxWidth: "100%",
                "& .MuiOutlinedInput-root": {
                    borderColor: "#BBBFCA",
                    "&:hover fieldset": {
                        borderColor: "#BBBFCA",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#BBBFCA",
                    },
                },
            }}
        >
            <TextField
                fullWidth
                label="Search for books"
                id="search-books"
                variant="outlined"
                size="small"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                sx={{
                    input: { fontSize: { xs: "0.875rem", md: "1rem" } },
                }}
            />
        </Box>
    );
}

export default SearchInput;
