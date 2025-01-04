import React, {useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import {useAuth} from "../Auth/SessionHandling";
import LinkButton from "../../utils/LinkButton";
import BootstrapDialog from "../../utils/BootstrapDialog";

const AddReview = ({ bookId, bookTitle }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        rating: "",
    });

    const [userReviewExists, setUserReviewExists] = useState(false);

    const {authData} = useAuth();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (!authData) {
                    return;
                }

                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/book/${bookId}/reviews`
                );

                const userHasReview = response.data.some(
                    (review) => review.review_author_id === authData.user.userId
                );
                setUserReviewExists(userHasReview);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }

        };
        fetchReviews();

    }, []);

    const handleSubmit = async () => {
        if (!userReviewExists) {
            try {
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/book/${bookId}/add-review`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${authData.token}`
                        },
                    }
                );
                toast.success("Review added successfully!");
                setOpen(false);
                setTimeout(() => window.location.reload(), 1000);
            } catch (err) {
                console.error("Error adding review:", err);
                toast.error("Something went wrong. Please try again.");
            }
        } else {
            console.error("User already added a review to this book!");
            toast.error("You already added a review to this review!");
        }

    };

    return (
        <div>
            {authData ? (
                <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    className="w-full"
                    disabled={userReviewExists}
                >
                    {userReviewExists ? "Review Already Added" : "Add Review"}
                </Button>
            ) : (
                <LinkButton text={"Add Review"} link={"/login"}/>
            )}

            <BootstrapDialog
                onClose={() => setOpen(false)}
                open={open}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Add a Review to book <i> {bookTitle} </i> </DialogTitle>

                <DialogContent dividers>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Rating 1-10"
                        name="rating"
                        type="number"
                        value={formData.rating}
                        onChange={handleInputChange}
                        margin="normal"
                        inputProps={{min: 1, max: 10}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default AddReview;
