import { Footer } from '@/app/Component/footer';
import { Navbar } from '@/app/global/navbar'
import { Lora } from 'next/font/google'
import React from 'react'

const lora = Lora({
    variable: "--font-lora",
    subsets: ["latin"],
});

export default function body() {
    return (
        <>
            <Navbar />

            <div className="mt-[152px]">


                <section className="w-[599px] mx-auto">
                    <p className="text-[18px] leading-[28px] text-text_weak font-[400] text-center">Sizing guide</p>
                    <h1 className={`${lora.className} text-[32px] leading-[38px] text-text_strong py-2 text-center`}>Find your perfect fit</h1>

                    <p className="w-[599px] leading-[22px] font-[400] text-center">The measurements on the size chart are body measurements. Find your correct size in the chart below. Scroll horizontally to see more sizes.</p>
                </section>

                {/* tabs  */}



                {/* fit tips */}
                <section className="w-[852px] pb-[48px] mx-auto">
                    <div>
                        <h3 className="text-text_strong text-[16px] leading-[22px] pb-2">Fit tips</h3>

                        <p className="text-text_weak text-[16px] leading-[22px] pb-3">Tall Tops Sizes (6`&lsquo;65/183&lsquo;196cm approx.): 1.75`&apos;`4.5cm approx. longer in length than regular tops. Sleeve length is adjusted proportionately depending on silhouette. Tall sizes are only available for select styles.</p>

                        <p className="text-text_weak text-[16px] leading-[22px]">If youre on the borderline between two sizes, order the smaller size for a tighter fit or the larger size for a looser fit. If your measurements for chest and waist correspond to two different suggested sizes, order the size indicated by your chest measurement.</p>
                    </div>

                    {/* how to measure */}
                    <div>
                        <h3 className="text-text_strong text-[16px] leading-[22px] pb-2">Fit tips</h3>

                        <ul>
                            <li className="list-outside text-[16px] leading-[22px] pb-3 text-text_weak">CHEST: Measure around the fullest part of your chest, keeping the tape measure horizontal.</li>
                            <li className="list-outside text-[16px] leading-[22px] pb-3 text-text_weak">WAIST: Measure around the narrowest part (typically where your body bends side to side), keeping the tape measure horizontal</li>
                            <li className="list-outside text-[16px] leading-[22px] text-text_weak">HIPS: Measure around the fullest part of your hips, keeping the tape measure horizontal.</li>
                        </ul>
                    </div>
                </section>
            </div>



            <Footer />
        </>
    )
}
