import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import {useAuth} from "../Auth/SessionHandling";
import LinkButton from "../../utils/LinkButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const AddReview = ({ bookId, bookTitle }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
        rating: "",
    });

    const {authData} = useAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
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
    };

    return (
        <div>
            {authData ? (
                <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    className="w-full"
                >
                    Add Review
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
                <DialogTitle>Add a Review to <i> {bookTitle} </i> </DialogTitle>

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
                        inputProps={{ min: 1, max: 10 }}
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
