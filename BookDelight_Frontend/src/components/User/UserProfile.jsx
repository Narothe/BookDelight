import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import DesktopUserProfile from "./DesktopUserProfile";
import DesktopBook from "../Book/DesktopBook";
import MobileBook from "../Book/MobileBook";

function UserProfile() {
    const {id} = useParams();
    const userQuery = `${process.env.REACT_APP_BACKEND_URL}/user/${id}`;

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(userQuery);
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching book details:', err);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!user) return <p>No book data found</p>;


    return (
        <div className="">
            <div className="hidden md:block">
                <DesktopUserProfile user={user}/>
            </div>
            <div className="block md:hidden">
                {/*<MobileBook book={book} review={review} photoUrl={photoUrl}/>*/}
            </div>
        </div>

)
    ;
}

export default UserProfile;
