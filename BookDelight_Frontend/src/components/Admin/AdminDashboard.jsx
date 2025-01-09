import React, {useEffect, useState} from 'react';
import {useAuth} from "../Auth/SessionHandling";
import axios from "axios";
import TruncateText from "../../utils/TruncateText";
import LoadUserImage from "../../utils/LoadUserImage";

function AdminDashboard() {
    const { authData } = useAuth();

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
        <div className="flex flex-row pt-4 border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
            <div className="flex border pl-2 pt-4 pr-4 pb-4 mb-2 rounded-md shadow-md w-full bg-white">
                <div className="flex flex-col items-center w-36 mt-3">
                    <div className="flex w-16 lg:w-20">
                        <LoadUserImage item={userPhoto} photoUrl={userPhotoUrl}/>
                    </div>
                    <div className="mt-2">
                        <p>{userData.admin_username}</p>
                    </div>
                </div>
                {/*<div className="flex flex-col w-5/6 pl-4 border-l">*/}
                {/*    {user.read_pages_amount &&*/}
                {/*        <p>Pages read in total: <strong> {user.read_pages_amount} </strong></p>*/}
                {/*    }*/}
                {/*    {user.last_added_currently_reading_title &&*/}
                {/*        <p>Last book added to Currently*/}
                {/*            Reading: <strong> "{user.last_added_currently_reading_title}"</strong></p>*/}
                {/*    }*/}

                {/*</div>*/}
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
    );
}

export default AdminDashboard;
