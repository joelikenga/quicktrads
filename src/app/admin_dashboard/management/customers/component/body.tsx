'use client'
// import { arrowleft, alertIcn, info, success, arrowDown, imageadd, removeBin } from '@/app/global/svg'
import React from 'react'
import { SideNav } from '../../component/sideNav'
import { Navbar } from "@/app/admin_dashboard/component/navbar";
// import { userGroup } from '@/app/global/svg';
import { CustomerModal } from './customermodal';




export default function body() {

  return (
    <>
      <div className="">
        <Navbar />
        <div className="px-10 w-full">
          <div className="mx-auto w-full max-w-7xl ">
            <SideNav />
            <CustomerModal />
          </div>
        </div>
      </div>
    </>
  )
}


