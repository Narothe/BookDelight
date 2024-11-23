import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import {UAParser} from "ua-parser-js";
import {Toaster} from "react-hot-toast";

console.log("App Version:", navigator.appVersion);
console.log("App Name:", navigator.appName);
const parser = new UAParser();
console.log("Browser:", parser.getBrowser());
console.log("Operating System:", parser.getOS());
console.log("Device:", parser.getDevice());

function App() {
    return (
        // <div className="md:w-10/12 lg:w-10/12 max-w-7xl w-full mx-auto px-4">
        <div className="max-w-[1920px] mx-auto">
                <div>
                    <Navbar/>
                </div>
                <div className="md:px-5 px-4 w-full">
                    <Toaster/>
                    <Outlet/>
                </div>
        </div>
    );
}

export default App;
