"use client";

import { headerLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const NavItems = () => {

    const pathname = usePathname();

  return (

    <ul className='md:flex-between md:flex-row flex w-full flex-col items-start gap-5'>
      {
        headerLinks.map((link)=> {
            const isActive = pathname === link.route;
    
            return(
                <li key={link.route} className={`${isActive && "text-primary-500"} flex-center p-medium-16  whitespace-nowrap`}>
                <Link href={link.route} 
                className='px-2 py-2 bg-sky-700 rounded-full text-white 
                hover:bg-violet-600 hover:text-yellow-50
                 active:bg-violet-700  focus:outline-none focus:ring focus:ring-violet-300 '>
                {link.label}</Link>
                </li>
            )
        })
      }
    </ul>
  )
}

export default NavItems