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
                className="animate-background inline-block rounded-lg
                 bg-gray-900 from-pink-500 via-red-500 to-yellow-500
                  bg-[length:_400%_400%] p-0.5 [animation-duration:_6s] hover:bg-gradient-to-r dark:bg-gray-800">
         <span className="block rounded-lg bg-white px-5 py-3 text-sm font-medium 
         text-gray-900 dark:bg-gray-900 dark:text-white">
  {link.label}
  </span>
  </Link>  
                </li>
            )
        })
      }
    </ul>
  )
}

export default NavItems