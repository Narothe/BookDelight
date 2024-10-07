import React from 'react';
import HomeTextForNotRegisteredOnly from "./HomeTextForNotRegisteredOnly";
import HomeFetch from "./HomeFetch";

function Home() {

    return (
        <div>
            <HomeTextForNotRegisteredOnly/>

            <HomeFetch/>
        </div>
    );
}

export default Home;
