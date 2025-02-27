'use client'
import { editIcon, info } from '@/app/global/svg';
import { Lora } from 'next/font/google';
import React, { useState } from 'react'


const lora = Lora({
    variable: "--font-lora",
    subsets: ["latin"],
});


interface ContentProps {
    onReturn: () => void;   // Handler to return to original content
    onPromote: () => void;  // Handler to go to PromoteContent
}


const Content: React.FC<ContentProps> = ({ onReturn, onPromote }) => {
    const [hero, setHero] = useState(false);
    const [promotion, setPromotion] = useState(false);


    const addHero = () => {
        setHero((prev) => !prev)
    }

    const addPromotion = () => {
        setPromotion((prev) => !prev)
    }



    return (
        <div className="w-auto">
            <h3 className="text-[18px] leading-[28px] pb-1 text-text_black font-[500]">Content</h3>
            <p className="text-base text-text_weak font-[400]">Manage web banners</p>

            <section className="mt-12">
                {/* hero section */}
                <div>
                    <p className="text-base leading-[22px] pb-1 text-text_black font-[500]">Hero section banner</p>

                    {/* edit row */}
                    <div className="flex justify-between pb-4 items-center">
                        <p className="text-base text-text_weak font-[400] flex items-center gap-2"><span>{info()}</span>Keep your hero section fresh and aligned with your latest campaigns</p>

                        <p onClick={addHero} className="flex items-center selection:bg-none gap-[1px] cursor-pointer"><span>{editIcon()}</span>Edit</p>
                    </div>

                    <div className="h-[280px] relative bg-brand_yellow">
                        <div className="py-[64px] pl-[50.91px] selection:no-underline">
                            <h1 className={`${lora.className} text-[38.18px] font-[400] leading-[42px] w-[309px] pb-[12px]]`}>Shine brighter with Africa wears</h1>
                            <p className="text-[10px] text-text_weak leading-[14px]">The light you need to showcase you are made of black</p>

                            <p className="mt-[20.26px] py-[5.73px] w-[78.55px] h-[25.45px] text-[10px] selection:no-underline cursor-pointer px-[15.27px] bg-black text-white rounded-full">Shop now</p>

                            {/* edit overlay display */}
                            {
                                <div className={`absolute left-0 w-full h-full top-0 bg-black/70 flex items-center justify-center  ${hero ? "block" : "hidden"}`}>
                                    <div>
                                        <p onClick={onReturn} className=" h-[40px] bg-white rounded-full flex justify-center items-center py-[10px] px-[24px] gap-2 cursor-pointer selection:bg-none hover:bg-white/90 ease-in-out text-text_strong text-sm leading-[19.07px]">{editIcon()}Edit content</p>
                                    </div>
                                </div>
                            }
                        </div>
                        <div></div>
                    </div>
                </div>


                {/* promotion section */}
                <div className="mt-[48px] mb-[110px]">
                    <p className="text-base leading-[22px] pb-1 text-text_black font-[500]">Promotion section banner</p>

                    {/* edit row */}
                    <div className="flex justify-between pb-4 items-center">
                        <p className="text-base text-text_weak font-[400] flex items-center gap-2"><span>{info()}</span>Keep your promotion section fresh and aligned with your promotions</p>

                        <p onClick={addPromotion} className="flex items-center selection:bg-none gap-[1px] cursor-pointer"><span>{editIcon()}</span>Edit</p>
                    </div>

                    <div className="h-[280px] relative bg-promotion_bg">
                        <div className="py-[64px] pl-[50.91px] selection:no-underline">
                            <h1 className={`${lora.className} text-[32px] font-[400] leading-[42px] w-[361.33px] pb-[12px]]`}>Move around with your essentials needs</h1>
                            <p className="text-[10px] text-text_weak leading-[14px]">Inspired by the African women’s tote bag for anyone ready to showcase black</p>

                            <p className="mt-[20.26px] py-[5.73px] w-[78.55px] h-[25.45px] text-[10px] selection:no-underline cursor-pointer px-[15.27px] bg-black text-white rounded-full">Shop now</p>

                            {/* edit overlay display */}
                            {
                                <div className={`absolute left-0 w-full h-full top-0 bg-black/70 flex items-center justify-center  ${promotion ? "block" : "hidden"}`}>
                                    <div>
                                        <p onClick={onPromote} className=" h-[40px] bg-white rounded-full flex justify-center items-center py-[10px] px-[24px] gap-2 cursor-pointer selection:bg-none hover:bg-white/90 ease-in-out text-text_strong text-sm leading-[19.07px]">{editIcon()}Edit content</p>
                                    </div>
                                </div>
                            }
                        </div>
                        <div></div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Content