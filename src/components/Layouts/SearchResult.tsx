import React from 'react'
import Image from 'next/image'

const SearchResult = () => {
  return (
    <div className="friend w-full md:px-[1vh] flex md:gap-[.5vw] px-[1.3vh] cursor-pointer hover:bg-zinc-800 transition-all duration-100 gap-[1vh]">
        {/* Image container with padding */}
        <div className="flex items-center justify-center md:p-2 p-1">
            <div className="relative md:w-[3.2vw] md:h-[3.2vw] w-[6vh] h-[6vh] rounded-full overflow-hidden">
            <Image 
                src="/theme.webp" 
                alt="user profile" 
                fill
                className='object-cover'
                sizes="(max-width: 768px) 4vh, 3.2vw"
            />
            </div>
        </div>
    
        <div className="w-full flex items-center justify-between md:py-[.5vh] border-b border-zinc-700">
            <div className="flex flex-col md:gap-[.4vh] gap-[.5vh]">
                <h3 className='md:text-[1vw] font-second text-zinc-200 text-[2vh]'>Kunal Singh | <span className='text-zinc-400 text-sm'>kunal_singh_123</span></h3>
                <p className='md:text-[.7vw] text-zinc-400 font-second leading-none text-[1.2vh] md:w-[18vw] w-[60vw]'>Hey there! Iam using zeechat Lorem, ipsum dolor sit amet consectetur adipisicing </p>
            </div>

            <button className='md:text-[1vw] md:px-[1vh] md:py-[.4vh] px-[.5vh] py-[.3vh] md:rounded-lg rounded-md text-white bg-gradient-to-r from-prime to-second cursor-pointer'>Follow</button>
        </div>
    </div>
  )
}

export default SearchResult