'use client'
import Link from 'next/link'
import { analysis, dashborad, logo, management, noproducts, notification } from '../../global/svg'
import React from 'react'
import { usePathname } from 'next/navigation'

// component used to check if current page matches link and adds an active class to it
const NavLink = ({ href, children, }) => {
    const pathname = usePathname(); //using the usepathname to check the current pathname and storing in this variable
    const isActive = pathname === href;//used to check if the domain url matches to the link url

    return (
        <Link href={href} className={isActive ? "flex gap-1 items-center relative before:w-full before:h-[2px] before:rounded-lg before:mx-auto before:absolute before:left- before:bottom-[-22px] before:bg-text_strong" : "flex gap-1 text-text_weak items-center"}>
            {children}
        </Link>
    )
}


// component used to check if current page matches link and adds an active class to it - the left panel navigation
const ManagentLink = ({ href, children, }) => {
    const pathname = usePathname(); //using the usepathname to check the current pathname and storing in this variable
    const isActive = pathname === href;//used to check if the domain url matches to the link url

    return (
        <Link href={href} className={isActive ? "py-2 pl-6 pr-12 ease-in-out transition-all rounded-full text-center bg-stroke_weak w-max text-black" : "text-text_weak pr-12 rounded-full hover:bg-stroke_weak/60 ease-in-out transition-all  text-center py-2 pl-6 w-max"}>
            {children}
        </Link>
    )
}



function Page() {
    return (
        <>

            {/* // header for the management page */}
            <div className="w-full z-50 border-b border-b-stroke_weak">
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
                            <div>Frank Emeka</div>
                        </div>
                    </div>


                </div>
            </div>


            {/* // management control area */}
            
            <div className=''>
            <div className='flex flex-row gap-4 pt-8'>
            {/* side panel */}
                <aside className='flex flex-col w-[30svw] gap-4 pl-20 h-[90svh]'>
                    <ManagentLink href={`./management`}>Products</ManagentLink>
                    <ManagentLink href={`/products`}>Orders</ManagentLink>
                    <ManagentLink href={`/products`}>Customers</ManagentLink>
                </aside>


                {/* main panel */}
                <div>
                    <p className="text-lg font-[500]">Product</p>

                    <div className="h-full flex justify-center items-center w-[70svw]">
                        <div className='flex flex-col w-full justify-center items-center'>
                            <div>{noproducts()}</div>
                            <h3 className='text-text_strong text-lg'>There are currently no products!</h3>
                            <p className='text-text_weak text-sm text-center pb-4 '>It looks like there are currently no products<div>available at the moment</div></p>
                            <Link href={`./management/add-product`} className='bg-text_strong text-white rounded-full py-2 px-6 hover:bg-text_weak hover:text-white ease-in-out transition-all'>Add product</Link>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </>
    )
}

export default Page
