import axios from "axios";
import {toast} from "react-hot-toast";
import {FaBook} from "react-icons/fa";
import React from "react";

function BookshelfButtonReadBooks ({book, authData}) {

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

    return (
        <button
            onClick={handleReadBooks}
            className="grid justify-items-center content-center ml-2 w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce">
            <FaBook className="w-5 text-green-500"/>
        </button>
    )
}


export default BookshelfButtonReadBooks;
