import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/SessionHandling";
import axios from "axios";
import TruncateText from "../../utils/TruncateText";
import LoadUserImage from "../../utils/LoadUserImage";
import ListElement from "./ListElement";

function AdminDashboard() {
    const {authData} = useAuth();

    const [userPhoto, setUserPhoto] = useState(null);
    const [userData, setUserData] = useState(null);

    const userPhotoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

    useEffect(() => {
        const fetchUserPhoto = async () => {
            if (!authData) return;

            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/user/${authData.user.userId}/photo`,
                    {
                        headers: {
                            Authorization: `Bearer ${authData.token}`,
                        },
                    }
                );
                setUserPhoto(response.data);
            } catch (err) {
                console.error("Error fetching user photo:", err);
            }
        };

        const fetchAdminData = async () => {
            if (!authData) return;

            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/admin/dashboard`,
                    {
                        headers: {
                            Authorization: `Bearer ${authData.token}`,
                        },
                    }
                );
                setUserData(response.data);
            } catch (err) {
                console.error("Error fetching admin data:", err);
            }
        };

        fetchUserPhoto();
        fetchAdminData();
    }, [authData]);

    if (!authData || !authData.user.isAdmin) {
        return <h1>Access denied. Admins only.</h1>;
    }

    if (!userData || !userPhoto) {
        return <div>Loading...</div>;
    }

    console.log(userPhoto);

    return (
        <div>
            <div className="flex flex-row pt-4 border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
                <div className="flex border pt-4 pr-4 pb-4 mb-2 rounded-md shadow-md w-full bg-white">
                    <div className="flex flex-col items-center w-28 mt-3">
                        <div className="flex w-16 lg:w-20">
                            <LoadUserImage item={userPhoto} photoUrl={userPhotoUrl}/>
                        </div>
                        <div className="mt-2">
                            <p>{userData.admin_username}</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-5/6 pl-4 border-l items-center text-lg place-content-center">

                    </div>
                    <div className="flex flex-col w-1/4 pl-2.5 border-l">
                        <div className="hidden sm:block">
                            <p>{userData.admin_first_name} {userData.admin_last_name}</p>
                        </div>
                        <div className="block sm:hidden">
                            <p>{userData.admin_first_name} {TruncateText(userData.admin_last_name, 5)}</p>
                        </div>
                        <p>Age: {userData.admin_age}</p>
                        <p>Account created: {userData.admin_creation_days_ago} days ago</p>
                    </div>

                </div>
            </div>
            <div className="flex flex-col pt-4 w-full border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
                <div className="text-xl lg:text-2xl font-bold mb-2 font-mono pb-1 pl-2">
                    <p>BookDelight Statistics for admins</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap gap-2 flex-row">
                    <ListElement cardTitle="Books" items={[
                        {text: "All existing books", userData: userData.book_count},
                        {text: "All books with covers", userData: userData.book_photos_count},
                        {text: "All books pages read", userData: userData.read_pages_amount},
                    ]}/>
                    <ListElement cardTitle="Users" items={[
                        {text: "All existing users", userData: userData.users_count},
                        {text: "All users with profile picture", userData: userData.user_photos_count},
                        {text: "All users ever logged", userData: userData.logged_ever_users},
                    ]}/>
                    <ListElement cardTitle="Reviews" items={[
                        {text: "All posted reviews", userData: userData.review_count},
                        {text: "All given votes to reviews", userData: userData.review_votes_count},
                    ]}/>
                    <ListElement cardTitle="Replies" items={[
                        {text: "All posted replies", userData: userData.reply_count},
                        {text: "All given votes to replies", userData: userData.reply_votes_count},
                    ]}/>
                    <ListElement cardTitle="Additional books info provided" items={[
                        {text: "All book genres", userData: userData.genres_count},
                        {text: "All book authors", userData: userData.authors_count},
                    ]}/>
                    <ListElement cardTitle="Users bookshelf" items={[
                        {text: "All books in Currently Reading", userData: userData.currently_count},
                        {text: "All books in Read", userData: userData.read_count},
                        {text: "All books in Wish to Read", userData: userData.wish_count},
                        {text: "All books in Favorite", userData: userData.favorite_count},
                    ]}/>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
