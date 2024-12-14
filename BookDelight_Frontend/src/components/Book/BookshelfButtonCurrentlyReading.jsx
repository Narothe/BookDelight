import axios from "axios";
import {toast} from "react-hot-toast";
import {FaHeart} from "react-icons/fa";
import React from "react";

function BookshelfButtonCurrentlyReading ({book, authData}) {

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
            toast.success("Book added successfully to Currently Reading!", {
                position: "top-center",
                icon: "❤️",
            });

            setTimeout(() => window.location.reload(), 1000);

        } catch (err) {
            if (err.response && err.response.status === 409) {
                console.error("Book already exists in Currently Reading:", err);
                toast.error("This book is already in Currently Reading!", {
                    position: "top-center",
                    icon: "🥰",
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
        <button
            onClick={handleCurrentlyReading}
            className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce">
            <FaHeart className="w-5 text-red-500"/>
        </button>
    )
}


export default BookshelfButtonCurrentlyReading;
