import axios from "axios";
import {toast} from "react-hot-toast";
import {FaBook} from "react-icons/fa";
import React, {useEffect, useState} from "react";

function BookshelfButtonReadBooks ({book, authData}) {

    const [isReadBooks, setIsReadBooks] = useState(false);

    useEffect(() => {
        const fetchReadBooks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${authData.user.userId}/read-book`, {
                    headers: {
                        Authorization: `Bearer ${authData.token}`,
                    },
                });

                const isReading = response.data.some(
                    (readingBook) => readingBook.id_book === book.id_book
                );
                setIsReadBooks(isReading);
            } catch (error) {
                console.error("Error fetching Currently Reading books:", error);
            }
        };

        fetchReadBooks();
    }, [book.id_book, authData.token]);

    const handleAddReadBooks = async () => {
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

            setIsReadBooks(true);

            // console.log("Successfully added to currently reading.");
            toast.success("Book added successfully to Read books!", {
                position: "top-center",
                icon: "📗"
            });

            setTimeout(() => window.location.reload(), 1000);

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

    const handleRemoveReadBooks = async () => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/book/${book.id_book}/delete-read-book`,
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`,
                    },
                }
            );

            setIsReadBooks(false);
            toast.success("Book removed successfully from Read Books!", {
                position: "top-center",
                icon: "🗑️",
            });

            setTimeout(() => window.location.reload(), 1000);

        } catch (err) {
            console.error("Error removing from Read Books:", err);
            toast.error("Something went wrong. Please try again.", {
                position: "top-center",
            });
        }
    };

    const handleClick = () => {
        if (isReadBooks) {
            handleRemoveReadBooks();
        } else {
            handleAddReadBooks();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`grid justify-items-center content-center ml-2 w-8 h-8 rounded-full overflow-hidden border-4 
        ${
                isReadBooks
                    ? "border-green-500 hover:border-green-700"
                    : "border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce"
            }`}
        >
            <FaBook className="w-5 text-green-500"/>
        </button>
    )
}


export default BookshelfButtonReadBooks;
