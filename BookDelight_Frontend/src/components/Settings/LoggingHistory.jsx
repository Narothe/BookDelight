import {useAuth} from "../Auth/SessionHandling";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import LoadUserImage from "../../utils/LoadUserImage";
import {format} from "date-fns";


function LoggingHistory() {
    const {authData} = useAuth();

    const [userData, setUserData] = useState(null);

    const userPhotoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

    useEffect(() => {
        const fetchUserData = async () => {
            if (!authData) return;

            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/user/logged`,
                    {
                        headers: {
                            Authorization: `Bearer ${authData.token}`,
                        },
                    }
                );
                setUserData(response.data);
            } catch (err) {
                console.error("Error fetching user photo:", err);
            }
        };

        fetchUserData();
    }, [authData]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col pt-4 border p-4 mb-4 shadow-md rounded-md bg-custom-new-white">
            <div className="text-xl lg:text-2xl font-bold mb-2 font-mono pb-1 pl-2">
                <p>Login history</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                    <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3 border-b">User</th>
                        <th className="p-3 border-b">Session Created At</th>
                        <th className="p-3 border-b">Browser</th>
                        <th className="p-3 border-b">Operating System</th>
                        <th className="p-3 border-b">Device</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userData.map((session, index) => (
                        <tr
                            key={index}
                            onClick={() => window.location.href = `/user/${session.id_user}`}
                            className="cursor-pointer transition duration-300 ease-in-out hover:bg-gray-50"
                        >
                            <td className="p-3 flex items-center">
                                <div className="w-12 h-12">
                                    <LoadUserImage item={session} photoUrl={userPhotoUrl} />
                                </div>
                                <div className="text-sm text-gray-500 ml-3">
                                    <p className="">{session.username}</p>
                                    <p className="font-semibold">user id: {session.id_user}</p>
                                </div>
                            </td>
                            <td className="p-3 text-sm text-gray-800">
                                {format(new Date(session.session_created_at), "HH:mm:ss, dd-MM-yyyy")}
                            </td>
                            <td className="p-3 text-sm text-gray-800">
                                {session.browser_name} {session.browser_version}
                            </td>
                            <td className="p-3 text-sm text-gray-800">
                                {session.os_name} {session.os_version}
                            </td>
                            <td className="p-3 text-sm text-gray-800">
                                {session.device_vendor} {session.device_model} ({session.device_type})
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LoggingHistory;
