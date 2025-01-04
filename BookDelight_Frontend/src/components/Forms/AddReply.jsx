import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import {useAuth} from "../Auth/SessionHandling";
import LinkButton from "../../utils/LinkButton";
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import BootstrapDialog from "../../utils/BootstrapDialog";

const AddReview = ({ bookId, reviewId, reviewUser, post }) => {
    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        description: "",
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
                `${process.env.REACT_APP_BACKEND_URL}/book/${bookId}/review/${reviewId}/add-reply`,
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
                    Add Reply
                </Button>
            ) : (
                <LinkButton text={"Add Reply"} link={"/login"}/>
            )}

            <BootstrapDialog
                onClose={() => setOpen(false)}
                open={open}
                fullWidth
                maxWidth="sm"
            >
                <div className="flex flex-row items-center justify-between">
                    <DialogTitle>
                        Add a Reply to Review created by user <i> {reviewUser} </i>
                    </DialogTitle>
                    <div className="flex w-8 mr-4">
                        <LoadBookUserImage item={post} photoUrl={photoUrl}/>
                    </div>
                </div>
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
