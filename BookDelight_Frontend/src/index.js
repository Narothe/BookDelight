import React from 'react';
import './index.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import { createRoot } from "react-dom/client";
import App from './App';
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";
import Book from "./components/Book/Book";
import ReviewCommentSection from "./components/Comments/ReviewCommentSection";
import Register from "./components/Auth/Register";
import {AuthProvider} from "./components/Auth/SessionHandling";
import AddBook from "./components/AddBook/AddBook";
import UserProfile from "./components/User/UserProfile";
import Settings from "./components/Settings/Settings";
import AddReview from "./components/Comments/AddReview";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Available website paths

root.render(
    // <React.StrictMode>
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="" element={<App />}>
                        <Route path="/" element={<Navigate to="/books" replace />} />
                        <Route path="/books" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/book/:id" element={<Book />} />
                        <Route path="/book/:bookId/review/:reviewId/all-reply" element={<ReviewCommentSection />} />
                        <Route path="/add-book" element={<AddBook />} />
                        <Route path="/user/:id" element={<UserProfile />} />
                        <Route path="/settings" element={<Settings/>} />
                        <Route path="/add-review" element={<AddReview />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    // </React.StrictMode>,
);
