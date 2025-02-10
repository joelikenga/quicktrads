import React from 'react'
import { Navbar } from '../global/navbar'
import { Footer } from '../Component/footer'
import Image from 'next/image'
function Page() {

    // mission and vision images
    const vision_mission = [
        {
            image: "https://res.cloudinary.com/dymkfk58k/image/upload/v1739193954/mission_pl2sqy.png",
            title: "Mission",
            body: "To celebrate and preserve Africa’s textile heritage through high-quality, accessible fashion",
            alt: "mission1"
        },
        {
            image: "https://res.cloudinary.com/dymkfk58k/image/upload/v1739194407/mission2_asfkra.png",
            title: "Vision",
            body: "To be a global leader in African-inspired fashion, connecting cultures and empowering artisans",
            alt: "mission2"
        }
    ]

    // what we offer
    const offers = [
        {
            image: "https://res.cloudinary.com/dymkfk58k/image/upload/v1739196875/mission1_tbft5s.png",
            title: "Authentic African garments",
            body: "From traditional to modern styles, curating timeless garments to celebrate Africa’s culture",
            alt: "mission1"
        },
        {
            image: "https://res.cloudinary.com/dymkfk58k/image/upload/v1739197015/male_lc7oqw.png",
            title: "Global reach",
            body: "Bringing Africa’s vibrant fashion culture to the world, one exquisite piece at a time",
            alt: "mission2"
        },
        {
            image: "https://res.cloudinary.com/dymkfk58k/image/upload/v1739197281/offer3_coos6r.png",
            title: "Adire craftsmanship",
            body: "Explore the beauty of adire, made with intricate techniques passed down through generations",
            alt: "mission2"
        }
    ]

    return (
        <>
            <Navbar />

            {/* hero  */}
            <section className="z-[10000000] mt-[152px]">
                <h3 className="text-center text-text_weak text-lg pb-2">About Us</h3>
                <h1 className="text-[32px] leading-[38px] mx-4 w-[280px] text-center sm:mx-auto sm:w-[524px]">Celebrating African heritage through timeless fashion</h1>

                <div className="mx-2 px-2 md:px-10 pt-8">
                    <Image
                        priority
                        height={600}
                        width={1280}
                        src={"https://res.cloudinary.com/dymkfk58k/image/upload/v1739189874/hero_hvzlma.png"}
                        className="h-[600px] w-full object-cover md:object-contain bg-center"
                        alt="hero image"
                    />
                </div>
            </section>

            {/* our journey */}
            <section className="flex w-auto lg:w-max flex-col lg:mx-auto md:flex-row md:justify-between md:gap-6 xl:gap-12 pt-[80px]">
                <div className="w-full px-2 md:px-10 md:w-[400px] lg:w-[800px]">
                    <Image
                        priority
                        height={500}
                        width={800}
                        src={"https://res.cloudinary.com/dymkfk58k/image/upload/v1739190791/journey_pwwiqc.png"}
                        className="h-[500px] w-full object-cover lg:object-cover bg-center"
                        alt="journey image"
                    />
                </div>


                <div className="w-full md:w-[432px] md:flex md:items-center md:justify-left">
                    <div className="h-[364px] px-2 lg:pr-10">
                        <h3 className="pb-2 text-text_weak py-3 text-sm">Our journey</h3>
                        <p className="text-[22px] text-text_strong leading-[28px]">
                            At Quicktrads, we’re proud to bring Africa’s rich textile heritage to life. From handcrafted adire to timeless garments, we cater to both men and women, delivering authentic African fashion to local and international audiences
                        </p>
                    </div>
                </div>
            </section>

            {/* mission and vision */}
            <section className="pt-20 lg:w-max mx-auto">
                <h2 className="text-2xl text-text_strong px-2 pb-6 lg:px-10">Mission & vision</h2>
                <div className="flex flex-col md:flex-row gap-7">
                    {
                        vision_mission.map((vm, key) => {
                            return (
                                <div className="">
                                    <div>
                                        <Image
                                            src={vm.image}
                                            height={400}
                                            width={628}
                                            id={vm.key}
                                            className="w-full px-2 md:px-4 object-cover lg:px-10 md:w-[628px]"
                                            alt={vm.alt}
                                        />
                                    </div>

                                    <div className="px-2 lg:px-10 md:w-[314px] lg:w-[628px]">
                                        <h3 className="text-base text-text_weak pt-4 pb-2">{vm.title}</h3>
                                        <p className="text-2xl font-[400] text-text_strong w-full">{vm.body}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </section>

            {/* what we offer */}
            <section className="pt-20 w-full lg:w-max lg:mx-auto px-2 lg:px-10">
                <h2 className="text-2xl text-text_strong pb-6">What we offer</h2>


                <div className="flex flex-col gap-4 md:flex-row">
                    {
                        offers.map((offer, key) => {
                            return (
                                <div className="w-full md:w-[410px]">
                                    <Image
                                        src={offer.image}
                                        height={400}
                                        width={410}
                                        id={offer.key}
                                        className="w-full object-cover lg:w-[628px]"
                                        alt={offer.alt}
                                    />
                                    <h3 className="text-base text-text_weak pt-4 pb-2">{offer.title}</h3>
                                    <p className="text-2xl text-text_strong">{offer.body}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>

            {/* footer */}
            <Footer />
        </>
    )
}

export default Page
