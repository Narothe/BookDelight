import axios from "axios";
import {toast} from "react-hot-toast";
import {FaBook, FaBookmark, FaHeart, FaStar} from "react-icons/fa";
import React from "react";
import {useAuth} from "../Auth/SessionHandling";

function BookshelfButtons({book}) {

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
            toast.success("Book added successfully to Currently Reading!", {
                position: "top-center",
                icon: "❤️",
            });

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

    const handleReadBooks = async () => {
        try {
            await axios.post
            (`${process.env.REACT_APP_BACKEND_URL}/book/${book.id_book}/add-read-book`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`
                    },
                }
            );
            // console.log("Successfully added to currently reading.");
            toast.success("Book added successfully to Read books!", {
                position: "top-center",
                icon: "📗"
            });

        } catch (err) {
            if (err.response && err.response.status === 409) {
                console.error("Book already exists in Read books:", err);
                toast.error("This book is already in Read books!", {
                    position: "top-center",
                    icon: "🥰",
                });
            } else {
                console.error("Error adding to Read books:", err);
                toast.error("Something went wrong. Please try again.", {
                    position: "top-center",
                });
            }
        }
    }

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
        <div className="flex justify-center justify-items-center content-center h-auto pr-1">
            <button
                onClick={handleCurrentlyReading}
                className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce">
                <FaHeart className="w-5 text-red-500"/>
            </button>
            <button
                onClick={handleFavorite}
                className="grid justify-items-center content-center ml-2 w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce">
                <FaStar className="w-5 text-yellow-400"/>
            </button>
            <button
                onClick={handleReadBooks}
                className="grid justify-items-center content-center ml-2 w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce">
                <FaBook className="w-5 text-green-500"/>
            </button>
            <button
                onClick={handleWishToRead}
                className="grid justify-items-center content-center ml-2 w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce">
                <FaBookmark className="w-5 text-blue-500"/>
            </button>
        </div>
    );

}

export default BookshelfButtons;
