import axios from "axios";
import {toast} from "react-hot-toast";
import {FaStar} from "react-icons/fa";
import React, {useEffect, useState} from "react";

function BookshelfButtonFavorite ({book, authData}) {

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchFavorite = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${authData.user.userId}/favorite`, {
                    headers: {
                        Authorization: `Bearer ${authData.token}`,
                    },
                });

                const isReading = response.data.some(
                    (readingBook) => readingBook.id_book === book.id_book
                );
                setIsFavorite(isReading);
            } catch (error) {
                console.error("Error fetching Currently Reading books:", error);
            }
        };

        fetchFavorite();
    }, [book.id_book, authData.token]);

    const handleAddFavorite = async () => {
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

            setIsFavorite(true);

            // console.log("Successfully added to currently reading.");
            toast.success("Book added successfully to Favorite!", {
                position: "top-center",
                icon: "⭐",
            });

            setTimeout(() => window.location.reload(), 1000);

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

    const handleRemoveFavorite = async () => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/book/${book.id_book}/delete-favorite`,
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`,
                    },
                }
            );

            setIsFavorite(false);
            toast.success("Book removed successfully from Favorite!", {
                position: "top-center",
                icon: "🗑️",
            });

            setTimeout(() => window.location.reload(), 1000);

        } catch (err) {
            console.error("Error removing from Favorite:", err);
            toast.error("Something went wrong. Please try again.", {
                position: "top-center",
            });
        }
    };

    const handleClick = () => {
        if (isFavorite) {
            handleRemoveFavorite();
        } else {
            handleAddFavorite();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`grid justify-items-center content-center ml-2 w-8 h-8 rounded-full overflow-hidden border-4 
        ${
                isFavorite
                    ? "border-yellow-400 hover:border-yellow-600"
                    : "border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce"
            }`}
        >
            <FaStar className="w-5 text-yellow-400"/>
        </button>
    )
}


export default BookshelfButtonFavorite;
