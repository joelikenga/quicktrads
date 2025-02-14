'use client'
import Link from 'next/link'
import { analysis, dashborad, arrowDown, logo, management, noproducts, notification } from '../../global/svg'
import React from 'react'
import Sidebar from '../../Component/sidebar'
import { usePathname } from 'next/navigation'


// component used to check if current page matches link and adds an active class to it
import { ReactNode } from 'react';

const NavLink = ({ href, children }: { href: string, children: ReactNode }) => {
    const pathname = usePathname(); //using the usepathname to check the current pathname and storing in this variable
    const isActive = pathname === href;//used to check if the domain url matches to the link url

    return (
        <Link href={href} className={isActive ? "flex gap-1 items-center relative before:w-full before:h-[2px] before:rounded-lg before:mx-auto before:absolute before:left- before:bottom-[-22px] before:bg-text_strong" : "flex gap-1 text-text_weak items-center"}>
            {children}
        </Link>
    )
}




function Page() {
    return (
        <>
            {/* // header for the management page */}
            <div className="w-full z-50 border-b border-b-stroke_weak sticky top-0 bg-white">
                {/* ----- management header ----- */}
                <div className="flex w-full justify-between px-20 py-8 h-12 items-center">
                    {/* ----- logo ----- */}
                    <Link href={`/`}>{logo()}</Link>



                    <div className='flex gap-6'>

                        {/* the links for navigation for the management page - desktop view */}
                        <div className='flex gap-6 items-center'>
                            <NavLink href={`/dashboard`}>{dashborad()} Dashboard</NavLink>
                            <NavLink href={`./management`}>{management()} Management</NavLink>
                            <NavLink href={`/analysis`}>{analysis()}Analysis</NavLink>
                            <NavLink href={`/notification`}>{notification()}Notification</NavLink>
                        </div>

                        {/* user info */}
                        <div className='flex gap-3 items-center'>
                            <div className='w-6 h-6 bg-brand_red text-white p-4 flex justify-center items-center rounded-full'>F</div>
                             <div className="flex items-center gap-2">Frank Emeka {arrowDown()}</div>
                        </div>
                    </div>


                </div>
            </div>



            {/* // management control area */}
            <div className=''>
                <div className=''>
                    {/* side panel */}
                    <Sidebar />


                    {/* main panel */}
                    <div className='pt-8 ml-[320px] h-full'>
                            <p className="text-lg font-[500]">Product</p>

                            <div className="flex justify-center items-center h-[calc(100svh-190px)]">
                                <div className='flex flex-col w-full justify-center items-center'>
                                    <div>{noproducts()}</div>
                                    <h3 className='text-text_strong font-[500] text-lg'>There are currently no products!</h3>
                                    <p className='text-text_weak text-sm pt-2 text-center pb-4 w-[290px]'>It looks like there are currently no products available at the moment</p>
                                    <Link href={`./management/add-product`} className='bg-text_strong text-white rounded-full py-[10px] px-[38.5px] hover:bg-text_weak hover:text-white ease-in-out transition-all'>Add product</Link>
                                </div>
                            </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Page
