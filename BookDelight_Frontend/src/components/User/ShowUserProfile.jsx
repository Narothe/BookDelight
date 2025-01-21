import React, {useEffect, useState} from 'react';
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import {Button, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Typography} from "@mui/material";
import theme from "../../utils/SimpleButtonTheme";
import {ThemeProvider} from "@mui/material/styles";
import { FaHeart, FaStar, FaBook, FaBookmark } from "react-icons/fa";
import axios from "axios";
import {useParams} from "react-router-dom";
import TruncateText from "../../utils/TruncateText";
import OneUserBook from "./OneUserBook";
import BootstrapDialog from "../../utils/BootstrapDialog";
import {useAuth} from "../Auth/SessionHandling";
import {toast} from "react-hot-toast";

function ShowUserProfile({user}) {
    const { authData } = useAuth();

    const userPhotoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;
    const photoUrl = `${process.env.REACT_APP_BOOK_PHOTO_URL}`;

    const {id} = useParams();

    const [userCurrentlyReading, setUserCurrentlyReading] = useState(null);
    const [userWishRead, setUserWishRead] = useState(null);
    const [userFavorite, setUserFavorite] = useState(null);
    const [userRead, setUserRead] = useState(null);
    const [openView, setViewOpen] = useState(false);

    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAddGenre = async () => {
        if (!selectedGenre) return;
        setLoading(true);
        try {
            if (user.genres.includes(selectedGenre)) {
                toast.error("Genre already added!");
                return;
            }

            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/user/add-genre-preferences`,
                { genre: selectedGenre },
                { headers: { Authorization: `Bearer ${authData?.token}` } }
            );
            setGenres((prev) => prev.filter((g) => g !== selectedGenre));
            user.genres.push(selectedGenre);
            setSelectedGenre('');

            toast.success("Genre added successfully!");
        } catch (error) {
            console.error('Error adding genre:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAuthor = async () => {
        if (!selectedAuthor) return;
        setLoading(true);
        try {
            if (user.authors.includes(selectedAuthor)) {
                toast.error("Author already added!");
                return;
            }

            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/user/add-author-preferences`,
                { author: selectedAuthor },
                { headers: { Authorization: `Bearer ${authData?.token}` } }
            );
            setAuthors((prev) => prev.filter((a) => a !== selectedAuthor));
            user.authors.push(selectedAuthor);
            setSelectedAuthor('');

            toast.success("Author added successfully!");
        } catch (error) {
            console.error('Error adding author:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClickViewOpen = () => {
        setViewOpen(true);
    };

    const handleViewClose = () => {
        setViewOpen(false);
    };

    useEffect(() => {
        const fetchBookNested = async () => {
            try {
                if (user.currently_reading_amount != 0) {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}/currently-reading`);
                    setUserCurrentlyReading(response.data);
                }

                if (user.wish_read_amount != 0) {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}/wish-to-read`);
                    setUserWishRead(response.data);
                }

                if (user.favorite_amount != 0) {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}/favorite`);
                    setUserFavorite(response.data);
                }

                if (user.read_books_amount != 0) {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}/read-book`);
                    setUserRead(response.data);
                }

            } catch (err) {
                console.error('Error fetching book details:', err);
            }
        };

        const fetchPreferencesData = async () => {
            try {
                const [genresResponse, authorsResponse] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/genres`),
                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/authors`),
                ]);

                setGenres(genresResponse.data);
                setAuthors(authorsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBookNested();
        fetchPreferencesData();
    }, [id]);

    return (
        <div>
            <div className="flex flex-row pt-4 border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
                <div className="flex border pl-2 pt-4 pr-4 pb-4 mb-2 rounded-md shadow-md w-full bg-white">
                    <div className="flex flex-col items-center w-36 mt-3">
                        <div className="flex w-16 lg:w-20">
                            <LoadBookUserImage item={user} photoUrl={userPhotoUrl}/>
                        </div>
                        <div className="mt-2">
                            <p>{user.username}</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-5/6 pl-4 border-l">
                        {user.read_pages_amount &&
                            <p>Pages read in total: <strong> {user.read_pages_amount} </strong></p>
                        }
                        {user.last_added_currently_reading_title &&
                            <p>Last book added to Currently
                                Reading: <strong> "{user.last_added_currently_reading_title}"</strong></p>
                        }
                        <div className="mt-2">
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" onClick={handleClickViewOpen}>
                                    View Details
                                </Button>
                            </ThemeProvider>
                        </div>
                        <BootstrapDialog
                            onClose={handleViewClose}
                            aria-labelledby="customized-dialog-title"
                            open={openView}
                        >
                            <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                                {user.username} Details
                            </DialogTitle>
                            <DialogContent dividers>
                                <Typography gutterBottom>
                                    <strong>Favorites genres:</strong> {user.genres.join(', ') || "Not provided"}
                                </Typography>
                                <Typography gutterBottom>
                                    <strong>Favorites authors:</strong> {user.authors.join(', ') || "Not provided"}
                                </Typography>
                            </DialogContent>
                            {authData && authData.user.userId === user.id_user && (
                                <div className="px-4 pb-4 pt-2">
                                    <Typography variant="h6">Add Preferences:</Typography>
                                    <div>
                                        <Typography>Genres:</Typography>
                                        <Select
                                            value={selectedGenre}
                                            onChange={(e) => setSelectedGenre(e.target.value)}
                                            fullWidth
                                        >
                                            {genres.map((genre) => (
                                                <MenuItem key={genre} value={genre}>
                                                    {genre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <div className="mt-1.5">
                                            <Button
                                                onClick={handleAddGenre}
                                                variant="contained"
                                                disabled={loading || !selectedGenre}
                                            >
                                                Add Genre
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Typography>Authors:</Typography>
                                        <Select
                                            value={selectedAuthor}
                                            onChange={(e) => setSelectedAuthor(e.target.value)}
                                            fullWidth
                                        >
                                            {authors.map((author) => (
                                                <MenuItem key={author} value={author}>
                                                    {author}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <div className="mt-1.5">
                                            <Button
                                                onClick={handleAddAuthor}
                                                variant="contained"
                                                disabled={loading || !selectedAuthor}
                                            >
                                                Add Author
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <DialogActions>
                                <Button autoFocus onClick={handleViewClose}>
                                    Close
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                    <div className="flex flex-col w-1/4 pl-2.5 border-l">
                        <div className="hidden sm:block">
                            <p>{user.first_name} {user.last_name}</p>
                        </div>
                        <div className="block sm:hidden">
                            <p>{user.first_name} {TruncateText(user.last_name, 5)}</p>
                        </div>
                        <p>Age: {user.age}</p>
                        <p>Account created: {user.account_created_days_ago} days ago</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col pt-4 w-full border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
                <div className="text-2xl lg:text-3xl font-bold mb-1 font-mono pb-2 pl-2">
                    <p>Bookshelf</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap gap-2 flex-row">
                    <div
                        className="flex flex-col border p-4 mb-2 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex flex-col items-center text-center place-content-center">
                            <div className="flex flex-row">
                                <h3 className="text-lg font-bold mb-2">Currently reading books</h3>
                                <FaHeart className="text-red-500 mt-1.5 ml-2"/>
                            </div>
                            <p className="text-2xl text-blue-500 font-semibold">{user.currently_reading_amount}</p>
                        </div>
                        <OneUserBook userBook={userCurrentlyReading} photoUrl={photoUrl}/>
                    </div>
                    <div
                        className="flex flex-col border p-4 mb-2 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex flex-col items-center text-center place-content-center">
                            <div className="flex flex-row">
                                <h3 className="text-lg font-bold mb-2">Favorite books</h3>
                                <FaStar className="text-yellow-400 mt-1.5 ml-2"/>
                            </div>
                            <p className="text-2xl text-blue-500 font-semibold">{user.favorite_amount}</p>
                        </div>
                        <OneUserBook userBook={userFavorite} photoUrl={photoUrl}/>
                    </div>
                    <div
                        className="flex flex-col border p-4 mb-2 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex flex-col items-center text-center place-content-center">
                            <div className="flex flex-row">
                                <h3 className="text-lg font-bold mb-2">Read books</h3>
                                <FaBook className="text-green-500 mt-1.5 ml-2"/>
                            </div>
                            <p className="text-2xl text-blue-500 font-semibold">{user.read_books_amount}</p>
                        </div>
                        <OneUserBook userBook={userRead} photoUrl={photoUrl}/>
                    </div>
                    <div
                        className="flex flex-col border p-4 mb-2 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex flex-col items-center text-center place-content-center">
                            <div className="flex flex-row">
                                <h3 className="text-lg font-bold mb-2">Wish to read books</h3>
                                <FaBookmark className="text-blue-500 mt-1.5 ml-2"/>
                            </div>
                            <p className="text-2xl text-blue-500 font-semibold">{user.wish_read_amount}</p>
                        </div>
                        <OneUserBook userBook={userWishRead} photoUrl={photoUrl}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowUserProfile;
