'use client'
import React from 'react';
import { SettingsideNav } from "@/app/global/settingsideNav";
import Body from "./component/body";
import { Navbar } from '../../component/navbar';


const Content = () => {
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

export default Content;