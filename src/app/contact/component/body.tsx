import { Footer } from '@/app/Component/footer'
import { Navbar } from '@/app/global/navbar'
import Image from 'next/image'
import React from 'react'

export const Body = () => {
    return (
        <>
            <div className="w-full">
                <div className="mx-auto">

                    <Navbar />


                    <section className="mt-[152px] px-2 lg:px-10 flex md:gap-12 items-center md:flex-row">
                        {/* lhs */}
                        <div className="px-2 w-full md:w-[432px]">
                            <div>
                                <p className="text-text_gray text-sm pb-2">Contact us</p>

                                <h1 className="text-[32px] leading-[38px] font-[400] w-full sm:w-[376px] pb-8">We’re here to help with anything you need</h1>
                            </div>

                            <form action="">
                                <div className="pb-4 w-full">
                                    {/* fullname */}
                                    <div>
                                        <label htmlFor="fullname">
                                            <p className="text-sm text-text_strong pb-2">Full name</p>
                                            <input type="text" id="" className="w-full border outline-none foucs:border-text_strong px-[12px] border-[#d6d6d6] h-10 rounded-[8px]" />
                                        </label>
                                    </div>
                                </div>


                                <div className="pb-4 w-full">
                                    {/* email */}
                                    <label htmlFor="email">
                                        <p className="text-sm text-text_strong pb-2">Email</p>
                                        <input type="email" id="" className="w-full border outline-none foucs:border-text_strong px-[12px] border-[#d6d6d6] h-10 rounded-[8px]" />
                                    </label>
                                </div>

                                <div className="pb-4 w-full">
                                    {/* subject */}
                                    <div>
                                        <label htmlFor="subject">
                                            <p className="text-sm text-text_strong pb-2">Subject</p>
                                            <input type="text" id="" className="w-full border outline-none foucs:border- px-[12px] border-[#d6d6d6] h-10 rounded-[8px]" />
                                        </label>
                                    </div>
                                </div>

                                <div className="pb-8 w-full">
                                    {/* message */}
                                    <div>
                                        <label htmlFor="subject">
                                            <p className="text-sm text-text_strong pb-2">Message</p>
                                            <textarea id="" className="w-full h-[88px] border outline-none foucs:border-text_strong px-[12px] border-[#d6d6d6] rounded-[8px]" />
                                        </label>
                                    </div>
                                </div>

                                <input type="submit" className="mt-8 h-10 w-full md:w-[432px] text-white bg-text_strong rounded-full" value="Submit" />
                            </form>
                        </div>

                        {/* rhs */}
                        <div className='hidden md:block md:w-[300px] lg:w-[800px]'>
                            <Image
                                src={"https://res.cloudinary.com/dymkfk58k/image/upload/v1739280911/contactimg_qzkwfb.png"}
                                width={800}
                                height={688}
                                className="h-[688px] sticky top-0 w-full object-cover lg:object-cover bg-center"
                                alt="journey image"
                            />
                        </div>
                    </section>

                    <Footer />
                </div>
            </div>

        </>
    )
}
