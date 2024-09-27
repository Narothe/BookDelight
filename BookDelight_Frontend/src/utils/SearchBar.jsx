import React from 'react';

function SearchBar() {
    return (
    <div className="flex flex-row w-full px-5 bg-blue-500">
        <input type="text" placeholder="Search for books" className="flex-auto px-4 mr-2 rounded-full border-2 border-gray-300"/>
        <div className="flex flex-row mr-2 bg-yellow-200 rounded-full">
            <button type="search" className="flex h-auto mr-2 w-auto bg-fuchsia-500 rounded-full">asd</button>
            <button type="search" className="flex h-auto w-auto bg-fuchsia-500 rounded-full">asd</button>
        </div>

    </div>
    );
}

export default SearchBar;