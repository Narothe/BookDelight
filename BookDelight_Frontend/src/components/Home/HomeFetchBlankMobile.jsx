import React from "react";
import DisplayRating from "../../utils/DisplayRating";
import blank_book from "../../assets/blank_book.png";

function HomeFetchMobile() {

    return (
        <div className="flex flex-row">
            <div className="flex w-full">
                <div className="flex flex-col w-36">
                    {/*<LoadBookImage item={item} photoUrl={photoUrl}/>*/}
                    <div className="w-full">
                        <img src={blank_book} alt="alt" className="flex rounded-md justify-items-center"/>
                    </div>
                    <div className="block sm:hidden">
                        <div className="flex flex-row text-sm sm:text-base justify-center mt-1 font-semibold">
                            <p className="pr-1">Rating: </p>
                            <DisplayRating value={"9.89"}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full px-4">
                    <div className="text-xl lg:text-2xl font-semibold">
                        <h2>Here could be a book you add!</h2>
                    </div>
                    <div className="hidden sm:block">
                        <div className="flex flex-row mb-2 text-sm sm:text-base font-semibold">
                            <p className="pr-1">Rating: </p>
                            <DisplayRating value={"9.89"}/>
                        </div>
                    </div>
                    <div className="">
                        <p>What else are you waiting for? Add a book before someone else runs you down!</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default HomeFetchMobile;
