import React from "react";
import {useAuth} from "../Auth/SessionHandling";
import LinkButton from "../../utils/LinkButton";

function Settings() {
    const {authData} = useAuth();


    return (
        <div>
            <LinkButton text="Change profile picture" link="/user/change-photo" />
        </div>
    );
}

export default Settings;
