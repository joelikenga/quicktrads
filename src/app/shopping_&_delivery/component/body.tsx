'use client'
import { Footer } from '@/app/Component/footer';
import { Navbar } from '@/app/global/navbar'
import { arrowUp, arrowDown } from '@/app/global/svg';
import React, { useState } from 'react'

export default function body() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    interface FAQ {
        question: string;
        answer: string;
    }

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


            <div className="mt-[152px] px-2 lg:px-10 lg:w-[800px] lg:mx-auto lg:max-w-full">
                <p className="text-xl text-text_weak pb-2 w-max mx-auto">Shipping & Delivery</p>
                <h1 className="w-full sm:w-[507px] text-3xl text-text_strong text-center sm:mx-auto pb-6">Fast and reliable delivery straight to your doorstep</h1>


                <div className="space-y-4">
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
            </div>

            <Footer />
        </div>
    )
}
