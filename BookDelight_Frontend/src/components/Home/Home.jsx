import React from 'react';
import HomeTextForNotRegisteredOnly from "./HomeTextForNotRegisteredOnly";
import HomeFetchData from "./HomeFetchData";

function Home() {

    return (
        <div>
            <HomeTextForNotRegisteredOnly/>

            <HomeFetchData/>
        </div>
    );
}

export default Home;
