import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/SessionHandling";
import axios from "axios";
import TruncateText from "../../utils/TruncateText";
import LoadUserImage from "../../utils/LoadUserImage";
import ListElement from "../Statistics/ListElement";
import StatisticsChartForAdmins from "../Statistics/StatisticsChartForAdmins";
import {Link} from "react-router-dom";
import { format } from "date-fns";


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

    console.log('userData',userData);

    return (
        <div>
            <div className="flex flex-row pt-4 border p-2 mb-4 shadow-md rounded-md bg-custom-new-white justify-center">
                <div className="flex border pt-4 pr-4 pb-4 mb-2 rounded-md shadow-md bg-white">
                    <div className="flex flex-col items-center w-28 mt-3">
                        <div className="flex mx-2 w-16 lg:w-20">
                            <LoadUserImage item={userPhoto} photoUrl={userPhotoUrl}/>
                        </div>
                        <div className="mt-2">
                            <p>{userData.countResult.admin_username}</p>
                        </div>
                    </div>
                    <div className="flex flex-col place-content-center pl-2.5 border-l">
                        <div className="flex gap-x-1 flex-row">
                            <p>{userData.countResult.admin_first_name} </p>
                            <p>{userData.countResult.admin_last_name}</p>
                        </div>
                        <p>Age: {userData.countResult.admin_age}</p>
                        <p>Account created: {userData.countResult.admin_creation_days_ago} days ago</p>
                    </div>

                </div>
            </div>
            <div className="flex flex-col pt-4 w-full border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
                <div className="text-xl lg:text-2xl font-bold mb-2 font-mono pb-1 pl-2">
                    <p>BookDelight Statistics for admins</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap gap-2 flex-row">
                    <ListElement cardTitle="Books" items={[
                        {text: "All existing books", userData: userData.countResult.book_count},
                        {text: "All books with covers", userData: userData.countResult.book_photos_count},
                        {text: "All books pages read", userData: userData.countResult.read_pages_amount},
                    ]}/>
                    <ListElement cardTitle="Users" items={[
                        {text: "All existing users", userData: userData.countResult.users_count},
                        {text: "All users with profile picture", userData: userData.countResult.user_photos_count},
                        {text: "All users ever logged", userData: userData.countResult.logged_ever_users},
                    ]}/>
                    <ListElement cardTitle="Reviews" items={[
                        {text: "All posted reviews", userData: userData.countResult.review_count},
                        {text: "All given votes to reviews", userData: userData.countResult.review_votes_count},
                    ]}/>
                    <ListElement cardTitle="Replies" items={[
                        {text: "All posted replies", userData: userData.countResult.reply_count},
                        {text: "All given votes to replies", userData: userData.countResult.reply_votes_count},
                    ]}/>
                    <ListElement cardTitle="Additional books info provided" items={[
                        {text: "All book genres", userData: userData.countResult.genres_count},
                        {text: "All book authors", userData: userData.countResult.authors_count},
                    ]}/>
                    <ListElement cardTitle="Users bookshelf" items={[
                        {text: "All books in Currently Reading", userData: userData.countResult.currently_count},
                        {text: "All books in Read", userData: userData.countResult.read_count},
                        {text: "All books in Wish to Read", userData: userData.countResult.wish_count},
                        {text: "All books in Favorite", userData: userData.countResult.favorite_count},
                    ]}/>
                </div>
            </div>
            <StatisticsChartForAdmins/>
            <div className="flex flex-col pt-4 w-full border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
                <div className="text-xl lg:text-2xl font-bold mb-2 font-mono pb-1 pl-2">
                    <p>Logged Users</p>
                </div>
                <div className="flex border p-4 mb-2 rounded-md shadow-md w-full bg-white">
                    <div className="w-full">
                        <ul className="space-y-4">
                            {userData.userSessions.map((session, index) => (
                                <Link to={`/user/${session.id_user}`}>
                                    <li
                                        key={index}
                                        className="p-3 border-b last:border-none flex justify-between items-center transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md rounded-md"
                                    >
                                        <div className="flex flex-row">
                                            <div className="w-12">
                                                <LoadUserImage item={session} photoUrl={userPhotoUrl}/>
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-lg font-semibold">{session.username}</p>
                                                <p className="text-sm text-gray-600">User ID: {session.id_user}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-800">
                                            {format(new Date(session.created_at), "HH:mm:ss, dd-MM-yyyy")}
                                        </p>

                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
