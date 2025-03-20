'use client'
import React from 'react'
import { Body } from './component/body';
import { SettingsideNav } from "@/app/admin_dashboard/settings/component/settingsideNav";
import { Navbar } from "../../component/navbar";


const Notify = () => {
    return (
        <>
            <Navbar /><div className="w-full px-10">
            <div className="w-full max-w-7xl mx-auto">
                <SettingsideNav />
                <Body />
                </div>
            </div>
        </>
    )
}

export default Notify;