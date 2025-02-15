'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { eyeOpen, eyeClose, logo, redInfoSmall } from '@/app/global/svg'


export default function body() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    return (
        <>
            <>
                <section className="w-full sm:w-[483px] flex flex-col justify-between relative h-[100svh] mx-auto">
                    <form action="">

                        <div className="pt-20 pb-6 w-max mx-auto">
                            <Link href={`/`}>{logo()}</Link>
                        </div>

                        <div className="pb-6">
                            {/* login with font lora */}
                            <h1 className="text-[22px] pb-2 text-center">Reset Password</h1>
                            <p className="text-text_weak text-sm text-center">Please reset password with details below</p>
                        </div>



                        {/* password */}
                        <div className=" mx-2 sm:mx-[80px] relative">
                            <label htmlFor="">
                                <p className="pb-2 text-sm text-text_strong">Password</p>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="border outline-none focus:border-black border-stroke_strong py-2 px-4 w-full sm:w-[323px] h-[40px] focus:border-stroke-black rounded-lg" />
                            </label>

                            <div
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                                className="absolute top-[2.4rem] cursor-pointer right-3">
                                {showPassword ? eyeClose() : eyeOpen()}
                            </div>
                        </div>

                        {/* confirm password */}
                        <div className=" mx-2 sm:mx-[80px] pt-4 pb-8 relative">
                            <label htmlFor="">
                                <p className="pb-2 text-sm text-text_strong">Confirm password</p>
                                <input
                                    type={showPassword1 ? "text" : "password"}

                                    className="border outline-none focus:border-black border-stroke_strong py-2 px-4 w-full sm:w-[323px] h-[40px] focus:border-stroke-black rounded-lg" />
                            </label>

                            <div
                                onClick={() => {
                                    setShowPassword1(!showPassword1);
                                }}
                                className="absolute top-[3.4rem] cursor-pointer right-3">
                                {showPassword1 ? eyeClose() : eyeOpen()}
                            </div>
                        </div>

                        {/* proceed */}
                        <div className="mx-2 sm:mx-auto w-full sm:w-max">
                            <input type="submit" className='cursor-pointer w-full lg:w-[323px] h-[40px] py-1 px-1 sm:px-3 lg:px-6 bg-text_strong text-white rounded-full' value="Proceed" />
                        </div>
                    </form>

                    {/* remember password */}
                    <p className="text-text_weak pt-8 text-[12px] w-max mx-auto text-center pb-[54px]">Remember password? <Link href={`/`} className="underline text-black">Login</Link></p>
                    <div>

                        {/* incorrect password notification banner */}
                        <div className="h-11 flex justify-start items-center border-l-4 rounded-l-xl w-max mx-auto bg-fill border-error_1 px-2 gap-1 sm:gap-2">
                            <i>{redInfoSmall()}</i>
                            <p className="text-sm">
                                Incorrect password combination
                            </p>
                        </div>
                        <p className=" text-text_weak text-[12px] mx-auto w-max pt-[22px] pb-5 text-center">©2025 Quicktrads All rights reserved.</p>
                    </div>
                </section>


            </>
        </>
    )
}
