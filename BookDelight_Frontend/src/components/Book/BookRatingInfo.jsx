import React, {useState} from 'react';
import DisplayRating from "../../utils/DisplayRating";
import {useAuth} from "../Auth/SessionHandling";
import LinkButton from "../../utils/LinkButton";
import axios from "axios";
import {toast} from "react-hot-toast";
import trash from "../../assets/trash-can.svg";

function BookRatingInfo({ book }) {
    const {authData} = useAuth();

    const [loading, setLoading] = useState(false);
    const handleDeleteForAdmins = async (bookId) => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/book/`,
                {
                    headers: { Authorization: `Bearer ${authData?.token}` },
                    data: { bookId: bookId },
                }
            );

            if (response.status === 200) {
                toast.success("Book deleted successfully.");
                setTimeout(() => window.location.reload(), 1000);
            }
        } catch (err) {
            console.error("Error deleting book:", err);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col text-sm md:text-base lg:text-lg font-semibold">
            <div className="flex flex-row">
                <p className="mb-2">Rating:</p>
                <div className="ml-1 mb-2">
                    <DisplayRating className="mb-2" value={book.rating}/>
                </div>
            </div>
            <p className="mb-2">Review count: {book.review_count}</p>
            <div className="flex flex-row">
            {authData && book.id_user === authData.user.userId &&
                <div>
                    <LinkButton text="Add cover" link={`/book/${book.id_book}/add-photo`}/>
                </div>
            }
            {  (authData?.user?.isAdmin) &&
                <div className="flex items-center ml-2">
                    <button
                        onClick={() => handleDeleteForAdmins(book.id_book)}
                        className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark"
                        disabled={loading}
                    >
                        <img src={trash} alt="delete" className="w-4"/>
                    </button>
                </div>
            }
            </div>
        </div>
    );
}

export default BookRatingInfo;
