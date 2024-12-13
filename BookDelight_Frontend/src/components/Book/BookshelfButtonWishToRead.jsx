import axios from "axios";
import {toast} from "react-hot-toast";
import {FaBookmark} from "react-icons/fa";
import React from "react";

function BookshelfButtonWishToRead ({book, authData}) {

    const handleWishToRead = async () => {
        try {
            await axios.post
            (`${process.env.REACT_APP_BACKEND_URL}/book/${book.id_book}/add-wish-to-read`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`
                    },
                }
            );
            // console.log("Successfully added to currently reading.");
            toast.success("Book added successfully to Wish to read!", {
                position: "top-center",
                icon: "🏷️",
            });

        } catch (err) {
            if (err.response && err.response.status === 409) {
                console.error("Book already exists in Wish to read:", err);
                toast.error("This book is already in Wish to read!", {
                    position: "top-center",
                    icon: "🥰",
                });
            } else {
                console.error("Error adding to Wish to read:", err);
                toast.error("Something went wrong. Please try again.", {
                    position: "top-center",
                });
            }
        }
    }

    return (
        <button
            onClick={handleWishToRead}
            className="grid justify-items-center content-center ml-2 w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce">
            <FaBookmark className="w-5 text-blue-500"/>
        </button>
    )
}


export default BookshelfButtonWishToRead;
