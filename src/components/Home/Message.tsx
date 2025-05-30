import Image from 'next/image'
import React from 'react'

const Message = () => {
  return (
    <div className='md:w-[calc(100vw-40vw)] md:h-[calc(100vh-4vw)] md:rounded-r-lg text-white overflow-hidden relative'>
        <Image width={800} height={800} src="/theme.webp" alt="message theme" className='w-full h-full object-cover relative'/>

        <div className="absolute w-full h-full bg-[rgba(0,0,0,0.68)] top-0"></div>
    </div>
  )
}

export default Message