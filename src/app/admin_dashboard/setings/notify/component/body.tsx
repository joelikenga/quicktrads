'use client'
import { useState } from "react"

export const Body = () => {

    const [option, setOption] = useState(false);
    const [option2, setOption2] = useState(false);
    const [option3, setOption3] = useState(false);
    const [option4, setOption4] = useState(false);
    const [option5, setOption5] = useState(false);
    const [option6, setOption6] = useState(false);


    const addOption = () => {
        setOption(!option)
    }

    const addOption2 = () => {
        setOption2(!option2)
    }

    const addOption3 = () => {
        setOption3(!option3)
    }

    const addOption4 = () => {
        setOption4(!option4)
    }

    const addOption5 = () => {
        setOption5(!option5)
    }
    const addOption6 = () => {
        setOption6(!option6)
    }


    return (
        <>
            <div className=" ml-[280px] mt-[150px]">
                <div>
                    <p className="text-lg text-text_strong">Notification</p>
                    <p className="text-base text-text_weak pt-1">Manage your notification</p>
                </div>

                <div className="mt-[48px]">
                    <p className="text-base text-text_weak">Customer notifications</p>


                    <section className="pt-4">
                        {/* 01 */}
                        <div className="mb-[32px] flex gap-3">
                            {/* switch */}
                            <div onClick={addOption} className={`w-[48px] h-[24px] ease-in-out cursor-pointer rounded-full flex items-center px-1 ${option ? "bg-switch_on" : "bg-stroke_weak"}`}>
                                <div className={`w-[16px] h-[16px] rounded-full ease-in-out cursor-pointer ${option ? "ml-auto bg-success_1" : "bg-text_weaker"}`} />
                            </div>

                            {/* information */}
                            <div>
                                <h3 className="text-base text-text_strong pb-1">Order updates</h3>
                                <p className="text-base text-text_weak">Receive alerts for new orders, cancelled orders and refund</p>
                            </div>
                        </div>

                        {/* 02 */}
                        <div className="mb-[32px] flex gap-3">
                            {/* switch */}
                            <div onClick={addOption2} className={`w-[48px] h-[24px] ease-in-out cursor-pointer rounded-full flex items-center px-1 ${option2 ? "bg-switch_on" : "bg-stroke_weak"}`}>
                                <div className={`w-[16px] h-[16px] rounded-full ease-in-out cursor-pointer  ${option2 ? "ml-auto bg-success_1" : "bg-text_weaker"}`} />
                            </div>

                            {/* information */}
                            <div>
                                <h3 className="text-base text-text_strong pb-1">Customer messages</h3>
                                <p className="text-base text-text_weak">Alerts for direct messages or inquiries from customers</p>
                            </div>
                        </div>

                        {/* 03 */}
                        <div className="mb-[32px] flex gap-3">
                            {/* switch */}
                            <div onClick={addOption3} className={`w-[48px] h-[24px] ease-in-out cursor-pointer rounded-full flex items-center px-1 ${option3 ? "bg-switch_on" : "bg-stroke_weak"}`}>
                                <div className={`w-[16px] h-[16px] rounded-full ease-in-out cursor-pointer ${option3 ? "ml-auto bg-success_1" : "bg-text_weaker"}`} />
                            </div>

                            {/* information */}
                            <div>
                                <h3 className="text-base text-text_strong pb-1">Review alerts</h3>
                                <p className="text-base text-text_weak">Notifications when customers leaves reviews or feedback</p>
                            </div>
                        </div>

                        {/* 04 */}
                        <div className="flex gap-3">
                            {/* switch */}
                            <div onClick={addOption4} className={`w-[48px] h-[24px] ease-in-out cursor-pointer rounded-full flex items-center px-1 ${option4 ? "bg-switch_on" : "bg-stroke_weak"}`}>
                                <div className={`w-[16px] h-[16px] rounded-full ease-in-out cursor-pointer ${option4 ? "ml-auto bg-success_1" : "bg-text_weaker"}`} />
                            </div>

                            {/* information */}
                            <div>
                                <h3 className="text-base text-text_strong pb-1">Customer activity</h3>
                                <p className="text-base text-text_weak">Stay informed about new customer registrations or updates to customer profiles</p>
                            </div>
                        </div>
                    </section>

                    <section className="pb-28 pt-[48px]">
                        <h3 className="text-base text-text_strong">Admin notifications</h3>


                        {/* 01 */}
                        <div className="mt-[16px] mb-[32px] flex gap-3">
                            {/* switch */}
                            <div onClick={addOption5} className={`w-[48px] h-[24px] ease-in-out cursor-pointer rounded-full flex items-center px-1 ${option5 ? "bg-switch_on" : "bg-stroke_weak"}`}>
                                <div className={`w-[16px] h-[16px] rounded-full ease-in-out cursor-pointer ${option5 ? "ml-auto bg-success_1" : "bg-text_weaker"}`} />
                            </div>

                            {/* information */}
                            <div>
                                <h3 className="text-base text-text_strong pb-1">Suspicious activity</h3>
                                <p className="text-base text-text_weak">Alerts for failed logins or unusual admin activity</p>
                            </div>
                        </div>

                        {/* 02 */}
                        <div className="flex gap-3">
                            {/* switch */}
                            <div onClick={addOption6} className={`w-[48px] h-[24px] ease-in-out cursor-pointer rounded-full flex items-center px-1 ${option6 ? "bg-switch_on" : "bg-stroke_weak"}`}>
                                <div className={`w-[16px] h-[16px] rounded-full ease-in-out cursor-pointer  ${option6 ? "ml-auto bg-success_1" : "bg-text_weaker"}`} />
                            </div>

                            {/* information */}
                            <div>
                                <h3 className="text-base text-text_strong pb-1">Password changes</h3>
                                <p className="text-base text-text_weak">Get notified of changes to admin passwords</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </>
    )

}