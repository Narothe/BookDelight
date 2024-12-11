import React, {useState} from 'react';
import notExistingUserPhoto from "../assets/user.svg";

// Load a user image
// If the image does not exist, a default image is displayed

function LoadBookUserImage({ item, photoUrl }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="w-full">
            {item.author_photo === null || imageError ? (
                <div className="flex w-12 place-self-center">
                    <img src={notExistingUserPhoto} alt="alt" className="flex rounded-md justify-items-center"/>
                </div>
            ) : (
                <img src={photoUrl + item.author_photo} alt="user" className="flex rounded-md justify-items-center"
                     onError={() => setImageError(true)}/>
            )}
        </div>
    );
}

export default LoadBookUserImage;
