'use client'
import AdminNavbar from "@/app/global/adminNavbar";
import React from 'react';
import { SettingsideNav } from "@/app/global/settingsideNav";
import Body from "./component/body";


const Profile = () => {
    return (
        <>
            <AdminNavbar />
            <div className="w-full max-w-7xl mx-auto">
                <SettingsideNav />
                <Body />
            </div>
        </>
    )
}

export default Profile;