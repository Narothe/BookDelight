import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import {UAParser} from "ua-parser-js";

console.log("App Version:", navigator.appVersion);
console.log("App Name:", navigator.appName);
const parser = new UAParser();
console.log("Browser:", parser.getBrowser());
console.log("Operating System:", parser.getOS());
console.log("Device:", parser.getDevice());

function App() {
    return (
        <div className="md:w-10/12 lg:w-10/12 max-w-7xl w-full mx-auto px-4 py-8">
            <Navbar/>
            <Outlet/>
        </div>
    );

}

export default App;
