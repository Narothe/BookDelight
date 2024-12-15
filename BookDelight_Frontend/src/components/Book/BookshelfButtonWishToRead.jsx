import axios from "axios";
import {toast} from "react-hot-toast";
import {FaBookmark} from "react-icons/fa";
import React, {useEffect, useState} from "react";

function BookshelfButtonWishToRead ({book, authData}) {

    const [isWishToRead, setIsWishToRead] = useState(false);

    useEffect(() => {
        const fetchCurrentlyReading = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${authData.user.userId}/wish-to-read`, {
                    headers: {
                        Authorization: `Bearer ${authData.token}`,
                    },
                });

                const isReading = response.data.some(
                    (readingBook) => readingBook.id_book === book.id_book
                );
                setIsWishToRead(isReading);
            } catch (error) {
                console.error("Error fetching Currently Reading books:", error);
            }
        };

        fetchCurrentlyReading();
    }, [book.id_book, authData.token]);

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

            setIsWishToRead(true);

            // console.log("Successfully added to currently reading.");
            toast.success("Book added successfully to Wish to read!", {
                position: "top-center",
                icon: "🏷️",
            });

            setTimeout(() => window.location.reload(), 1000);

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
            onClick={!isWishToRead ? handleWishToRead : null}
            className={`grid justify-items-center content-center ml-2 w-8 h-8 rounded-full overflow-hidden border-4 
                ${isWishToRead ? "border-blue-500 cursor-not-allowed" : "border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce"}`}
            disabled={isWishToRead}
        ><FaBookmark className="w-5 text-blue-500"/>
        </button>
    )
}


export default BookshelfButtonWishToRead;
