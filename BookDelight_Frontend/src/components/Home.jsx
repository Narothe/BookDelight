import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeText from "./HomeText";

function Home() {
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(backendURL);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <HomeText/>

            <div className="container py-8">
                {data.length > 0 ? (
                    <div>
                        {data.map((item) => (
                            <div key={item.id_book} className="border p-4 mb-4 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                                <p className="text-base font-semibold mb-2">{item.publisher}</p>
                                <p className="text-base font-semibold mb-2">{item.rating}</p>
                                <p className="text-base font-semibold mb-2">{item.review_count}</p>
                                <ul className="list-disc pl-5">
                                    {item.authors.map((authors, index) => (
                                        <li key={index} className="text-lg">{authors}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading data...</p>  // Show while fetching data
                )}
            </div>
        </div>
    );
}

export default Home;
