import React, {useEffect, useState} from "react";
import axios from "axios";
import LinkButton from "../../utils/LinkButton";
import HomeFetchDesktop from "./HomeFetchDesktop";
import HomeFetchMobile from "./HomeFetchMobile";

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
                <div className="border p-2 mb-4 rounded-lg shadow-md bg-custom-new-white">
                    {data.map((item) => (
                        <div key={item.id_book} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
                            <div className="hidden md:block">
                                <HomeFetchDesktop item={item} photoUrl={photoUrl}/>
                            </div>
                            <div className="block md:hidden">
                                <HomeFetchMobile item={item} photoUrl={photoUrl}/>
                            </div>

                            <div className="flex justify-center mt-4">
                                <LinkButton text="Details" link={`/book/${item.id_book}`}/>
                            </div>
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
