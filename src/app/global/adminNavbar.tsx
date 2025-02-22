import React from 'react'
import Link from 'next/link'
import { analysis, dashborad, logo, management, notification, arrowDown } from '@/app/global/svg'
import { usePathname } from 'next/navigation'


const adminNavbar = () => {
    const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
        const pathname = usePathname(); //using the usepathname to check the current pathname and storing in this variable
        const isActive = pathname === href;//used to check if the domain url matches to the link url

        return (
            <Link href={href} className={isActive ? "flex gap-1 items-center relative before:w-full before:h-[2px] before:rounded-lg before:mx-auto before:absolute before:left- before:bottom-[-22px] before:bg-text_strong" : "flex gap-1 text-text_weak items-center"}>
                {children}
            </Link>
        )
    }


    return (
        <div>
            <div className="w-full z-50 border-b border-b-stroke_weak fixed top-0 bg-white">
                {/* ----- management header ----- */}
                <div className="flex w-full justify-between px-20 py-8 h-12 items-center">
                    {/* ----- logo ----- */}
                    <Link href={`/`}>{logo()}</Link>



                    <div className='flex gap-6'>

                        {/* the links for navigation for the management page - desktop view */}
                        <div className='flex gap-6 items-center'>
                            <NavLink href={`/dashboard`}>{dashborad()} Dashboard</NavLink>
                            <NavLink href={`./management/add-product`}>{management()} Management</NavLink>
                            <NavLink href={`/analysis`}>{analysis()}Analysis</NavLink>
                            <NavLink href={`/notification`}>{notification()}Notification</NavLink>
                        </div>

                        {/* user info */}
                        <div className='flex gap-3 items-center'>
                            <div className='w-6 h-6 bg-brand_primary bg-brand_red text-white p-4 flex justify-center items-center rounded-full'>F</div>
                            <div className="flex items-center gap-2">Frank Emeka {arrowDown()}</div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default adminNavbar