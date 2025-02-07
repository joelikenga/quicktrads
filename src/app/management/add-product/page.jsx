'use client'
import Link from 'next/link'
import { analysis, arrowleft, plus, dashborad, info, logo, management, notification } from '../../global/svg'
import React, { useState } from 'react'
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
        <Link href={href} className={isActive ? "py-2 pl-6 pr-12 ease-in-out rounded-full text-center transition-all bg-stroke_weak w-max text-black" : "text-text_weak pr-12 rounded-full transition-all hover:bg-stroke_weak/60 ease-in-out  text-center py-2 pl-6 w-max"}>
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
                            <NavLink href={`/management/add-product`}>{management()} Management</NavLink>
                            <NavLink href={`/analysis`}>{analysis()}Analysis</NavLink>
                            <NavLink href={`/notification`}>{notification()}Notification</NavLink>
                        </div>

                        {/* user info */}
                        <div className='flex gap-3 items-center'>
                            <div className='w-6 h-6 bg-brand_primary bg-brand_red text-white p-4 flex justify-center items-center rounded-full'>F</div>
                            <div>Frank Emeka</div>
                        </div>
                    </div>


                </div>
            </div>


            {/* // management control area */}
            <div className=''>
                <div className='flex flex-row gap-4 pt-8'>
                    {/* side panel */}
                    <aside className='flex flex-col w-[30svw] gap-4 pl-20 h-full'>
                        <ManagentLink href={`/management/add-product`}>Products</ManagentLink>
                        <ManagentLink href={`/products`}>Orders</ManagentLink>
                        <ManagentLink href={`/products`}>Customers</ManagentLink>
                    </aside>


                    {/* main panel */}
                    <div>
                        <Link href={`/management`} className='flex text-lg items-center pb-6 gap-1'>{arrowleft()}Add product</Link>

                        <div className='flex xl:gap-4 2xl:gap-[73px]'>
                            {/* the card sections where the images will be previewed and uploaded */}
                            <div>
                                <p>Image</p>

                                <div className='pt-2'>
                                    <p className='flex items-center gap-1 text-sm text-text_weak'>{info()}The first image will be your cover image (Note: you can move or drag image)</p>

                                    {/*  */}
                                    <div className='flex gap-6 pt-2'>
                                        {/*  */}
                                        <div className='flex flex-col gap-4'>
                                            <div className="w-[100px] flex justify-center items-center h-[120px] border border-text_weak border-dashed">
                                                {plus()}
                                            </div>
                                            <div className="w-[100px] flex justify-center items-center h-[120px] border border-text_weak border-dashed">
                                                {plus()}
                                            </div>
                                            <div className="w-[100px] flex justify-center items-center h-[120px] border border-text_weak border-dashed">
                                                {plus()}
                                            </div>
                                        </div>

                                        {/*  */}
                                        <div>
                                            <div className='w-[492px] h-[600px] border border-dashed border-text_weak'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* product options */}
                            <section>
                                <div className='pb-4 w-full'>
                                    <label htmlFor="name">
                                        <p className='pb-2 text-sm'>Name</p>
                                        <input type="text" name="name" id="name" autoComplete className='border w-auto border-stroke_strong rounded-md py-1 px-2' />
                                    </label>
                                </div>


                                <div className="pb-4 w-full">
                                    <label htmlFor="price">
                                        <p className='pb-2 text-sm'>Regular price</p>
                                        <input type="text" list='currency' name="price" id="price" className='border w-auto border-stroke_strong placeholder:text-text_weak rounded-md py-1 px-2' />
                                        <datalist id="currency">
                                            <option value="NGN ₦"></option>
                                            <option value="USD $"></option>
                                        </datalist>
                                    </label>
                                </div>


                                <div className="pb-4 w-full">
                                    <label htmlFor="discount-price">
                                        <p className='pb-2 text-sm'>Discount price <span className='text-sm w-auto text-text_weak'>(Optional)</span></p>
                                        <input type="text" list='currency' name="discount-price" id="discount-price" className='border border-stroke_strong placeholder:text-text_weak rounded-md py-1 px-2' />
                                        <datalist id="currency">
                                            <option value="NGN ₦"></option>
                                            <option value="USD $"></option>
                                        </datalist>
                                    </label>
                                </div>

                                {/* size filter options */}
                                <div className='pt-4'>
                                    <p className='pb-2 text-sm'>Size</p>

                                    <p className="text-[12px] 2xl:text-sm text-text_weak relative flex gap-1  items-center"><span>{info()}</span>Select all product available size below</p>


                                    {/* size option filter itself */}
                                    <div className="flex gap-4 pt-4 flex-col">
                                        <div className='flex gap-3'>
                                            {/*  */}
                                            <div className="w-full border text-center rounded-lg border-stroke_strong py-2 px-6">
                                                <h3 className='text-sm'>XS</h3>
                                                <p className='text-sm text-text_weak'>Extra Small</p>
                                            </div>
                                            {/*  */}
                                            <div className="w-full border text-center rounded-lg border-stroke_strong py-2 px-6">
                                                <h3 className='text-sm'>S</h3>
                                                <p className='text-sm text-text_weak'>Small</p>
                                            </div>
                                        </div>

                                        {/*  */}
                                        <div className='flex gap-3'>
                                            {/*  */}
                                            <div className='w-full border text-center rounded-lg border-stroke_strong py-2 px-4 2xl:px-6'>
                                                <h3 className='text-sm'>M</h3>
                                                <p className='text-sm text-text_weak'>Medium</p>
                                            </div>
                                            {/*  */}
                                            <div className='w-full border text-center rounded-lg border-stroke_strong py-2 px-4 2xl:px-6'>
                                                <h3 className='text-sm'>L</h3>
                                                <p className='text-sm text-text_weak'>Large</p>
                                            </div>
                                        </div>

                                        <div className='w-full border text-center rounded-lg border-stroke_strong py-2 px-4 2xl:px-6'>
                                            <h3 className='text-sm'>XL</h3>
                                            <p className='text-sm text-text_weak'>Extra Large</p>
                                        </div>
                                    </div>

                                    {/* category */}
                                    <div className='pt-3'>
                                        <p className="text-[12px] pb-2">category</p>

                                        <p className='flex gap-1 text-sm text-text_weak pb-2 items-center'>{info()}Select all product category below</p>

                                        {/* category filter options */}
                                        <div className='flex flex-col gap-3'>
                                            <div className='flex gap-2'>
                                                <div className='border rounded-lg text-center text-sm w-full border-stroke_strong py-2 px-6'>Men</div>
                                                <div className='border rounded-lg text-center text-sm w-full border-stroke_strong py-2 px-6'>Women</div>
                                            </div>
                                            <div className='border rounded-lg text-center text-sm w-full border-stroke_strong py-2 px-6'>
                                                Unisex
                                            </div>
                                        </div>


                                    </div>


                                    {/* about product */}
                                    <div className='pt-3'>
                                        <p className='pb-2'>About product</p>

                                        <textarea name="" className='w-full h-[88px] border rounded-lg pt-2' id=""></textarea>
                                    </div>
                                </div>


                                <div className='flex flex-col lg:gap-2 2xl:gap-6 pt-4'>
                                    <div className='rounded-full py-[10px] px-18 border border-text_strong text-center text-sm bg-text_strong text-white'>Upload product</div>
                                    <div className='rounded-full py-[10px] px-18 border border-stroke_strong text-center text-sm text-text_strong'>Save to draft</div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Page
