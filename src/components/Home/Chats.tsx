import React from 'react'
import { IconSquareRoundedPlus} from '@tabler/icons-react';
import { Search } from 'lucide-react';
import ChatList from './ChatList';
import "@/app/globals.css"

const Chats = () => {
  return (
    <div className='md:w-[30vw] md:h-[calc(100vh-7vw)] overflow-y-scroll text-white bg-[#181818f5] hide-scrollbar '>
      <div className="w-full sticky top-0 bg-[#181818f5] backdrop-blur-2xl z-10 md:p-[1vw]">
        <div className="w-full text-zinc-200  flex items-center justify-between">
          <h2 className='md:text-[1.5vw] font-prime font-semibold select-none'>Chats</h2>

          <div className='md:p-[.5vw] md:rounded-lg cursor-pointer hover:bg-zinc-800 transition-all duration-300'>
            <IconSquareRoundedPlus className={ `md:size-7 text-zinc-200`}/>
          </div>
        </div>

        <div className="md:mt-[1vw] flex items-center relative">
          <input type="text" placeholder='Search...' className='w-full md:p-[.5vw] md:rounded-lg bg-zinc-800 text-zinc-200 placeholder:text-zinc-500 placeholder:text-md outline-none md:px-[1vw]'/>

          <Search className='text-zinc-500 absolute md:right-3'/>
        </div>
      </div>

      <ChatList/>
    </div>
  )
}

export default Chats