import React from 'react'
import { logo, redInfoSmall } from '../../../global/svg'
import Link from 'next/link'

export default function body() {
  return (
    <div>
      <section className="w-full sm:w-[483px] flex flex-col justify-between relative h-[100svh] mx-auto">
        <form action="">

          <div className="pt-20 pb-6 w-max mx-auto">
            <Link href={`/`}>{logo()}</Link>
          </div>

          <div className="pb-6">
            {/* login with font lora */}
            <h1 className="text-[22px] pb-2 text-center">Forget password</h1>
            <p className="text-text_weak text-sm text-center">Enter your login details now</p>
          </div>


          {/* email */}
          <div className="pb-4 mx-2 sm:mx-[80px]">
            <label htmlFor="">
              <p className="pb-2 text-sm text-text_strong">Email</p>
              <input type="text" className="border focus:border-black outline-none border-stroke_strong py-2 px-4 w-full sm:w-[323px] h-[40px] focus:border-stroke-black rounded-lg" />
            </label>
          </div>

          <div className="mx-2 sm:mx-auto sm:w-max">
            <input type="submit" className='cursor-pointer focus:border-black w-full lg:w-[323px] h-[40px] py-1 px-1 sm:px-3 lg:px-6 bg-text_strong text-white rounded-full' value="Proceed" />

            <p className="text-sm text-text_weak pt-[32px] text-center">Remember password? <Link href={`./login`} className="underline text-black">Login</Link></p>
          </div>
        </form>
        <div>

          {/* incorrect email notification banner */}
          <div className="h-11 flex justify-start items-center border-l-4 rounded-l-xl w-max mx-auto bg-fill border-error_1 px-2 gap-1 sm:gap-2">
            <i>{redInfoSmall()}</i>
            <p className="text-sm">
              No existing account with this email
            </p>
          </div>
          <p className=" text-text_weak text-[12px] mx-auto w-max pt-[22px] pb-5 text-center">©2025 Quicktrads All rights reserved.</p>
        </div>
      </section>
    </div>
  )
}
