import React, { useState, useRef, useEffect } from "react";
import gear from "../../assets/gear.svg";
import SearchInput from "./SearchInput";
import axios from "axios";
import {Link} from "react-router-dom";
import LoadBookImage from "../../utils/LoadBookImage";

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const resultsRef = useRef(null);
    const searchTimeout = useRef(null);
    const photoUrl = `${process.env.REACT_APP_BOOK_PHOTO_URL}`;


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (resultsRef.current && !resultsRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDynamicSearch = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/book/search`,
                {
                    payload: query,
                    minLength: null,
                    maxLength: null,
                    minRating: null,
                    maxRating: null,
                }
            );
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error during search:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);

        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => handleDynamicSearch(query), 300);
    };

    return (
        <div className="relative w-full">
            <div className="flex w-full">
                <div className="flex flex-auto flex-row w-5/6 justify-between">
                    <div className="w-full">
                        <SearchInput
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => setShowResults(true)} // Otwórz warstwę wyników po kliknięciu
                        />
                    </div>
                </div>
            </div>
            <div
                ref={resultsRef}
                className={`absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md z-50 
          ${showResults ? "transition-opacity opacity-100 duration-300" : "transition-opacity opacity-0 duration-300 pointer-events-none"}`}
                style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                }}
            >
                <div className="static">
                    <div className="absolute top-0 right-0 mr-2 mt-2">
                    <button
                        className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark hover:animate-spinOnce"
                    >
                        <img src={gear} alt="advanced" className="w-5" />
                    </button>
                    </div>
                </div>
                {loading ? (
                    <p className="p-4 text-gray-500">Loading...</p>
                ) : searchResults.length > 0 ? (
                    searchResults.map((result) => (
                        <div
                            key={result.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <Link to={`/book/${result.id_book}`}>
                                <div className="flex flex-row items-center">
                                    <div className="w-12">
                                        <LoadBookImage item={result} photoUrl={photoUrl}/>
                                    </div>
                                    <div className="flex flex-col ml-1.5">
                                        <p className="font-semibold">{result.title}</p>
                                        <p className="text-sm text-gray-500">{result.authors.join(', ')}</p>
                                        <div className="flex flex-row">
                                            <p className="text-sm text-gray-500">ISBN: {result.isbn} &#8226; R</p>
                                            <p className="text-sm text-gray-500">ate: {result.rating}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="p-4 text-gray-500">No results found.</p>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
