import React from 'react';
import FormattedDate from "../../utils/FormattedDate";
import {FaHeart} from "react-icons/fa";
import {useAuth} from "../Auth/SessionHandling";
import {toast} from "react-hot-toast";
import axios from "axios";

function BookInfo({ book }) {

    const {authData} = useAuth();

    const handleCurrentlyReading = async () => {
        try {
            await axios.post
            (`${process.env.REACT_APP_BACKEND_URL}/book/${book.id_book}/add-currently-reading`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`
                    },
                }
            );
            // console.log("Successfully added to currently reading.");
            toast.success("Book added successfully!", {
                position: "top-center",
            });

        } catch (err) {
            if (err.response && err.response.status === 409) {
                console.error("Book already exists in Currently Reading:", err);
                toast.error("This book is already in Currently Reading!", {
                    position: "top-center",
                });
            } else {
                console.error("Error adding to Currently Reading:", err);
                toast.error("Something went wrong. Please try again.", {
                    position: "top-center",
                });
            }
        }
    }

    return (
        <div className="flex flex-col">
            <div
                className="flex flex-col text-sm md:text-base lg:text-lg font-semibold px-4 border-4 bg-custom-new-white rounded-lg">
                <p className="mt-3">Publisher:</p>
                <p className="mb-3">{book.publisher}</p>
                <p className="">Publication date:</p>
                <div className="mb-3">
                    <FormattedDate date={book.publication_date}/>
                </div>
                <p className="">ISBN:</p>
                <p className="mb-3">{book.isbn}</p>
                <p className="mb-3">Book length: {book.book_length}</p>
            </div>
            <div className="mt-2">
                <div className="flex justify-items-center content-center h-auto pr-1">
                    <button
                        onClick={handleCurrentlyReading}
                        className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce">
                        <FaHeart className="w-5 text-red-500"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookInfo;
