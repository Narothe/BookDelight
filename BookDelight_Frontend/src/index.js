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
import AddBook from "./components/Forms/AddBook";
import UserProfile from "./components/User/UserProfile";
import Settings from "./components/Settings/Settings";
import ProtectedPath from "./components/Auth/ProtectedPath";
import ChangeProfilePicture from "./components/User/ChangeProfilePicture";
import UserVerify from "./components/Auth/UserVerify";
import ChangeBookCover from "./components/Book/ChangeBookCover";
import AdminDashboard from "./components/Admin/AdminDashboard";
import StatisticsChart from "./components/Statistics/StatisticsChart";
import Statistics from "./components/Statistics/Statistics";
import LoggingHistory from "./components/Settings/LoggingHistory";

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
                        <Route path="/user/:id" element={<UserProfile />} />
                        <Route path="/user/verify" element={<UserVerify />} />
                        <Route path="/statistics" element={<Statistics />} />

                        <Route path="/admin/dashboard" element={<AdminDashboard />} />

                        <Route path="/settings" element={
                            // <ProtectedPath>
                                <Settings/>
                            // </ProtectedPath>
                        } />

                        <Route path="/add-book" element={
                            <ProtectedPath>
                                <AddBook />
                            </ProtectedPath>
                        } />

                        <Route path="/user/logged" element={
                            <ProtectedPath>
                                <LoggingHistory />
                            </ProtectedPath>
                        } />

                        <Route path="/user/change-photo" element={
                            // <ProtectedPath>
                                <ChangeProfilePicture />
                            // </ProtectedPath>
                        } />

                        <Route path="/book/:id/add-photo" element={
                            // <ProtectedPath>
                            <ChangeBookCover />
                            // </ProtectedPath>
                        } />

                        {/*<Route path="/book/:bookId/add-review" element={*/}
                        {/*     <ProtectedPath>*/}
                        {/*        <AddReview />*/}
                        {/*    </ProtectedPath>*/}
                        {/*}*/}
                        />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    // </React.StrictMode>,
);
