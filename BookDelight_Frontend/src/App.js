import React, { useEffect } from 'react';
import axios from "axios";
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";

const backendURL = process.env.REACT_APP_BACKEND_URL;

function App() {
    useEffect(() => {
        axios.get(backendURL, {
            headers: {
                'Cache-Control': 'no-cache',
            }
        })
            .then(response => {
                console.log('Api is working');
            })
            .catch(error => {
                console.error('Api is NOT working');
                console.error(error);
            });
    }, []);

    return (
        <div className="w-11/12 md:w-10/12 lg:w-9/12 xl:w-10/12 mx-auto px-4 py-8">
            <Navbar/>
            <Outlet/>
        </div>
    );

}

export default App;
