import React, {useState} from 'react';
import notExistingUserPhoto from "../assets/user.svg";


function LoadUserImage({ item, photoUrl }) {
    const [imageError, setImageError] = useState(false);

    // console.log("item:", item);

    return (
        <div className="w-full">
            {item.photo_path === null || imageError ? (
                <div className="flex w-12 place-self-center">
                    <img src={notExistingUserPhoto} alt="alt" className="flex rounded-md justify-items-center"/>
                </div>
            ) : (
                <img src={photoUrl + item.photo_path} alt="user" className="flex rounded-md justify-items-center"
                     onError={() => setImageError(true)}/>
            )}
        </div>
    );
}

export default LoadUserImage;



// function LoadUserImage({ item, photoUrl }) {
//     const [imageError, setImageError] = useState(false);
//
//     const imagePath = item?.photo_path;
//     const imageSrc = imagePath ? `${photoUrl}/${imagePath}` : null;
//
//     return (
//         <div className="w-full">
//             {!imageSrc || imageError ? (
//                 <div>
//                     <img
//                         src={notExistingUserPhoto}
//                         alt="User default"
//                         className="flex rounded-md justify-items-center"
//                     />
//                 </div>
//             ) : (
//                 <img
//                     src={imageSrc}
//                     alt="User Avatar"
//                     onError={() => setImageError(true)}
//                     className="flex rounded-md justify-items-center"
//                 />
//             )}
//         </div>
//     );
// }
//
// export default LoadUserImage;
