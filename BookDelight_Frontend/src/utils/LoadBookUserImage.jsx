import React, {useState} from 'react';
import notExistingUserPhoto from "../assets/user.svg";

// Load a user image
// If the image does not exist, a default image is displayed

function LoadBookUserImage({ item, photoUrl }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="w-full">
            {item.author_photo === null || imageError ? (
                <img src={notExistingUserPhoto} alt="alt" className="flex rounded-md justify-items-center"/>
            ) : (
                <img src={photoUrl + item.author_photo} alt="user" className="flex rounded-md justify-items-center"
                     onError={() => setImageError(true)}/>
            )}
        </div>
    );
}

export default LoadBookUserImage;
