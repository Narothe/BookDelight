import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from "./components/Login";
import Navbar from "./components/Navbar";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
