import React from 'react';
import './index.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import { createRoot } from "react-dom/client";
import App from './App';
import Login from "./components/Login";
import Home from "./components/Home/Home";
import Book from "./components/Book/Book";
import Reviews from "./components/Reviews/Reviews";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="" element={<App />}>
                    <Route path="/" element={<Navigate to="/books" replace />} />
                    <Route path="/books" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/book/:id" element={<Book />} />
                    <Route path="/book/:id/reviews" element={<Reviews />} />
                </Route>
            </Routes>
        </Router>
    </React.StrictMode>,
);
