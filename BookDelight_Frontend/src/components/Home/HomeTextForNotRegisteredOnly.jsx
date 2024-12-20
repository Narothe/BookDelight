import React from "react";
import LinkButton from "../../utils/LinkButton";

function HomeTextForNotRegisteredOnly () {
    return (
        <div>
            <div className="flex items-center">
                <div className="flex text-base lg:text-lg leading-relaxed">
                    Search for information about the book you are interested in or join us for more features!
                </div>
                <div className="flex pl-4 items-center md:items-end">
                    <LinkButton text="Log in" link="/login"/>
                </div>
            </div>
        </div>
    );
}

export default HomeTextForNotRegisteredOnly;
