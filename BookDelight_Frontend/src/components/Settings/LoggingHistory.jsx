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
      <div className="flex flex-row pt-4 border p-2 mb-4 shadow-md rounded-md bg-custom-new-white justify-center">
          <div className="flex border p-4 mb-2 rounded-md shadow-md w-full bg-white">
              <div className="w-full">
                  <ul className="space-y-4">
                      {userData.map((session, index) => (
                          <Link to={`/user/${session.id_user}`}>
                              <li
                                  key={index}
                                  className="p-3 border-b last:border-none flex justify-between items-center transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md rounded-md"
                              >
                                  <div className="flex flex-row">
                                      <div className="w-12">
                                          <LoadUserImage item={session} photoUrl={userPhotoUrl}/>
                                      </div>
                                      <div className="ml-2 content-center">
                                          <p className="text-lg font-semibold">{session.username}</p>
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
  );
}

export default LoggingHistory;
