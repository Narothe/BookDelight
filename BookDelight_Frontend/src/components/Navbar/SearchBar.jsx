import React from 'react';
import gear from '../../assets/gear.svg';
import plus from '../../assets/plus.svg';
import SimpleButton from "../../utils/SimpleButton";
import SearchInput from "./SearchInput";
import {useAuth} from "../Auth/SessionHandling";
import {Link} from "react-router-dom";

function SearchBar() {
    const {authData} = useAuth();


    return (
        <div className="flex w-full">
            <div className="flex flex-auto flex-row w-5/6 justify-between">
                {/*<input type="text" placeholder="Search for books"*/}
                {/*       className="flex-auto flex-shrink px-4 mr-2 rounded-full focus:outline-none focus:border-custom-light-blue border-4 border-orange-100 hover:border-orange-200 text-sm lg:text-base"/>*/}
                <div className="w-full">
                    <SearchInput/>
                </div>
                <div className="grid justify-items-center content-center h-auto mr-2 ">
                    <button
                        className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden hover:animate-spin border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">
                        <img src={gear} alt="advanced" className="w-5"/>
                    </button>
                </div>
            </div>
            <div className="grid justify-items-center content-center h-auto">
                <SimpleButton text="Search"/>
            </div>
            {/*{authData && (*/}
            {/*<div className="grid justify-items-center content-center h-auto">*/}
            {/*    <Link*/}
            {/*        to="/add-book"*/}
            {/*        className="grid justify-items-center content-center w-8 h-8 rounded-full overflow-hidden hover:animate-spin border-4 border-custom-new-light-dark hover:border-custom-new-dark-hover active:border-custom-new-dark">*/}
            {/*        <img src={plus} alt="advanced" className="w-5"/>*/}

            {/*    </Link>*/}
            {/*</div>*/}
            {/*    )}*/}
        </div>
    );
}

export default SearchBar;
