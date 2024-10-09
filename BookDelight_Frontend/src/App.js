import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <div className="md:w-10/12 lg:w-10/12 max-w-7xl w-full mx-auto px-4 py-8">
            <Navbar/>
            <Outlet/>
        </div>
    );

}

export default App;
