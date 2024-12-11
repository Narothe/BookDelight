import React from "react";
import LinkButton from "../../utils/LinkButton";

function HomeTextForRegisteredOnly () {
    return (
        <div>
            <div className="flex items-center">
                <div className="flex text-base lg:text-lg leading-relaxed">
                    You can also add a book for all to see!
                </div>
                <div className="flex pl-4 items-center md:items-end">
                    <LinkButton text="Add book" link="/add-book"/>
                </div>
            </div>
        </div>
    );
}

export default HomeTextForRegisteredOnly;
