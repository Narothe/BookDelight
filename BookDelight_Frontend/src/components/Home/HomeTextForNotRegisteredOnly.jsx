import React from "react";
import LinkButton from "../../utils/LinkButton";

function HomeTextForNotRegisteredOnly () {
    return (
        <div>
            <div className="flex">
                <div className="flex text-base lg:text-lg leading-relaxed mt-4">
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
