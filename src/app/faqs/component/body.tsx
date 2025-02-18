'use client'
import { search } from '@/app/global/svg'
import { Navbar } from '@/app/global/navbar'
import { arrowUp, arrowDown } from '@/app/global/svg';
import React, { useState } from 'react'
import { Footer } from '@/app/Component/footer';


export const Body = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // interface FAQ {
    //     question: string;
    //     answer: string;
    // }

    const toggleFAQ = (index: number): void => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: 'Where is my refund',
            answer: 'Once we receive your return, it usually takes us four business days to process it and issue a refund. We\'ll email you to let you know when we\'ve initiated the refund, but it may take up to 10 additional business days for your account to reflect the funds',
        },
        {
            question: 'How do I track my order?',
            answer: 'The timeline for a project varies depending on its complexity. However, we typically aim to complete most projects within 4-6 weeks.',
        },
        {
            question: 'What are your shipping options?',
            answer: 'Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.',
        },
        {
            question: 'How do I return an item?',
            answer: 'Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.',
        },
        {
            question: 'Can my quicktrads order be dispatched internationally?',
            answer: 'Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.',
        },
        {
            question: 'How do I get free delivery on quicktrads orders?',
            answer: 'Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.',
        },
    ];
    return (
        <>
            <Navbar />

            <div className="mt-[152px] px-2 lg:px-10 lg:w-[800px] lg:mx-auto lg:max-w-full">
            <p className="text-xl text-text_weak pb-2 w-max mx-auto">FAQs</p>
            <h1 className="w-full sm:w-[550px] text-3xl text-text_strong text-center sm:mx-auto pb-6">Quick answers to common questions</h1>

                {/* searchbar */}
                <div className="flex items-center gap-2 font-medium text-sm  bg-fill border-stroke_strong px-4 rounded-full border lg:w-[440px] lg:mx-auto w-full   text-text_strong">
                    {search()}
                    <input
                        type="text"
                        placeholder="Search"
                        className="outline-none h-8 w-full bg-inherit"
                        // value={""}
                    // onChange={""}
                    />
                </div>

                {/* faq section */}
                <div className="space-y-4 pb-[48px]">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white p-6 border-b-2 border-blue">
                            <button
                                className="w-full text-left flex justify-between outline-none items-center border-none focus:border-none focus:outline-none transition-all duration-300"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h3 className="font-[400] text-base">{faq.question}</h3>
                                <span className="transform transition-transform duration-300">
                                    {openIndex === index ? arrowUp() : arrowDown()}

                                </span>
                            </button>
                            <div className={`mt-2 ${openIndex === index ? '' : 'hidden'}`}>
                                <p className="text-text_weak">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* load more */}
                <div className="mx-auto w-[130px] text-base py-[9px] rounded-full border h-[40px] border-stroke_strong text-text_strong flex items-center justify-center cursor-pointer">
                    Load more
                </div>


                <Footer />
            </div>

        </>
    )
}
