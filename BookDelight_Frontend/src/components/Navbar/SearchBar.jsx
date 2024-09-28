import React from 'react';
import gear from '../../assets/gear.svg';
import Button from "../../utils/Button";

function SearchBar() {
    return (
        <div className="flex w-full">
            <div className="flex flex-auto flex-row w-5/6 justify-between">
                <input type="text" placeholder="Search for books"
                       className="flex-auto flex-shrink px-4 mr-2 rounded-full border-4 border-orange-100 text-sm lg:text-base"/>
                <div className="grid justify-items-center content-center h-auto mr-2 ">
                    <button
                        className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden border-4 border-orange-100 hover:border-orange-200">
                        <img src={gear} alt="advanced" className="w-5"/>
                    </button>
                </div>
            </div>
            <div className="grid justify-items-center content-center h-auto">
                <Button text="Search"/>
            </div>
        </div>
    );
}

export default SearchBar;
