import { arrowDown, success, uploadIcon } from "@/app/global/svg";
import { useState } from "react";



const Body = () => {
    const [country, setCountry] = useState(false);


    const changeCountry = () => {
        setCountry((prev) => !prev)
    }
    return (
        <div className=" flex flex-col gap-8 h-[82px] px-4 md:ml-[280px] mt-[150px]">
            <div className="flex flex-col gap-2 w-fit font-normal text-nowrap">
                <p className="text-text_strong text-[18px] leading-[28px]">Profile</p>
                <p className="text-text_weak text-base">Update your profile details</p>
            </div>

            {/* input */}

            <div className="flex flex-col justify-start items-start gap-8 max-w-[800px] w-full">

                {/* image upload */}
                <div className="flex flex-col gap-4 justify-center items-center w-full">
                    <div className="w-[64px] h-[64px] rounded-full flex justify-center items-center bg-[#E63946]">
                        <p className="text-[38px] font-[600] text-white">F</p></div>
                    <div className="flex gap-2 pr-6 pl-5 h-8 justify-center items-center border rounded-full font-medium text-sm">
                        <i>{uploadIcon()}</i>
                        <p>Upload image</p>
                    </div>
                </div>

                {/* inputs */}

                <div className="flex flex-col items-start gap-4 w-full ">
                    {/* fullName and Email */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-8 justify-start items-center w-full">
                        {/* fullName */}
                        <div className="flex flex-col gap-2 w-full max-w-[323px]">
                            <p className="text-sm leading-[22px] text-text_strong">Full name</p>
                            <div className=" w-full">
                                <input
                                    className="outline-none border rounded-lg h-10 px-4  w-full"
                                    placeholder=""
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2 w-full max-w-[323px]">
                            <p className="text-sm leading-[22px] text-text_strong">Email</p>
                            <div className=" w-full">
                                <input
                                    className="outline-none border rounded-lg h-10 px-4  w-full"
                                    placeholder=""
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>

                    {/* phone and Country */}
                    <div className="flex flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-8 justify-start items-center w-full">
                        {/* Phone */}
                        <div className="flex flex-col gap-2 w-full max-w-[323px]">
                            <p className="text-sm leading-[22px] text-text_strong">Phone number</p>
                            <div className=" w-full">
                                <input
                                    className="outline-none border rounded-lg h-10 px-4  w-full"
                                    placeholder=""
                                    type="text"
                                />
                            </div>
                        </div>


                        {/* Country */}
                        <div className="flex flex-col gap-2 w-full max-w-[323px] relative">
                            <p className="text-sm leading-[22px] text-text_strong">Country</p>
                            <div className=" w-full" onClick={changeCountry}>
                                <div className="outline-none border rounded-lg h-10 px-4  w-full flex items-center">
                                    Nigeria
                                </div>
                                <span className="absolute top-[42px] right-4">
                                    {arrowDown()}
                                </span>
                                {
                                    <div className={`py-4 border w-full rounded-xl gap-2 flex flex-col absolute ${country ? "block" : "hidden"}`}>
                                        <div className="h-9 p-4 bg-fill flex items-center">
                                            Nigeria
                                        </div>
                                        <div className="h-9 p-4 bg-fill flex items-center">USA</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    {/* State and Address */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-8 justify-start items-center w-full">
                        {/* State */}
                        <div className="flex flex-col gap-2 w-full max-w-[323px]">
                            <p className="text-sm leading-[22px] text-text_strong">State</p>
                            <div className=" w-full">
                                <input
                                    className="outline-none border rounded-lg h-10 px-4  w-full"
                                    placeholder=""
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-2 w-full max-w-[323px]">
                            <p className="text-sm leading-[22px] text-text_strong">Address</p>
                            <div className=" w-full">
                                <input
                                    className="outline-none border rounded-lg h-10 px-4  w-full"
                                    placeholder=""
                                    type="text"
                                />
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

export default Body;