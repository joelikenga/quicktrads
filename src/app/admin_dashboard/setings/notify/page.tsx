'use client'
import AdminNavbar from "@/app/global/adminNavbar";
import React from 'react'
import { Body } from './component/body';
import { SettingsideNav } from "@/app/global/settingsideNav";


const Notify = () => {
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

export default Notify;