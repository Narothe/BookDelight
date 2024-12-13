import React, {useState} from 'react';
import styled from "@emotion/styled";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {Link} from "react-router-dom";
import LoadBookImage from "../../utils/LoadBookImage";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function OneUserBook({userBook, photoUrl}) {

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
                        <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                            {selectedBook.title}
                        </DialogTitle>
                        <DialogContent dividers>
                            <Link to={`/book/${selectedBook.id_book}`} className="flex flex-col">
                                <div className="flex flex-row">
                                    <div className="w-28 sm:w-32 md:w-40">
                                        <LoadBookImage item={selectedBook} photoUrl={photoUrl}/>
                                    </div>
                                    <div className="flex flex-col pl-2">
                                        <p className="text-sm md:text-base lg:text-md mb-2"> by:{' '} {selectedBook.authors.join(', ')} </p>
                                        <p className="text-sm md:text-base lg:text-md">Book
                                            length: {selectedBook.book_length}</p>
                                        <p className="text-sm md:text-base lg:text-md mb-2">Rating: {selectedBook.rating}</p>
                                        <p className="text-sm md:text-base lg:text-md"> Genres:{' '} {selectedBook.genres.join(', ')} </p>
                                    </div>
                                </div>
                                <div className="grid justify-items-end">
                                    <i className="text-sm lg:text-base text-gray-400 ">Click and see
                                        more</i>
                                </div>
                            </Link>
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
