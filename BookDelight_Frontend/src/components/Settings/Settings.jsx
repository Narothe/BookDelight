import React from "react";
import LinkButton from "../../utils/LinkButton";
import LogoLink from "../../utils/LogoLink";

function Settings() {

    return (
        <div className="mx-4 mt-10 justify-items-center">
            <div className="pt-2 pb-3">
                <LogoLink/>
            </div>
            <div className="border pt-4 p-2 mb-4 md:w-1/2 xl:w-1/3 rounded-md shadow-md bg-custom-new-white">
                <div className="flex flex-col border p-4 mb-4 items-center rounded-md shadow-md bg-white">
                    <h1 className="text-xl lg:text-2xl mb-4 font-bold font-mono">Settings</h1>
                    <div className="grid gap-2">
                        <LinkButton text="Change profile picture" link="/user/change-photo"/>
                        <LinkButton text="Verify Your adress email" link="/user/verify"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
