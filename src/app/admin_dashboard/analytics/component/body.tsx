'use client'
import React, { useState } from 'react'
import { SideNav } from './sideNav'
import { Navbar } from "@/app/admin_dashboard/component/navbar";
import { BodyContent } from './bodyContent';




const Body = () => {

    return (
        <div className="">
            <Navbar />
            <div className="px-10 w-full">
                <div className="mx-auto w-full max-w-7xl">
                    <SideNav />
                    <BodyContent />
                </div>
            </div>
        </div>
    )
}

export default Body;



