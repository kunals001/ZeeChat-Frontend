import React from 'react'
import { IconSquareRoundedPlus} from '@tabler/icons-react';

const Chats = () => {
  return (
    <div className='md:w-[30vw] md:h-[calc(100vh-7vw)] text-white bg-[#181818f5]'>
      <div className="w-full md:p-[1vw] text-zinc-200  flex items-center justify-between">
        <h2 className='md:text-[1.5vw] font-prime font-semibold select-none'>Chats</h2>

        <div className='md:p-[.5vw] md:rounded-lg cursor-pointer hover:bg-zinc-800 transition-all duration-300'>
          <IconSquareRoundedPlus className={ `md:size-7 text-zinc-200`}/>
        </div>
      </div>
    </div>
  )
}

export default Chats