import { arrowleft, info } from '@/app/global/svg';
import { Lora } from 'next/font/google';
// import Image from 'next/image';
import React, { useState } from 'react';

interface EditContentProps {
    onClick: () => void;
}


const lora = Lora({
    variable: "--font-lora",
    subsets: ["latin"],
});


// color wheel
const colors = ["#E9C46A", "#FEEDC2", "#DFDACF", "#F6F4F4", "#FFE1E1", "#E1FFF6"]


const PromoteContent: React.FC<EditContentProps> = ({ onClick }) => {
    const [selectedColor, setSelectedColor] = useState<string>();

    function handleColorChange(color: string): void {
        setSelectedColor(color);
    }

    return (
        <>
            <div>
                <h3 onClick={onClick} className="font-[500] flex cursor-pointer items-center gap-1 text-[18px] leading-[28px] text-black"><span>{arrowleft()}</span>Edit content</h3>

                <section className="mt-[48px]">
                    <p className="text-base font-[400] text-black pb-1">Content</p>
                    <p className="flex items-center gap-2 text-[14px] text-text_weak"><span>{info()}</span>Edit content below and check preview above across all device</p>

                    {/* image and bg filter options */}
                    <section className="flex mt-2 pt-2 gap-8">
                        <div>
                            <p className="text-[14px] text-text_strong font-[400]">Image</p>
                            <div className="w-[420px] h-[320px] border-dotted border stroke-stroke_weak"
                                style={{ backgroundColor: selectedColor }} >

                                {/* <Image
                                    width={420}
                                    height={137}
                                    src="https://res.cloudinary.com/dymkfk58k/image/upload/v1740665611/image_copy_rziblo.png"
                                    alt="lady2"
                                /> */}
                            </div>
                        </div>

                        {/* Color Selector */}
                        <div className="">
                            <p className="text-sm leading-[22px] pb-2 font-400">Background color</p>
                            <div className="flex gap-2">
                                {/* color changer */}
                                {colors.map((color) => (
                                    <div
                                        key={color}
                                        className="w-[32px] h-[32px] p-1 rounded-full border-white  focus:border-black cursor-pointer border-2"
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorChange(color)}
                                    />
                                ))}
                            </div>

                            {/* hero adjust content */}
                            <div className="pb-4">
                                <label htmlFor="header-text">
                                    <p className="text-sm leading-[22px] font-400 text-text_strong pb-2">Header</p>
                                    <input type="text" className="w-[323px] h-[40px] border border-1 stroke-stroke_strong outline-none focus:border-black rounded-lg py-[9px] px-4" id="header-text" />
                                </label>
                            </div>

                            {/* description */}
                            <div className="pb-4">
                                <label htmlFor="description-text">
                                    <p className="text-sm leading-[22px] font-400 text-text_strong pb-2">Description</p>
                                    <input type="text" className="w-[323px] h-[40px] border border-1 stroke-stroke_strong outline-none focus:border-black rounded-lg py-[9px] px-4" id="description-text" />
                                </label>
                            </div>

                            {/* Button */}
                            <div className="pb-4">
                                <label htmlFor="button-text">
                                    <p className="text-sm leading-[22px] font-400 text-text_strong pb-2">Button</p>
                                    <input type="text" className="w-[323px] h-[40px] border border-1 stroke-stroke_strong outline-none focus:border-black rounded-lg py-[9px] px-4" id="button-text" />
                                </label>
                            </div>

                            {/* Button link */}
                            <div>

                                <label htmlFor="button-link-text">
                                    <p className="text-sm leading-[22px] font-400 text-text_strong pb-2">Button link</p>
                                    <input type="text" className="w-[323px] h-[40px] border border-1 stroke-stroke_strong outline-none focus:border-black rounded-lg py-[9px] px-4" id="button-link-text" />
                                </label>
                            </div>
                        </div>

                    </section>
                </section>
            </div>

            <div>
                <section className="mt-[48px]">
                    <p className="text-base font-[400] text-black pb-1">Content</p>
                    <p className="flex items-center gap-2 text-[14px] text-text_weak"><span>{info()}</span>Edit content below and check preview above across all device</p>

                    {/* preview buttons */}
                    <div className="border-b mt-4 border-b-stroke_weak h-[39px] w-[219px] flex items-center">
                        <button className="p-3">Desktop</button>
                        <button className="p-3">Tablet</button>
                        <button className="p-3">Mobile</button>
                    </div>

                    {/* preview screens */}
                    <div className=" w-[790px] 2xl:w-[980px] mb-[48px] mt-[16px] bg-[#DFDACF]"
                        style={{ backgroundColor: selectedColor }}>
                        <div className="py-[64px] pl-[50.91px] selection:no-underline">
                            <h1 className={`${lora.className} text-[32px] font-[400] leading-[42px] w-[361.33px] pb-[12px]]`}>Move around with your essentials needs</h1>
                            <p className="text-[10px] text-text_weak leading-[14px]">Inspired by the African women’s tote bag for anyone ready to showcase black</p>

                            <p className="mt-[20.26px] py-[5.73px] w-[78.55px] h-[25.45px] text-[10px] selection:no-underline cursor-pointer px-[15.27px] bg-black text-white rounded-full">Shop now</p>
                        </div>
                    </div>


                    <div className="flex gap-4 items-center mb-[14px]">
                        <div onClick={onClick} className="w-[153.3px] cursor-pointer selection:no-underline h-[40px] rounded-full py-[9px] px-[51px] border-1 border text-white bg-black flex justify-center items-center">Update</div>
                        <div onClick={onClick} className="w-[153.3px] cursor-pointer selection:no-underline h-[40px] rounded-full py-[9px] px-[51px] border-1 border border-stroke_weak flex justify-center items-center">Cancel</div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default PromoteContent