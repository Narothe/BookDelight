import React, {useState} from 'react';
import AltImage from "./AltImage";

function LoadBookImage({ item, photoUrl }) {
    const [imageError, setImageError] = useState(false);

    return(
        <div className="w-full">
            {item.photo_path === null || imageError ? (
                    <AltImage/>
                ) : (
                    <img src={photoUrl+item.photo_path} alt="book photo" className="rounded-md" onError={() => setImageError(true)}/>
                )}
        </div>
    );
}

export default LoadBookImage;
