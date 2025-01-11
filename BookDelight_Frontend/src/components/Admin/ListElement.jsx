import React from "react";

function ListElement({ cardTitle, items }) {
    return (
        <div
            className="flex flex-col text-center place-content-center border p-4 mb-2 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
            <div className="text-xl text-blue-500 font-semibold mb-4">
                <p>{cardTitle}</p>
            </div>
            {items.map((item, index) => (
                <div key={index} className="place-items-center">
                    <div className="flex flex-row w-11/12 mb-1 last:mb-0">
                        <p className="text-lg mb-2 font-semibold">{item.text}: </p>
                        <p className="text-xl ml-2 text-blue-500 font-semibold">{item.userData}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListElement;