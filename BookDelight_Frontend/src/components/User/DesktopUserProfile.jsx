import React, {useEffect, useState} from 'react';
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import styled from "@emotion/styled";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import theme from "../../utils/SimpleButtonTheme";
import {ThemeProvider} from "@mui/material/styles";
import { FaHeart, FaStar, FaBook, FaBookmark } from "react-icons/fa";
import axios from "axios";
import {Link, useParams} from "react-router-dom";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function DesktopUserProfile({user}) {

    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {id} = useParams();

    const [userCurrentlyReading, setUserCurrentlyReading] = useState(null);
    const [userUserWishRead, setUserWishRead] = useState(null);
    const [userUserFavorite, setUserFavorite] = useState(null);
    const [userUserNested, setUserNested] = useState(null);

    useEffect(() => {
        const fetchBookNested = async () => {
            try {
                if (user.currently_reading_amount != 0) {
                    console.log('currently_reading_amount:', user.currently_reading_amount);
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}/currently-reading`);
                    setUserCurrentlyReading(response.data);
                }

                if (user.wish_read_amount != 0) {
                    console.log('wish_read_amount:', user.wish_read_amount);
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}/wish-to-read`);
                    setUserWishRead(response.data);
                }

                if (user.favorite_amount != 0) {
                    console.log('favorite_amount:', user.favorite_amount);
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}/favorite`);
                    setUserFavorite(response.data);
                }

                if (user.read_books_amount != 0) {
                    console.log('read_books_amount:', user.read_books_amount);
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}/read-book`);
                    setUserNested(response.data);
                }

            } catch (err) {
                console.error('Error fetching book details:', err);
            }
        };

        fetchBookNested();
    }, [id]);

    return (
        <div>
            <div className="flex flex-row pt-4 border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
                <div className="flex border pl-2 pt-4 pr-4 pb-4 mb-2 rounded-md shadow-md w-full bg-white">
                    <div className="flex flex-col items-center w-36 mt-3">
                        <div className="flex w-24">
                            <LoadBookUserImage item={user} photoUrl={photoUrl}/>
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
                                <Button variant="contained" onClick={handleClickOpen}>
                                    View Details
                                </Button>
                            </ThemeProvider>
                        </div>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
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
                            <DialogActions>
                                <Button autoFocus onClick={handleClose}>
                                    Close
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                    <div className="flex flex-col w-1/6 pl-4 border-l">
                        <p>{user.first_name} {user.last_name}</p>
                        <p>Age: {user.age}</p>
                        <p>Account created: {user.account_created_days_ago} days ago</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col pt-4 w-full border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
                <div className="text-2xl lg:text-3xl font-bold mb-4 font-mono pb-2 pl-2">
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
                        <div>
                            {userCurrentlyReading && userCurrentlyReading.map((book) => (
                                <div className="pl-4">
                                    <Link to={`/book/${book.id_book}`}>
                                        <ul className="list-disc">
                                            <li key={book.id_book}>{book.title}</li>
                                        </ul>
                                    </Link>
                                </div>
                            ))}
                        </div>
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
                        <div>
                            {userUserFavorite && userUserFavorite.map((book) => (
                                <div className="pl-4">
                                    <Link to={`/book/${book.id_book}`}>
                                        <ul className="list-disc">
                                            <li key={book.id_book}>{book.title}</li>
                                        </ul>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className="flex flex-col border p-4 mb-2 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
                        <div className="flex flex-col items-center text-center place-content-center">
                            <div className="flex flex-row">
                                <h3 className="text-lg font-bold mb-2">Read books</h3>
                                <FaBook className="text-red-900 mt-1.5 ml-2"/>
                            </div>
                            <p className="text-2xl text-blue-500 font-semibold">{user.read_books_amount}</p>
                        </div>
                        <div>
                            {userUserNested && userUserNested.map((book) => (
                                <div className="pl-4">
                                    <Link to={`/book/${book.id_book}`}>
                                        <ul className="list-disc">
                                            <li key={book.id_book}>{book.title}</li>
                                        </ul>
                                    </Link>
                                </div>
                            ))}
                        </div>
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
                        <div>
                            {userUserWishRead && userUserWishRead.map((book) => (
                                <div className="pl-4">
                                    <Link to={`/book/${book.id_book}`}>
                                        <ul className="list-disc">
                                            <li key={book.id_book}>{book.title}</li>
                                        </ul>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DesktopUserProfile;
