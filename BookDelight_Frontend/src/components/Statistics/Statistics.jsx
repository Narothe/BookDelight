import React, {useEffect, useState} from 'react';
import axios from "axios";
import ListElement from "../Statistics/ListElement";
import StatisticsChart from "./StatisticsChart";

function Statistics() {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/statistics/dashboard`,
                );
                setUserData(response.data);
            } catch (err) {
                console.error("Error fetching admin data:", err);
            }
        };

        fetchData();
    }, []);


    if (!userData) {
        return <div>Loading...</div>;
    }

    console.log(userData);


    return (
        <div>
            <div className="flex flex-col pt-4 w-full border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
                <div className="text-xl lg:text-2xl font-bold mb-2 font-mono pb-1 pl-2">
                    <p>BookDelight Statistics</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap gap-2 flex-row">
                    <ListElement cardTitle="Books" items={[
                        {text: "All existing books", userData: userData.book_count},
                        {text: "All books pages read", userData: userData.read_pages_amount},
                    ]}/>
                    <ListElement cardTitle="Users" items={[
                        {text: "All existing users", userData: userData.users_count},
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
            <StatisticsChart />
        </div>
    );
}

export default Statistics;
