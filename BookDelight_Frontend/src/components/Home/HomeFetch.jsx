import React, {useEffect, useState} from "react";
import axios from "axios";
import DisplayRating from "../../utils/DisplayRating";
import LinkButton from "../../utils/LinkButton";
import LoadBookImage from "../../utils/LoadBookImage";
import HomeFetchDesktop from "./HomeFetchDesktop";
import DesktopNavbar from "../Navbar/DesktopNavbar";
import MobileNavbar from "../Navbar/MobileNavbar";
import HomeFetchMobile from "./HomeFetchMobile";

function HomeFetch() {

    const url = process.env.REACT_APP_BACKEND_URL;
    const photoUrl = url + '/photo/';

    const [data, setData] = useState([]);

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
