import React, {useState} from 'react';
import styled from "@emotion/styled";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import LoadBookImage from "../../utils/LoadBookImage";
import {useAuth} from "../Auth/SessionHandling";
import BookshelfButtonFavorite from "../Book/BookshelfButtonFavorite";
import BookshelfButtonReadBooks from "../Book/BookshelfButtonReadBooks";
import BookshelfButtonWishToRead from "../Book/BookshelfButtonWishToRead";
import BookshelfButtonCurrentlyReading from "../Book/BookshelfButtonCurrentlyReading";
import {FaBook, FaBookmark, FaHeart, FaStar} from "react-icons/fa";
import DeleteBookFromBookshelf from "./DeleteBookFromBookshelf";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function OneUserBook({userBook, photoUrl}) {

    // console.log('userbook',userBook);

    const {id} = useParams();

    const {authData} = useAuth();

    const [openBook, setBookOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleClickBookOpen = (book) => {
        setSelectedBook(book);
        setBookOpen(true);
    };

    const handleBookClose = () => {
        setBookOpen(false);
        setSelectedBook(null);
    };

    // console.log('userId', id);
    // console.log('authData.user.userId', authData.user.userId);


    return (
        <div>
            {userBook && userBook.map((book) => (
                <div className="pl-4 mb-1">
                    <div onClick={() => handleClickBookOpen(book)}>
                        <ul className="list-disc hover:text-custom-hover-light-blue cursor-pointer">
                            <li key={book.id_book}>{book.title}</li>
                        </ul>
                    </div>
                </div>
            ))}
            {selectedBook && (
                <BootstrapDialog
                    onClose={handleBookClose}
                    aria-labelledby="customized-dialog-title"
                    open={openBook}
                    fullWidth
                    maxWidth="sm"
                >
                    {selectedBook.type === 'Currently reading' &&
                        <div className="flex justify-between items-center">
                            <div className="text-xl lg:text-2xl">
                                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                                    {selectedBook.title}
                                </DialogTitle>
                            </div>
                            <div className="flex items-center">
                                {authData && parseInt(id) === authData.user.userId &&
                                    <DeleteBookFromBookshelf book={selectedBook} authData={authData}/>
                                }
                                <FaHeart className="w-5 ml-2 mr-4 text-red-500"/>
                            </div>
                        </div>
                    }
                    {selectedBook.type === 'Favorite' &&
                        <div className="flex justify-between items-center">
                            <div className="text-xl lg:text-2xl">
                                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                                    {selectedBook.title}
                                </DialogTitle>
                            </div>
                            <div className="flex items-center">
                                {authData && parseInt(id) === authData.user.userId &&
                                    <DeleteBookFromBookshelf book={selectedBook} authData={authData}/>
                                }
                                <FaStar className="w-5 ml-2 text-yellow-400 mr-4"/>
                            </div>
                        </div>
                    }
                    {selectedBook.type === 'Read book' &&
                        <div className="flex justify-between items-center">
                            <div className="text-xl lg:text-2xl">
                                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                                    {selectedBook.title}
                                </DialogTitle>
                            </div>
                            <div className="flex items-center">
                                {authData && parseInt(id) === authData.user.userId &&
                                    <DeleteBookFromBookshelf book={selectedBook} authData={authData}/>
                                }
                                <FaBook className="w-5 ml-2 text-green-500 mr-4"/>
                            </div>
                        </div>
                    }
                    {selectedBook.type === 'Wish to read' &&
                        <div className="flex justify-between items-center">
                            <div className="text-xl lg:text-2xl">
                                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                                    {selectedBook.title}
                                </DialogTitle>
                            </div>
                            <div className="flex items-center">
                                {authData && parseInt(id) === authData.user.userId &&
                                    <DeleteBookFromBookshelf book={selectedBook}
                                                             authData={authData}/>
                                }
                                <FaBookmark className="w-5 ml-2 text-blue-500 mr-4"/>
                            </div>
                        </div>
                    }
                    <DialogContent dividers>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <div className="flex flex-col">
                                    <Link to={`/book/${selectedBook.id_book}`}
                                          className="w-28 sm:w-32 md:w-40">
                                        <LoadBookImage item={selectedBook} photoUrl={photoUrl}/>
                                    </Link>
                                    <div className="flex mt-2">
                                        {authData && parseInt(id) === authData.user.userId &&
                                            <div>
                                                {selectedBook.type === 'Currently reading' &&
                                                    <div className="flex">
                                                        <BookshelfButtonFavorite
                                                            book={selectedBook}
                                                            authData={authData}/>
                                                        <BookshelfButtonReadBooks
                                                            book={selectedBook}
                                                            authData={authData}/>
                                                        <BookshelfButtonWishToRead
                                                            book={selectedBook}
                                                            authData={authData}/>
                                                    </div>
                                                }
                                                {selectedBook.type === 'Favorite' &&
                                                    <div className="flex">
                                                        <BookshelfButtonCurrentlyReading
                                                            book={selectedBook}
                                                            authData={authData}/>
                                                        <BookshelfButtonReadBooks
                                                            book={selectedBook}
                                                            authData={authData}/>
                                                        <BookshelfButtonWishToRead
                                                            book={selectedBook}
                                                            authData={authData}/>
                                                    </div>
                                                }
                                                {selectedBook.type === 'Read book' &&
                                                    <div className="flex">
                                                        <BookshelfButtonCurrentlyReading
                                                            book={selectedBook}
                                                            authData={authData}/>
                                                        <BookshelfButtonFavorite
                                                            book={selectedBook}
                                                            authData={authData}/>
                                                        <BookshelfButtonWishToRead
                                                            book={selectedBook}
                                                            authData={authData}/>
                                                    </div>
                                                }
                                                {selectedBook.type === 'Wish to read' &&
                                                    <div className="flex">
                                                        <BookshelfButtonCurrentlyReading
                                                            book={selectedBook}
                                                            authData={authData}/>
                                                        <BookshelfButtonFavorite
                                                            book={selectedBook}
                                                            authData={authData}/>
                                                        <BookshelfButtonReadBooks
                                                            book={selectedBook}
                                                            authData={authData}/>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                                <Link to={`/book/${selectedBook.id_book}`}
                                      className="flex flex-col pl-2 justify-between">
                                    <div>
                                        <p className="text-sm md:text-base lg:text-md mb-2"> by:{' '} {selectedBook.authors.join(', ')} </p>
                                        <p className="text-sm md:text-base lg:text-md">Book
                                            length: <strong> {selectedBook.book_length} </strong>
                                        </p>
                                        <p className="text-sm md:text-base lg:text-md mb-2">Rating: <strong> {selectedBook.rating} </strong>
                                        </p>
                                        <p className="text-sm md:text-base lg:text-md"> Genres:{' '} {selectedBook.genres.join(', ')} </p>
                                    </div>
                                    <p className="text-sm md:text-base mb-1 lg:text-md">Added
                                        to <u> {selectedBook.type}</u>: <strong> {selectedBook.creation_date} </strong>
                                    </p>
                                </Link>
                            </div>
                            <div className="grid justify-items-end">
                                <i className="text-sm lg:text-base text-gray-400 ">Click and see
                                    more</i>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleBookClose}>
                            Close
                        </Button>
                    </DialogActions>
                </BootstrapDialog>

            )}
        </div>
    );
}

export default OneUserBook;
