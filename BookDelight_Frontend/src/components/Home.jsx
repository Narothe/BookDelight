import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            <h1 className="text-3xl font-bold mb-4 font-mono">Welcome to BookDelight</h1>
            <p className="text-lg leading-relaxed">
                Browse a collection of books in an easy and simple way. Browse, add, filter, rate the books you are
                looking for.
            </p>
            <p className="text-lg leading-relaxed mt-4">
                Search for information about the book you are interested in or join us for more features!
            </p>

            <div className="container py-8">
                {data.length > 0 ? (
                    <div>
                        {data.map((item) => (
                            <div key={item.id_book} className="border p-4 mb-4 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                                <ul className="list-disc pl-5">
                                    {/* Mapowanie po każdym elemencie "table" */}
                                    {item.authors.map((authors, index) => (
                                        <li key={index} className="text-lg">{authors}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading data...</p>  // Wiadomość podczas ładowania danych
                )}
            </div>
        </div>
    );
}

export default Home;
