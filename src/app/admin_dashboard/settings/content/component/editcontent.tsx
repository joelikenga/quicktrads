import { arrowleft, info } from '@/app/global/svg';
import { Lora } from 'next/font/google';
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


const EditContent: React.FC<EditContentProps> = ({ onClick }) => {
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
                                style={{ backgroundColor: selectedColor }} />
                        </div>

                        {/* Color Selector */}
                        <div className="">
                            <p className="text-sm leading-[22px] pb-2 font-400">Background color</p>
                            <div className="flex gap-2">
                                {/* color changer */}
                                {colors.map((color) => (
                                    <div
                                        key={color}
                                        className="w-[32px] h-[32px] p-1 rounded-full border-white cursor-pointer border-2"
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
                    <div className=" w-[790px] 2xl:w-[980px] mb-[48px] mt-[16px] bg-brand_yellow"
                    style={{ backgroundColor: selectedColor }}>
                        <div className="py-[76.67px] pl-[61.34px]">
                            <h1 className={`${lora.className} w-[540px] font-[400] pb-[12px] text-[46px]`}>Shine brighter with Africa wears</h1>

                            <p className="text-[12.27px] leading-[16.87px] text-text_weak">The light you need to showcase you are made of black</p>

                            <div className="w-[94px] h-[30.67px] mt-[24px] flex justify items-center text-white bg-black py-[6px] px-[18px] rounded-full cursor-pointer selection:no-underline">
                                <p className="text-[12.27px]">Shop now</p>
                                </div>
                        </div>

                        <div></div>
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

export default EditContent