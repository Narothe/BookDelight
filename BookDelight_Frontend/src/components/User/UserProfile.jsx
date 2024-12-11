import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import ShowUserProfile from "./ShowUserProfile";

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
            <ShowUserProfile user={user}/>
        </div>

    )
        ;
}

export default UserProfile;
