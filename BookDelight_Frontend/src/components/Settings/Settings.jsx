import React from "react";
import {useAuth} from "../Auth/SessionHandling";

function Settings() {
    const {authData} = useAuth();


    return (
        <div>
            Settings
        </div>
    );
}

export default Settings;
