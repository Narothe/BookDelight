import React, {useState} from 'react';
import do_not_exist from '../assets/do_not_exist.png'

function LoadBookImage({ item, photoUrl }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="w-full">
            {item.photo_path === null || imageError ? (
                <img src={do_not_exist} alt="alt" className="flex rounded-md justify-items-center"/>

            ) : (
                <img src={photoUrl + item.photo_path} alt="book" className="flex rounded-md justify-items-center"
                     onError={() => setImageError(true)}/>
            )}
        </div>
    );
}

export default LoadBookImage;
