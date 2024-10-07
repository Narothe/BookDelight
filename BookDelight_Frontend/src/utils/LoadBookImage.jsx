import React, {useState} from 'react';
import AltImage from "./AltImage";
import do_not_exist from '../assets/do_not_exist.png'


function LoadBookImage({ item, photoUrl }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="w-full">
            {item.photo_path === null || imageError ? (
                // <AltImage/>
                <img src={do_not_exist} alt="alt photo" className="flex rounded-md justify-items-center"/>

            ) : (
                <img src={photoUrl + item.photo_path} alt="book photo" className="flex rounded-md justify-items-center"
                     onError={() => setImageError(true)}/>
            )}
        </div>
    );
}

export default LoadBookImage;
