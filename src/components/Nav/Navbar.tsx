"use client"
import Link from 'next/link'
import React from 'react'
import { AnimatedGradientTextDemo } from '../Layouts/ButtonShine'
import { Bell } from 'lucide-react';
import { useState } from 'react';
import NavMessage  from './NavMessage';

const Navbar = () => {

    const [selected, setSelected] = useState(false);

  return (
    <header className=' w-full md:h-[4vw] md:px-[3vw] h-[6vh] px-[1vh] flex items-center justify-between'>
        <div className="logo">
            <h1 className='md:text-[2vw] text-[3.3vh] font-prime text-transparent bg-clip-text bg-gradient-to-r from-prime to-second font-bold md:pt-4 pt-3 select-none'>ZeeChat</h1>
        </div>

        <div className="flex items-center gap-[1vh] md:gap-[1.5vw]">
            <div className="create-status">
            <Link href="/login">
               <AnimatedGradientTextDemo text={"Create Status"} className='md:text-[1.1vw] md:font-[600] font-[500] select-none'/>
            </Link>
            </div>

            <div className="notification relative">
                <div className="relative p-2 bg-zinc-900 rounded-full">
                    <Bell onClick={() => setSelected(!selected)} className={`md:size-7 size-6 transition-all duration-200 ${selected ? "text-white bg-zinc-800" : "text-zinc-400"} cursor-pointer`}/>
                    <div className='absolute top-0 right-0 bg-second  rounded-full md:p-2 p-1.5 flex items-center justify-center mb-[1vh]'/> 
                </div>

                <div className={`md:w-[18vw] md:h-[22vw] w-[27vh] h-[30vh] absolute md:top-[3vw] top-[5vh] right-0 bg-zinc-900 rounded-md transition-all duration-300 ease-in-out overflow-y-scroll hide-scrollbar transform  ${selected ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-20"} md:p-2 p-1`}>
                    <NavMessage/>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar