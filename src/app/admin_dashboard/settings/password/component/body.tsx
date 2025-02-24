import React, { useState } from 'react'
import { success, eyeOpen, eyeClose } from "@/app/global/svg";


const Body = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);


    return (
        <div className=" flex flex-col gap-8 h-[82px] ml-[280px] mt-[150px]">
            <div className="flex flex-col gap-2 w-fit font-normal text-nowrap">
                <p className="text-text_strong text-[18px] leading-[28px]">Profile</p>
                <p className="text-text_weak text-base">Update your profile details</p>
            </div>


            <div className="flex flex-col justify-start items-start gap-8 max-w-[800px] w-full">
                {/* inputs */}

                <div className="flex flex-col items-start gap-4 w-full ">
                    {/* passwords*/}
                    <div className="flex gap-8 justify-start items-center w-full">
                        {/* old password*/}
                        <div className="flex flex-col gap-2 w-full max-w-[323px]">
                            <p className="text-sm leading-[22px] text-text_strong">Old Password</p>
                            <div className=" w-full relative">
                                <input
                                    className="outline-none border rounded-lg h-10 px-4  w-full"
                                    placeholder=""
                                    type={showPassword ? "text" : "password"}
                                />
                                {/* eyeopen and close */}
                                <span
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                    className="absolute right-4 top-3 bg-background cursor-pointer  flex items-center "
                                >
                                    <i>{showPassword ? eyeClose() : eyeOpen()}</i>
                                </span>
                            </div>

                        </div>

                        {/* New Password */}
                        <div className="flex flex-col gap-2 w-full max-w-[323px]">
                            <p className="text-sm leading-[22px] text-text_strong">New Password</p>
                            <div className="w-full relative">
                                <input
                                    className="outline-none border rounded-lg h-10 px-4  w-full"
                                    placeholder=""
                                    type={showPassword2 ? "text" : "password"}
                                />
                                 {/* eyeopen and close */}
                                 <span
                                    onClick={() => {
                                        setShowPassword2(!showPassword2);
                                    }}
                                    className="absolute right-4 top-3 bg-background cursor-pointer  flex items-center "
                                >
                                    <i>{showPassword2 ? eyeClose() : eyeOpen()}</i>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Confirm new password */}
                    <div className="flex gap-8 justify-start items-center w-full">
                        {/* confirm new password*/}
                        <div className="flex flex-col gap-2 w-full max-w-[323px]">
                            <p className="text-sm leading-[22px] text-text_strong">Confirm new password</p>
                            <div className="w-full relative">
                                <input
                                    className="outline-none border rounded-lg h-10 px-4 w-full"
                                    placeholder=""
                                    type={showPassword3 ? "text" : "password"}
                                />
                                 {/* eyeopen and close */}
                                 <span
                                    onClick={() => {
                                        setShowPassword3(!showPassword3);
                                    }}
                                    className="absolute right-4 top-3 bg-background cursor-pointer  flex items-center "
                                >
                                    <i>{showPassword3 ? eyeClose() : eyeOpen()}</i>
                                </span>
                            </div>
                        </div>
                    </div>


                    {/* info */}
                    {
                        <div className="w-full h-11 flex justify-start items-center border-l-4 rounded-l-xl bg-fill border-error_1 px-2 gap-2">
                            <i>{success()}</i>
                            <p>
                                Profile details updated
                            </p>
                        </div>
                    }
                </div>
                {/* button */}

                <div className="flex gap-8 justify-start items-center w-full text-base font-medium  mt-2 mb-8">
                    <button className="max-w-[153px] w-full text-background bg-text_strong rounded-full px-6 h-10 flex justify-center items-center">
                        Update
                    </button>
                    <button className="max-w-[153px] w-full text-text_strong border bg-background rounded-full px-6 h-10 flex justify-center items-center">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Body