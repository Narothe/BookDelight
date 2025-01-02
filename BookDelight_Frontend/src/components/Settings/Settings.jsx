import React from "react";
import LinkButton from "../../utils/LinkButton";

function Settings() {

    return (
        <div className="flex flex-col">
            <LinkButton text="Change profile picture" link="/user/change-photo" />
            <LinkButton text="Verify Your adress email" link="/user/verify" />
        </div>
    );
}

export default Settings;
