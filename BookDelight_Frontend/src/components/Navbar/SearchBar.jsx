import React, { useState, useRef, useEffect } from "react";
import SearchInput from "./SearchInput";
import axios from "axios";
import {Link} from "react-router-dom";
import LoadBookImage from "../../utils/LoadBookImage";
import {TextField} from "@mui/material";

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const resultsRef = useRef(null);
    const photoUrl = `${process.env.REACT_APP_BOOK_PHOTO_URL}`;

    const [advancedSearchValues, setAdvancedSearchValues] = useState({
        minLength: "",
        maxLength: "",
        minRating: "",
        maxRating: "",
    });

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

    const fetchResults = async (query, advancedValues) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/book/search`,
                {
                    payload: query || null,
                    minLength: advancedValues.minLength || null,
                    maxLength: advancedValues.maxLength || null,
                    minRating: advancedValues.minRating || null,
                    maxRating: advancedValues.maxRating || null,
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

        // Delayed fetch with searchQuery
        setTimeout(() => {
            fetchResults(query, advancedSearchValues);
        }, 300);
    };

    const handleAdvancedSearchChange = (key, value) => {
        setAdvancedSearchValues((prevValues) => {
            const updatedValues = {
                ...prevValues,
                [key]: value,
            };

            // Immediate fetch with updated advanced values
            fetchResults(searchQuery, updatedValues);

            return updatedValues;
        });
    };

    return (
        <div className="relative w-full">
            <div className="flex w-full">
                <div className="flex flex-auto flex-row w-5/6 justify-between">
                    <div className="w-full">
                        <SearchInput
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => setShowResults(true)}
                        />
                    </div>
                </div>
            </div>
            <div
                ref={resultsRef}
                className={`absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md z-30 
          ${showResults ? "transition-opacity opacity-100 duration-300" : "transition-opacity opacity-0 duration-300 pointer-events-none"}`}
                style={{
                    minHeight: "350px",
                    overflowY: "auto",
                }}
            >
                <div className="static">
                    <div
                        className="absolute top-0 right-0 bg-white border border-gray-300 shadow-lg z-50 p-4 rounded-md"
                        style={{width: "90%", maxWidth: "200px"}}
                    >
                        <h2 className="text-lg text-center font-semibold">Advanced Search</h2>
                        <div className="flex flex-col">
                            {["minLength", "maxLength", "minRating", "maxRating"].map((field) => (
                                <TextField
                                    key={field}
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    id={field}
                                    type="number"
                                    label={field
                                        .replace("min", "Min ")
                                        .replace("max", "Max ")
                                        .replace(/([A-Z])/g, " $1")}
                                    value={advancedSearchValues[field]}
                                    onChange={(e) =>
                                        handleAdvancedSearchChange(field, e.target.value)
                                    }
                                    sx={{
                                        input: { fontSize: { xs: "0.875rem", md: "1rem" } },
                                    }}
                                />
                            ))}
                        </div>
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
