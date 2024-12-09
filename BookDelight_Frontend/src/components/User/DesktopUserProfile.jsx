import React, {useState} from 'react';
import LoadBookUserImage from "../../utils/LoadBookUserImage";
import styled from "@emotion/styled";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import theme from "../../utils/SimpleButtonTheme";
import {ThemeProvider} from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function DesktopUserProfile({user}) {

    const photoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className="flex flex-row pt-4 border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
                <div className="flex border pl-2 pt-4 pr-4 pb-4 mb-2 rounded-md shadow-md w-full bg-white">
                    <div className="flex flex-col items-center w-36 mt-3">
                        <div className="flex w-24">
                            <LoadBookUserImage item={user} photoUrl={photoUrl}/>
                        </div>
                        <div className="mt-2">
                            <p>{user.username}</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-5/6 pl-4 border-l">
                        {user.read_pages_amount &&
                            <p>Pages read in total: {user.read_pages_amount}</p>
                        }
                        {user.last_added_currently_reading_title &&
                            <p>Last book added to Currently
                                Reading: <strong> "{user.last_added_currently_reading_title}"</strong></p>
                        }
                        <div className="mt-2">
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" onClick={handleClickOpen}>
                                    View Details
                                </Button>
                            </ThemeProvider>
                        </div>

                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                                User Details
                            </DialogTitle>
                            <DialogContent dividers>
                                <Typography gutterBottom>
                                    <strong>Favorites genres:</strong> {user.genres.join(', ') || "Not provided"}
                                </Typography>
                                <Typography gutterBottom>
                                    <strong>Favorites authors:</strong> {user.authors.join(', ') || "Not provided"}
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose}>
                                    Close
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>

                    </div>
                    <div className="flex flex-col w-1/6 pl-4 border-l">
                        <p>{user.first_name} {user.last_name}</p>
                        <p>Age: {user.age}</p>
                        <p>Account created: {user.account_created_days_ago} days ago</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row pt-4 border p-2 mb-4 shadow-md rounded-md bg-custom-new-white justify-between">
                <div className="flex flex-row border p-4 mb-2 rounded-md shadow-md bg-white">
                    <p>Currently reading</p>
                </div>
                <div className="flex flex-row border p-4 mb-2 rounded-md shadow-md bg-white">
                    <p>Favorite books</p>
                </div>
                <div className="flex flex-row border p-4 mb-2 rounded-md shadow-md bg-white">
                    <p>Read books</p>
                </div>
                <div className="flex flex-row border p-4 mb-2 rounded-md shadow-md bg-white">
                    <p>Wish to read</p>
                </div>
            </div>
        </div>
    );
}

export default DesktopUserProfile;
