"use client";
import { search } from "@/app/global/svg";
import { Navbar } from "@/app/global/navbar";
import { arrowDown } from "@/app/global/svg";
import React, { useState } from "react";
import { Footer } from "@/app/Component/footer";
import Link from "next/link";

export const Body = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Where is my refund",
      answer:
        "Once we receive your return, it usually takes us four business days to process it and issue a refund. We'll email you to let you know when we've initiated the refund, but it may take up to 10 additional business days for your account to reflect the funds",
    },
    {
      question: "How do I track my order?",
      answer:
        "The timeline for a project varies depending on its complexity. However, we typically aim to complete most projects within 4-6 weeks.",
    },
    {
      question: "What are your shipping options?",
      answer:
        "Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.",
    },
    {
      question: "How do I return an item?",
      answer:
        "Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.",
    },
    {
      question: "Can my quicktrads order be dispatched internationally?",
      answer:
        "Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.",
    },
    {
      question: "How do I get free delivery on quicktrads orders?",
      answer:
        "Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "Yes! We provide ongoing support and maintenance for all our projects to ensure everything runs smoothly post-launch.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="mt-[152px] px-4 sm:px-2 lg:px-10">
        <p className="text-base sm:text-xl text-text_weak pb-2 w-max mx-auto">
          FAQs
        </p>
        <h1 className="w-full sm:w-[550px] text-xl sm:text-3xl text-text_strong text-center sm:mx-auto pb-6">
          Quick answers to common questions
        </h1>

        <div className="flex justify-center items-center w-full">
          {/* searchbar */}
          <div className="flex items-center gap-2 font-medium text-sm  bg-transparent   px-4 rounded-full border  w-full max-w-[440px]   text-text_strong">
            {search()}
            <input
              type="text"
              placeholder="Search"
              className="outline-none h-8 w-fit bg-inherit"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* faq section */}
        <div className="py-[48px] max-w-full w-[800px] mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border-b border-b-stroke_weaky"
              >
                <button
                  className="w-full text-left flex justify-between outline-none items-center border-none focus:border-none focus:outline-none transition-all duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="font-[400] text-base text-text_strong py-6">
                    {faq.question}
                  </h3>
                  <span
                    className={`transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    {arrowDown()}
                  </span>
                </button>
                <div className={`${openIndex === index ? "" : "hidden"}`}>
                  <p className="text-text_weak pb-3">{faq.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-text_strong mb-2">
                {`We're new to this question!`}{" "}
              </p>
              <p className="text-text_weak mb-4">
                {`We haven't encountered this question before. Let us help you
                directly.`}
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-2 bg-primary text-error_1 hover:underline  rounded-full hover:decoration-error_1 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};
