'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { logo, redInfoSmall, success } from '../../global/svg'


function Page() {
    return (
        <>
            <section className="w-full sm:w-[483px] flex flex-col justify-between relative h-[100svh] mx-auto">
                <form action="">

{/* logo */}
                    <div className="pt-20 pb-6 w-max mx-auto">
                        <Link href={`/`}>{logo()}</Link>
                    </div>

                    <div className="pb-6">
                        {/* login with font lora */}
                        <h1 className="text-[22px] pb-2 text-center">Verify Email</h1>
                        <p className="text-text_weak text-sm font-[400] w-[214px] mx-auto text-center">Please enter the code sent to “Sample@gmail.com”</p>
                    </div>


                    {/* password pin boxes */}


                    {/* otp design */}
                    <div className="flex items-center justify-center pb-4 gap-4">
                        <div className="w-10 h-10 rounded-lg border-error_1 border flex justify-center items-center">0</div>
                        <div className="w-10 h-10 rounded-lg border-error_1 border flex justify-center items-center">0</div>
                        <div className="w-10 h-10 rounded-lg border-error_1 border flex justify-center items-center">0</div>
                        <div className="w-10 h-10 rounded-lg border-error_1 border flex justify-center items-center">0</div>
                        <div className="w-10 h-10 rounded-lg border-error_1 border flex justify-center items-center">0</div>
                    </div>
                    {/* didn't get code error */}
                    <p className="text-[12px] flex items-center gap-1 pb-[30px] mx-auto text-center w-max text-text_weak">{redInfoSmall()} Didn't get the code? <span className="underline cursor-pointer text-black">Resend</span></p>

                    {/* didn't get the code - success */}
                    <p className="text-[12px] flex items-center gap-1 pb-[30px] mx-auto text-center w-max text-text_weak">{success()} Didn't get the code? <span className="text-black">05:34</span></p>


                    {/* proceed */}
                    <div className="mx-2 sm:mx-auto sm:w-max">
                        <div className="flex w-full justify-center gap-4 ">
                            <input type="submit" className='cursor-pointer w-full lg:w-[323px] h-[40px] py-1 px-1 sm:px-3 lg:px-6 bg-text_strong text-white rounded-full' value="Proceed" />
                        </div>

                        {/* remember password */}
                        <p className="text-sm text-text_weak pt-[32px] text-center">Remember password? <Link href={`./login`} className="underline text-black">Login</Link></p>
                    </div>
                </form>
                <div>

                    {/* incorrect password notification banner */}
                    <div className="h-11 flex justify-start items-center border-l-4 rounded-l-xl w-max mx-auto bg-fill border-error_1 px-2 gap-1 sm:gap-2">
                        <i>{redInfoSmall()}</i>
                        <p className="text-sm">
                            No existing account with this email
                        </p>
                    </div>

                    {/* copyright */}
                    <p className=" text-text_weak text-[12px] mx-auto w-max pt-[22px] pb-5 text-center">©2025 Quicktrads All rights reserved.</p>
                </div>
            </section>


        </>
    )
}

export default Page
