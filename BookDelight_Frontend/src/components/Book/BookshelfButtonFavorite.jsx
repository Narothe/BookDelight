import axios from "axios";
import {toast} from "react-hot-toast";
import {FaStar} from "react-icons/fa";
import React from "react";

function BookshelfButtonFavorite ({book, authData}) {

    const handleFavorite = async () => {
        try {
            await axios.post
            (`${process.env.REACT_APP_BACKEND_URL}/book/${book.id_book}/add-favorite`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`
                    },
                }
            );
            // console.log("Successfully added to currently reading.");
            toast.success("Book added successfully to Favorite!", {
                position: "top-center",
                icon: "⭐",
            });

        } catch (err) {
            if (err.response && err.response.status === 409) {
                console.error("Book already exists in Favorite:", err);
                toast.error("This book is already in Favorite!", {
                    position: "top-center",
                    icon: "🥰",
                });
            } else {
                console.error("Error adding to Favorite:", err);
                toast.error("Something went wrong. Please try again.", {
                    position: "top-center",
                });
            }
        }
    }

    return (
        <button
            onClick={handleFavorite}
            className="grid justify-items-center content-center ml-2 w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce">
            <FaStar className="w-5 text-yellow-400"/>
        </button>
    )
}



export default BookshelfButtonFavorite;
