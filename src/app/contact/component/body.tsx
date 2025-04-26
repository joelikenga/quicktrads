'use client';
import { Footer } from "@/app/Component/footer";
import { Navbar } from "@/app/global/navbar";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

export const Body = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const mailtoLink = `mailto:support@quicktrads.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.fullName}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.open(mailtoLink, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div className="">
        <Navbar />
        <div className="  w-full px-4 md:px-10">
          <section className="mt-[152px]  flex justify-between md:gap-12 items-center md:flex-row w-full mx-auto max-w-7xl">
            {/* lhs */}
            <div className="px-2 w-full md:w-[432px]">
              <div>
                <p className="text-text_gray text-sm pb-2">Contact us</p>

                <h1 className="text-[24px] sm:text-[32px] leading-[38px] font-[400] w-full sm:w-[376px] pb-8">
                  We’re here to help with anything you need
                </h1>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="pb-4 w-full">
                  {/* fullname */}
                  <div>
                    <label htmlFor="fullName">
                      <p className="text-sm text-text_strong pb-2">Full name</p>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full border outline-none focus:border-text_strong px-[12px] border-[#d6d6d6] h-10 rounded-[8px]"
                      />
                    </label>
                  </div>
                </div>

                <div className="pb-4 w-full">
                  {/* email */}
                  <label htmlFor="email">
                    <p className="text-sm text-text_strong pb-2">Email</p>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border outline-none focus:border-text_strong px-[12px] border-[#d6d6d6] h-10 rounded-[8px]"
                    />
                  </label>
                </div>

                <div className="pb-4 w-full">
                  {/* subject */}
                  <div>
                    <label htmlFor="subject">
                      <p className="text-sm text-text_strong pb-2">Subject</p>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full border outline-none focus:border-text_strong px-[12px] border-[#d6d6d6] h-10 rounded-[8px]"
                      />
                    </label>
                  </div>
                </div>

                <div className="pb-3 sm:pb-4 md:pb-8 w-full">
                  {/* message */}
                  <div>
                    <label htmlFor="message">
                      <p className="text-sm text-text_strong pb-2">Message</p>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full h-[88px] border outline-none focus:border-text_strong px-[12px] border-[#d6d6d6] rounded-[8px]"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 sm:mt-4 md:mt-8 h-10 w-full md:w-[432px] text-white bg-text_strong rounded-full"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* rhs */}
            <div className="hidden md:block md:w-[300px] lg:w-[800px]">
              <Image
                src={
                  "https://res.cloudinary.com/dymkfk58k/image/upload/v1739280911/contactimg_qzkwfb.png"
                }
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
  );
};
