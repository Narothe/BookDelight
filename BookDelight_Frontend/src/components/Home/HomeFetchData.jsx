import React, {useEffect, useState} from "react";
import axios from "axios";
import DisplayRating from "../../utils/DisplayRating";
import LinkButton from "../../utils/LinkButton";
import AltImage from "../../utils/AltImage";

function HomeFetchData() {

    const url = process.env.REACT_APP_BACKEND_URL;
    const photoUrl = url + '/uploads/';

    const [data, setData] = useState([]);
    const [imageError, setImageError] = useState(false);


    const fetchData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
            console.log(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container py-8">
            {data.length > 0 ? (
                <div className="border p-4 mb-4 rounded-lg bg-orange-100">
                    {data.map((item) => (
                        <div key={item.id_book} className="border p-4 mb-4 rounded-lg shadow-md bg-orange-50">

                            <div className="flex flex-row">
                                <div className="flex w-44">
                                    {item.photo_path === null || imageError ? (
                                        <AltImage/>
                                    ) : (
                                        <img src={photoUrl+item.photo_path} alt="book photo" className="rounded-md" onError={() => setImageError(true)}/>
                                    )}
                                </div>
                                <div className="basis-3/4">
                                    <div className="flex flex-col px-4">
                                        <h2 className="text-3xl font-semibold">{item.title}</h2>
                                        <p className="text-lg font-semibold mb-2"> by:{' '} {item.authors.join(', ')} </p>
                                        <p className="text-lg font-semibold mb-2">{item.short_description}</p>
                                    </div>
                                </div>
                                <div className="basis-1/4">
                                    <div className="flex flex-row">
                                        <div className="flex-col basis-1/2 grid justify-items-center text-center">
                                            <p className="text-base font-semibold mb-2">average rate</p>
                                            <div className="text-sm font-semibold mb-2">
                                                <DisplayRating className="text-base font-semibold mb-2"
                                                               value={item.rating}/>
                                            </div>
                                        </div>
                                        <div className="flex-col basis-1/2 grid justify-items-center text-center">
                                            <p className="text-base font-semibold mb-2">reviews</p>
                                            <p className="text-base font-semibold mb-2">{item.review_count}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <LinkButton text="Details" link={`/book/${item.id_book}`}/>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading data...</p>  // Show while fetching data /// or error ¯\_(ツ)_/¯
            )}
        </div>
    );
}

export default HomeFetchData;
