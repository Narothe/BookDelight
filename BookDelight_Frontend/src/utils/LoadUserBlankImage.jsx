import React from 'react';
import notExistingUserPhoto from "../assets/user.svg";


function LoadUserBlankImage({ item, photoUrl }) {

    return (
        <div className="w-full">
            <div className="flex w-8 place-self-center">
                <img src={notExistingUserPhoto} alt="alt" className="flex rounded-md justify-items-center"/>
            </div>
        </div>
    );
}

export default LoadUserBlankImage;