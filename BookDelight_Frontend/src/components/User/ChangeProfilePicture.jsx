import React, {useEffect, useState} from "react";
import LogoLink from "../../utils/LogoLink";
import {useAuth} from "../Auth/SessionHandling";
import axios from "axios";
import {toast} from "react-hot-toast";
import LoadUserImage from "../../utils/LoadUserImage";
import {Button} from "@mui/material";
import theme from "../../utils/SimpleButtonTheme";
import {ThemeProvider} from "@mui/material/styles";
import LinkButton from "../../utils/LinkButton";
import {useNavigate} from "react-router-dom";


function ChangeProfilePicture() {
    const {authData} = useAuth();
    const userId = authData?.user?.userId;

    const userPhotoUrl = `${process.env.REACT_APP_USER_PHOTO_URL}`;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [currentPhoto, setCurrentPhoto] = useState(null);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const filePreview = URL.createObjectURL(file);
            setPreview(filePreview);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error("Please select a photo.");
            return;
        }

        const formData = new FormData();
        formData.append("user-photo", selectedFile);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/user/change-photo`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${authData.token}`,
                    },
                }
            );

            toast.success(response.data.message);

            setTimeout(() => {
                navigate("/books");
            }, 1500);

        } catch (err) {
            console.error("Error uploading photo:", err);
            toast.error(err.response?.data?.error || "Something went wrong.");
        }
    };

    useEffect(() => {
        const fetchPhoto = async () => {
            if (!userId) return;
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}/photo`);
                setCurrentPhoto(response.data.photo_path);
            } catch (err) {
                console.error("Error fetching photo:", err);
            }
        };

        fetchPhoto();
    }, [userId, authData.token]);


        return (
        <div className="mx-4 mt-10 justify-items-center">
            <div className="pt-2 pb-3">
                <LogoLink/>
            </div>
            <div className="border pt-4 p-2 mb-4 md:w-1/2 xl:w-1/3 rounded-md shadow-md bg-custom-new-white">
                <div className="flex flex-col border p-4 mb-4 items-center rounded-md shadow-md bg-white">
                    <h1 className="text-lg lg:text-xl font-bold font-mono">Change profile picture</h1>
                    <div className="flex flex-col items-center mt-4">
                        <p className="text-gray-500">Your photo now:</p>
                        <div className="mt-1 w-48">
                            <LoadUserImage item={{photo_path: currentPhoto}} photoUrl={userPhotoUrl}/>
                        </div>
                    </div>
                    <div className="container mx-auto mt-4">
                        <form onSubmit={handleSubmit} className="mt-5">
                            <div className="mb-4">
                                <label
                                    htmlFor="user-photo"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Upload Photo
                                </label>
                                <input
                                    type="file"
                                    id="user-photo"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full"
                                />
                            </div>

                            {preview && (
                                <div className="flex flex-col items-center mb-4">
                                    <p className="text-gray-500">Photo Preview:</p>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="mt-1 w-48 rounded-md"
                                    />
                                </div>
                            )}
                            <div className="flex place-content-center pt-4">
                                <div className="flex flex-row justify-between w-48">
                                    <Button type="submit" variant="contained">
                                        Submit
                                    </Button>

                                    <ThemeProvider theme={theme}>
                                        <LinkButton text="Cancel" link="/books" />
                                    </ThemeProvider>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ChangeProfilePicture;
