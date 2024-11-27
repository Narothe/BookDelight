import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Auth/SessionHandling";
import axios from "axios";
import {toast} from "react-hot-toast";
import {Box, Button, CircularProgress, TextField} from "@mui/material";


function AddBook() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [title, setTitle] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publication_date, setPublication_date] = useState("");
    const [isbn, setIsbn] = useState("");
    const [book_length, setBook_length] = useState();
    let [authors, setAuthors] = useState("");
    const [short_description, setShort_description] = useState("");
    const [long_description, setLong_description] = useState("");
    let [genres, setGenres] = useState("");

    const navigate = useNavigate();
    const {authData} = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        console.log(authors);
        console.log(genres);

        authors = authors.split(",").map((author) => author.trim());
        genres = genres.split(",").map((genre) => genre.trim());

        console.log(authors);
        console.log(genres);

        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/add-book`,
                {
                    title,
                    publisher,
                    publication_date,
                    isbn,
                    book_length,
                    authors,
                    short_description,
                    long_description,
                    genres
                },
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`,
                    },
                }
                );

            toast.success("Book added successfully! Redirecting...", {
                position: "top-center",
            });

            setTimeout(() => {
                navigate("/books");
            }, 1500);

        } catch (err) {
            console.error("Add Book failed:", err);
            toast.error("Invalid data. Please try again.", {
                position: "top-center",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
            setIsbn(value);

            if (value.length === 10 || value.length === 13 || value.length === 0) {
                setError(false);
            } else {
                setError(true);
            }
        }
    };

    return (
        <div className="mx-4 justify-items-center">
            <div className="border pt-4 p-2 mb-4 md:w-1/2 xl:w-1/2 rounded-md shadow-md bg-custom-new-white">
                <div className="flex flex-col border p-4 mb-4 items-center rounded-md shadow-md bg-white">
                    <h1 className="text-xl lg:text-2xl font-bold font-mono">Add Book</h1>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{mt: 1, width: "100%"}}
                    >
                        {/*<div className="flex justify-between">*/}
                            <div className="flex flex-col px-4">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline
                                    rows={2}
                                    id="title"
                                    label="Book Title"
                                    name="title"
                                    autoComplete="title"
                                    autoFocus
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="publisher"
                                    label="Book Publisher"
                                    name="publisher"
                                    autoComplete="publisher"
                                    value={publisher}
                                    onChange={(e) => setPublisher(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    id="publication_date"
                                    label="Publication Date"
                                    name="publication_date"
                                    autoComplete="publication_date"
                                    value={publication_date}
                                    onChange={(e) => setPublication_date(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    type="number"
                                    id="isbn"
                                    label="ISBN"
                                    name="isbn"
                                    autoComplete="isbn"
                                    value={isbn}
                                    onChange={handleChange}
                                    error={error}
                                    helperText={error ? "ISBN number must be exactly 10 or 13 digits." : ""}
                                    inputProps={{
                                        maxLength: 13,
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="number"
                                    id="book_length"
                                    label="Book Length"
                                    name="book_length"
                                    autoComplete="book_length"
                                    value={book_length}
                                    onChange={(e) => setBook_length(e.target.value)}
                                />

                            </div>
                            <div className="flex flex-col px-4">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="authors"
                                    label="Authors"
                                    name="authors"
                                    autoComplete="authors"
                                    value={authors}
                                    onChange={(e) => setAuthors(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="genres"
                                    label="Genres"
                                    name="genres"
                                    autoComplete="genres"
                                    value={genres}
                                    onChange={(e) => setGenres(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="short_description"
                                    label="Short Description"
                                    name="short_description"
                                    autoComplete="short_description"
                                    value={short_description}
                                    onChange={(e) => setShort_description(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="long_description"
                                    label="Long Description"
                                    name="long_description"
                                    autoComplete="long_description"
                                    value={long_description}
                                    onChange={(e) => setLong_description(e.target.value)}
                                />
                            </div>
                        {/*</div>*/}
                        <div className="flex w-full mt-6">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24}/> : "Add new Book"}
                            </Button>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default AddBook;
