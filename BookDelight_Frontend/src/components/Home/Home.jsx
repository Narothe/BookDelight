import React from 'react';
import HomeTextForNotRegisteredOnly from "./HomeTextForNotRegisteredOnly";
import HomeFetch from "./HomeFetch";

function Home() {

    return (
        <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-4 font-mono">Welcome to BookDelight!</h1>
            <p className="text-base lg:text-lg leading-relaxed">
                Browse a collection of books in an easy and simple way. Browse, add, filter, rate the books you are
                looking for...
            </p>
            <HomeTextForNotRegisteredOnly/>

            <HomeFetch/>
        </div>
    );
}

export default Home;
