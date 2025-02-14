import Link from 'next/link'
import React from 'react'


export default function body() {
  return (
    <>
    <div className="w-full h-[100svh] mx-auto sm:w-[483px] flex flex-col items-center justify-center">
        {/* lora font */}
        <h1 className="text-[22px] pb-2 text-center">Password Reset</h1>
        <p className="text-sm leading-[22px] mx-3 sm:mx-auto text-center text-text_weak pb-8 w-[312px]">Your password has been successfully reset, login to explore a world of trendy Africa garment styles with exclusive deals</p>
        <div className="w-full h-10 mx-auto flex justify-center items-center">
            <Link href={`./products`} className="w-full sm:w-[323px] flex justify-center items-center h-10 text-base font-[500] py-1 px-6 rounded-full bg-text_strong text-white">Login</Link>
        </div>
    </div>
    <p className=" text-text_weak absolute bottom-5 text-center left-[50%] right-[50%] text-[12px] translate-x-[calc(-50%,-50%)] mx-auto w-max">©2025 Quicktrads All rights reserved.</p>
</>
  )
}
