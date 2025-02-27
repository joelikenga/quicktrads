'use client'
import React from 'react'
import { SideNav } from '../../component/sideNav'
import { Navbar } from "@/app/admin_dashboard/component/navbar";


export default function body() {

  return (
    <>
      <div className="">
        <Navbar />
        <div className="px-10 w-full">
          <div className="mx-auto w-full max-w-7xl">
            <SideNav />
            
          </div>
        </div>
      </div>
    </>
  )
}


