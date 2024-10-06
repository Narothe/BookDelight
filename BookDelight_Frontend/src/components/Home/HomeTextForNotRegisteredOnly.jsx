import React from "react";
import LinkButton from "../../utils/LinkButton";

function HomeTextForNotRegisteredOnly () {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 font-mono">Welcome to BookDelight!</h1>
            <p className="text-lg leading-relaxed">
                Browse a collection of books in an easy and simple way. Browse, add, filter, rate the books you are
                looking for.
            </p>
            <div className="flex">
                <div className="flex text-lg leading-relaxed mt-4">
                    Search for information about the book you are interested in or join us for more features!
                </div>
                <div className="flex px-4 items-center md:items-end">
                    <LinkButton text="Log in" link="/login"/>
                </div>
            </div>
        </div>
    );
}

export default HomeTextForNotRegisteredOnly;
