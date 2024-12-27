import axios from "axios";
import { toast } from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import React, { useEffect, useState } from "react";

function BookshelfButtonCurrentlyReading({ book, authData }) {
    const [isCurrentlyReading, setIsCurrentlyReading] = useState(false);

    useEffect(() => {
        const fetchCurrentlyReading = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/user/${authData.user.userId}/currently-reading`,
                    {
                        headers: {
                            Authorization: `Bearer ${authData.token}`,
                        },
                    }
                );

                const isReading = response.data.some(
                    (readingBook) => readingBook.id_book === book.id_book
                );
                setIsCurrentlyReading(isReading);
            } catch (error) {
                console.error("Error fetching Currently Reading books:", error);
            }
        };

        fetchCurrentlyReading();
    }, [book.id_book, authData.token, authData.user.userId]);

    const handleAddCurrentlyReading = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/book/${book.id_book}/add-currently-reading`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`,
                    },
                }
            );

            setIsCurrentlyReading(true);
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
    };

    const handleRemoveCurrentlyReading = async () => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/book/${book.id_book}/currently-reading`,
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`,
                    },
                }
            );

            setIsCurrentlyReading(false);
            toast.success("Book removed successfully from Currently Reading!", {
                position: "top-center",
                icon: "🗑️",
            });

            setTimeout(() => window.location.reload(), 1000);

        } catch (err) {
            console.error("Error removing from Currently Reading:", err);
            toast.error("Something went wrong. Please try again.", {
                position: "top-center",
            });
        }
    };

    const handleClick = () => {
        if (isCurrentlyReading) {
            handleRemoveCurrentlyReading();
        } else {
            handleAddCurrentlyReading();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 
        ${
                isCurrentlyReading
                    ? "border-red-500 hover:border-red-700"
                    : "border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce"
            }`}
        >
            <FaHeart className="text-red-500 w-5" />
        </button>
    );
}

export default BookshelfButtonCurrentlyReading;
