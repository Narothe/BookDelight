import axios from "axios";
import {toast} from "react-hot-toast";
import {FaBook} from "react-icons/fa";
import React, {useEffect, useState} from "react";

function BookshelfButtonReadBooks ({book, authData}) {

    const [isReadBooks, setIsReadBooks] = useState(false);

    useEffect(() => {
        const fetchCurrentlyReading = async () => {
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

        fetchCurrentlyReading();
    }, [book.id_book, authData.token]);

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

    return (
        <button
            onClick={!isReadBooks ? handleReadBooks : null}
            className={`grid justify-items-center content-center ml-2 w-8 h-8 rounded-full overflow-hidden border-4 
                ${isReadBooks ? "border-green-500 cursor-not-allowed" : "border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce"}`}
            disabled={isReadBooks}
        >
            <FaBook className="w-5 text-green-500"/>
        </button>
    )
}


export default BookshelfButtonReadBooks;
