import React, {useEffect, useState} from "react";
import axios from "axios";
import HomeFetchDesktop from "./HomeFetchDesktop";
import HomeFetchMobile from "./HomeFetchMobile";
import {Link} from "react-router-dom";
import HomeFetchBlankDesktop from "./HomeFetchBlankDesktop";
import HomeFetchBlankMobile from "./HomeFetchBlankMobile";

import HomeSlider from "./HomeSlider";
import {CircularProgress} from "@mui/material";

function HomeFetch() {

    const query = process.env.REACT_APP_BACKEND_URL;
    const photoUrl = `${process.env.REACT_APP_BOOK_PHOTO_URL}`;

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
                <div>
                    <div className="pb-6">
                        <HomeSlider books={data} photoUrl={photoUrl} />
                    </div>
                    <div className="hidden md:block">
                        <div
                            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border flex-wrap gap-2 pt-4 p-2 mb-4 rounded-md shadow-md bg-custom-new-white">
                            {data.map((item) => (
                                <div key={item.id_book}
                                     className="flex flex-col justify-between border pt-4 px-4 pb-2 mb-4 rounded-md shadow-md bg-white flex-grow">
                                    <Link to={`/book/${item.id_book}`}>
                                        <HomeFetchDesktop item={item} photoUrl={photoUrl}/>
                                        <div className="relative">
                                            <div className="lg:mt-6">
                                                <div className="absolute right-0 bottom-0 mr-1">
                                                    <i className="text-sm lg:text-base text-gray-400 ">Click and see
                                                        more</i>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            <div
                                className="flex flex-col justify-between border pt-4 px-4 pb-2 mb-4 rounded-md shadow-md bg-white flex-grow">
                                <Link to="/add-book">
                                    <HomeFetchBlankDesktop/>
                                    <div className="relative">
                                        <div className="lg:mt-6">
                                            <div className="absolute right-0 bottom-0 mr-1">
                                                <i className="text-sm lg:text-base text-gray-400 ">Click and see
                                                    more</i>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="block md:hidden">
                        <div>
                            <div className="border pt-4 p-2 mb-4 rounded-md shadow-md bg-custom-new-white">
                                {data.map((item) => (
                                    <div className="relative border p-4 mb-4 rounded-md shadow-md bg-white">
                                        <Link to={`/book/${item.id_book}`}>
                                            <HomeFetchMobile item={item} photoUrl={photoUrl}/>
                                            <div className="mt-1 sm:mt-0">
                                                <div className="absolute right-0 bottom-0 mr-2 mb-1">
                                                    <i className="text-sm text-gray-400 ">Click and see more</i>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                                <div className="relative border p-4 mb-4 rounded-md shadow-md bg-white">
                                    <Link to="/add-book">
                                        {/*<HomeFetchMobile item={item} photoUrl={photoUrl}/>*/}
                                        <HomeFetchBlankMobile/>
                                        <div className="mt-1 sm:mt-0">
                                            <div className="absolute right-0 bottom-0 mr-2 mb-1">
                                                <i className="text-sm text-gray-400 ">Click and see more</i>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // <p>Loading data...</p>  // Show while fetching data /// or backend error ¯\_(ツ)_/¯
                <div className="flex justify-center">
                    <CircularProgress size={50}/>
                </div>
            )}
        </div>
    );
}

export default HomeFetch;
