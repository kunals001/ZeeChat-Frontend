import React from 'react'
import Image from 'next/image'

const NavMessage = () => {
  return (
    <div className='w-full md:px-[1vh] md:py-[.5vh] p-[1vh]  bg-zinc-800 rounded-lg flex gap-[1vh]'>
        <Image width={50} height={50} src="/next.svg" alt="user profile" className='md:w-[2vw] md:h-[2vw] w-[4vh] h-[4vh] rounded-xl object-cover border-2 border-prime'/>

        <div className="flex flex-col gap-[.5vh]">
          <h2 className='text-[1.5vh] md:text-[1vw] text-white leading-none'>Kunal Singh.<span className='text-[1vh] md:text-[.6vw] text-zinc-300'>2 hours ago</span></h2>

          <p className='text-[1.2vh] md:text-[.8vw] text-zinc-200 leading-none'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
    </div>
  )
}

export default NavMessage