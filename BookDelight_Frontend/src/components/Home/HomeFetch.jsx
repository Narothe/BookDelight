import React, {useEffect, useState} from "react";
import axios from "axios";
import LinkButton from "../../utils/LinkButton";
import HomeFetchDesktop from "./HomeFetchDesktop";
import HomeFetchMobile from "./HomeFetchMobile";
import {Link} from "react-router-dom";

function HomeFetch() {

    const query = process.env.REACT_APP_BACKEND_URL;
    const photoUrl = `${process.env.REACT_APP_PHOTO_URL}`;

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(query);
            setData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="py-8">
            {data.length > 0 ? (
                <div className="border pt-4 p-2 mb-4 rounded-md shadow-md bg-custom-new-white">
                    {data.map((item) => (
                        <div key={item.id_book}  className="border p-4 mb-4 rounded-md shadow-md bg-white">
                            <div className="hidden md:block">
                                <HomeFetchDesktop item={item} photoUrl={photoUrl}/>
                                <div className="flex justify-center mt-4">
                                    <LinkButton text="Details" link={`/book/${item.id_book}`}/>
                                </div>
                            </div>
                            <Link to={`/book/${item.id_book}`} className="block md:hidden">
                                <HomeFetchMobile item={item} photoUrl={photoUrl}/>
                                <div className="flex justify-end mt-4">
                                    <p className="text-sm sm:text-base text-gray-400">Click and see more</p>
                                </div>
                            </Link>


                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading data...</p>  // Show while fetching data /// or backend error ¯\_(ツ)_/¯
            )}
        </div>
    );
}

export default HomeFetch;
