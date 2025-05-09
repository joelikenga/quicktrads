'use client'
import { Footer } from '@/app/Component/footer';
import { Navbar } from '@/app/global/navbar'
import {  arrowDown } from '@/app/global/svg';
import React, { useState } from 'react'

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
            question: 'Where do you ship to?',
            answer: 'We ship world wide via DHL',
        },
        {
            question: 'How long do I have to make a return?',
            answer: 'The timeline for a project varies depending on its complexity. However, we typically aim to complete most projects within 4-6 weeks.',
        },
        {
            question: 'Is there a return fee?',
            answer: 'Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.',
        },
        {
            question: 'Why do I have to pay for return?',
            answer: 'Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.',
        },
        {
            question: 'Can I return sale items?',
            answer: 'Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.',
        },
        {
            question: 'Risk of loss',
            answer: 'Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.',
        },
    ];
    return (
        <div>
            <Navbar />


            <div className="mt-[152px] px-4 lg:px-10">
                <p className="sm:text-xl text-text_weak text-[14px] pb-2 w-max mx-auto">Shipping & Delivery</p>
                <h1 className="w-full sm:w-[507px] sm:text-3xl text-[24px]  text-text_strong text-center sm:mx-auto pb-6">Fast and reliable delivery straight to your doorstep</h1>


                <div className="py-[48px] px-4 sm:px-0 max-w-full w-[800px] mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white border-b border-b-stroke_weak">
                            <button
                                className="w-full text-left flex justify-between outline-none items-center border-none focus:border-none focus:outline-none transition-all duration-300"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h3 className="font-[400] text-base text-text_strong py-6">{faq.question}</h3>
                                <span className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}>
                                    {arrowDown()}
                                </span>
                            </button>
                            <div className={`mt-2 ${openIndex === index ? '' : 'hidden'}`}>
                                <p className="text-text_weak pb-3">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    )
}
