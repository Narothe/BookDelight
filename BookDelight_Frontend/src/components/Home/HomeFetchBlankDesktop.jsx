import React from "react";
import DisplayRating from "../../utils/DisplayRating";
import blank_book from "../../assets/blank_book.png";

function HomeFetchBlankDesktop() {

    return (
        <div className="flex flex-row">
            <div className="flex w-full">
                <div className="flex flex-col w-56">
                    {/*<LoadBookImage item={item} photoUrl={photoUrl}/>*/}
                        <div className="w-full">
                            <img src={blank_book} alt="alt" className="flex rounded-md justify-items-center"/>
                        </div>
                    <div className="flex flex-row mt-1 justify-center font-semibold">
                        <p className="pr-1">Rating: </p>
                        <DisplayRating value={"9.89"}/>
                    </div>
                </div>
                <div className="flex flex-col float-right w-full ml-2">
                    <div className="text-xl lg:text-2xl font-semibold">
                        <h2>Here could be a book you add!</h2>
                    </div>
                    <div className="mt-2">
                        <p>What else are you waiting for? Add a book before someone else runs you down!</p>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default HomeFetchBlankDesktop;
