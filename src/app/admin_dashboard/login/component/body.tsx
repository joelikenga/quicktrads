'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { eyeOpen, eyeClose, logo, redInfoSmall } from '../../../global/svg'

<<<<<<< HEAD
export const Body = () => {
=======
 const Body = () => {
>>>>>>> a2fca0cf3d1ff11f4a27ff7094c009228636037e
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <section className="w-full sm:w-[483px] flex flex-col justify-between relative h-[100svh] mx-auto">
                <form action="">

                    <div className="pt-20 pb-6 w-max mx-auto">
                        <Link href={`/`}>{logo()}</Link>
                    </div>

                    <div className="pb-6">
                        {/* login with font lora */}
                        <h1 className="text-[22px] pb-2 text-center">Login</h1>
                        <p className="text-text_weak text-sm text-center">Enter your login details now</p>
                    </div>


                    {/* email */}
                    <div className="pb-4 mx-2 sm:mx-[80px]">
                        <label htmlFor="">
                            <p className="pb-2 text-sm text-text_strong">Email</p>
                            <input type="text" className="border focus:border-black outline-none border-stroke_strong py-2 px-4 w-full sm:w-[323px] h-[40px] focus:border-stroke-black rounded-lg" />
                        </label>
                    </div>


                    {/* password */}
                    <div className=" mx-2 sm:mx-[80px] relative">
                        <label htmlFor="">
                            <p className="pb-2 text-sm text-text_strong">Password</p>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="border focus:border-black outline-none cursor-pointer border-stroke_strong py-2 px-4 w-full sm:w-[323px] h-[40px] focus:border-stroke-black rounded-lg" />
                        </label>

                        <div
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                            className="absolute top-[2.4rem] right-3">
                            {showPassword ? eyeClose() : eyeOpen()}
                        </div>
                    </div>

                    <div className="pb-8 mx-4">
                        <Link href={`./forget-password`} className="pt-2 underline w-full  sm:pl-[80px] text-sm sm:w-[323px] text-text_strong pb-4 sm:pb-8">Forget password?</Link>
                    </div>

                    <div className="mx-2 sm:mx-auto w-full sm:w-max">
                        <input type="submit" className='cursor-pointer w-full lg:w-[323px] h-[40px] py-1 px-1 sm:px-3 lg:px-6 bg-text_strong text-white rounded-full' value="Login" />
                    </div>
                </form>
                <div>

                    {/* incorrect password notification banner */}
                    <div className="h-11 flex justify-start items-center border-l-4 rounded-l-xl w-max mx-auto bg-fill border-error_1 px-2 gap-1 sm:gap-2">
                        <i>{redInfoSmall()}</i>
                        <p className="text-sm">
                            Wrong code please confirm and re-enter
                        </p>
                    </div>
                    <p className=" text-text_weak text-[12px] mx-auto w-max pt-[22px] pb-5 text-center">©2025 Quicktrads All rights reserved.</p>
                </div>
            </section>

        </>
    )
}
export default Body