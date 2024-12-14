import React from 'react';
import trash from "../../assets/trash-can.svg";
import axios from "axios";
import {toast} from "react-hot-toast";

function DeleteBookFromBookshelf({book, authData}) {

    let url = "";

    if (book.type === "Favorite") {
        url = `/book/${book.id_book}/delete-favorite`;
    } else if (book.type === "Currently reading") {
        url = `/book/${book.id_book}/currently-reading`;
    } else if (book.type === "Read book") {
        url = `/book/${book.id_book}/delete-read-book`;
    } else if (book.type === "Wish to read") {
        url = `/book/${book.id_book}/delete-wish-to-read`;
    }

    const handleDelete = async () => {
        // console.log(url, `${process.env.REACT_APP_BACKEND_URL}${url}`);

        try {
            await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}${url}`,
                {
                    headers: {
                        Authorization: `Bearer ${authData.token}`,
                    },
                }
            );

            // console.log("Successfully added to currently reading.");
            toast.success(`Book deleted successfully from ${book.type}!`, {
                position: "top-center",
                icon: "❤️",
            });

            setTimeout(() => window.location.reload(), 1000);

        } catch (err) {
            console.error("Error deleting from Currently Reading:", err);
            toast.error("Something went wrong. Please try again.", {
                position: "top-center",
            });
        }
    }

    return (
        <button onClick={handleDelete}
                className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce">
            <img src={trash} alt="delete" className="w-4"/>
        </button>
    );
}

export default DeleteBookFromBookshelf;
