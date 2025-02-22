'use client'
import Link from 'next/link'
import { arrowleft, alertIcn, info, success, arrowDown, imageadd, removeBin } from '@/app/global/svg'
import React from 'react'
import { SideNav } from '../../component/sideNav'
import  AdminNavbar  from '@/app/global/adminNavbar'

export default function body() {


    // component used to check if current page matches link and adds an active class to it - the left panel navigation
    // const ManagentLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    //     const pathname = usePathname(); //using the usepathname to check the current pathname and storing in this variable
    //     const isActive = pathname === href;//used to check if the domain url matches to the link url

    //     return (
    //         <Link href={href} className={isActive ? "py-2 pl-6 pr-12 ease-in-out rounded-full text-center transition-all bg-stroke_weak w-max text-black" : "text-text_weak pr-12 rounded-full transition-all hover:bg-stroke_weak/60 ease-in-out  text-center py-2 pl-6 w-max"}>
    //             {children}
    //         </Link>
    //     )
    // }

    return (
        <>
            <AdminNavbar />



            {/* // management control area */}
            <div className=''>
                <div className='w-screen'>
                    {/* side panel */}
                    <SideNav />



                    {/* main panel */}
                    <div className="pt-8 ml-[320px] h-full">
                        <Link href={`./`} className='flex text-lg items-center pb-6 gap-1'>{arrowleft()}Add product</Link>

                        <div className='flex xl:gap-4 2xl:gap-[73px]'>
                            {/* the card sections where the images will be previewed and uploaded */}
                            <div>
                                <p>Image</p>

                                <div className='pt-2'>
                                    <p className='flex items-center gap-1 text-sm text-text_weak'>{info()}The first image will be your cover image (Note: you can move or drag image)</p>


                                    {/*  */}
                                    <div className="w-full h-11 flex justify-start items-center border-l-4 rounded-l-xl bg-fill border-error_1 px-2 gap-2">{alertIcn()}Image upload failed. <Link href={`/`} className="underline text-text_strong font-[400] text-sm">Try again</Link></div>

                                    <div className="w-full h-11 flex justify-start items-center border-l-4 rounded-l-xl bg-fill border-error_1 px-2 gap-2">{success()}Image uploaded</div>
                                    {/* the images panel */}
                                    <div className='flex gap-6 pt-2'>
                                        {/* side images */}
                                        <div className='flex flex-col gap-4'>
                                            <div className="w-[100px] flex justify-center items-center h-[120px] border border-text_weak border-dashed">
                                                {/* {plus()} */}
                                            </div>
                                            <div className="w-[100px] flex justify-center items-center h-[120px] border border-text_weak border-dashed">
                                                {/* {plus()} */}
                                            </div>

                                            <div className="w-[100px] relative flex justify-center items-center h-[120px] border border-text_weak border-dashed">
                                                {/* {plus()} */}
                                                <span className="absolute right-[-12px] top-[-12px]">{removeBin()}</span>
                                            </div>

                                            <div className="w-[100px] flex justify-center items-center h-[120px] border border-error_1 border-dashed">
                                                {imageadd()}
                                            </div>
                                        </div>

                                        {/* the main image */}
                                        <div>
                                            <div className='w-[492px] h-[600px] border border-dashed flex flex-col justify-center items-center text-center border-text_weak'>

                                                <span>{imageadd()}</span>
                                                <p className='w-[240px] leading-[24px] text-text_weak text-sm'><span className='underline font-[400] text-text_strong'>Click to upload </span>or drag and drop PNG or JPG(max. 500x600px)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* product options */}
                            <section className='w-[323px] h-[972px]'>
                                {/* name */}
                                <div className='pb-4 w-full'>
                                    <label htmlFor="name">
                                        <p className='pb-2 text-sm'>Name</p>
                                        <input type="text" name="name" id="name" autoComplete="on" className='border w-full border-stroke_strong outline-none focus:border-stroke_strong placeholder:text-text_weak rounded-md h-[40px] py-2 pl-4' />
                                    </label>
                                </div>

                                {/* regular price */}
                                <div className="pb-4 w-full relative">
                                    <label htmlFor="price">
                                        <p className='pb-2 text-sm'>Regular price</p>
                                        <input type="text" name="price" id="price" className='border  w-full border-stroke_strong outline-none focus:border-stroke_strong placeholder:text-text_weak rounded-md h-[40px] py-2 pl-24' />
                                        {/* price list */}
                                        <div className="absolute top-[38px] left-4">
                                            <p className="flex items-center text-sm text-text_weak gap-1">NGN ₦ <span>{arrowDown()}</span></p>
                                        </div>


                                        {/* dropdown */}
                                        <div className='bg-white border-stroke_strong w-40 p-1 rounded-lg shadow-custom'>
                                            <div className='bg-stroke_weak font-[400] text-base py-[10px] px-6'>NGN ₦ </div>
                                            <div className='font-[400] text-base py-[10px] px-6'>USA $</div>
                                        </div>
                                    </label>
                                </div>

                                {/* discount price */}
                                <div className="pb-4 w-full relative">
                                    <label htmlFor="discount-price">
                                        <p className='pb-2 text-sm'>Discount price <span className='text-sm  text-text_weak'>(Optional)</span></p>
                                        <input type="text" name="discount-price" id="discount-price" className='border w-full border-stroke_strong outline-none focus:border-stroke_strong placeholder:text-text_weak rounded-md h-[40px] py-2 pl-24' />
                                        {/* price list */}
                                        <div className="absolute top-[38px] left-4">
                                            <p className="flex items-center text-sm text-text_weak gap-1">NGN ₦ <span>{arrowDown()}</span></p>
                                        </div>


                                        {/* dropdown */}
                                        <div className='bg-white border-stroke_strong w-40 p-1 rounded-lg shadow-custom'>
                                            <div className='bg-stroke_weak font-[400] text-base py-[10px] px-6'>NGN ₦ </div>
                                            <div className='font-[400] text-base py-[10px] px-6'>USA $</div>
                                        </div>
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
                                        <p className="text-sm pb-2">category</p>

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
