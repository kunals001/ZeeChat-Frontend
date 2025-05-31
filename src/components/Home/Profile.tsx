"use client"
import React, { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import Image from 'next/image'
import UploadImage from '../UploadImage';

const Profile = () => {

  const [coverImg,setCoverImg] = useState("");

  const {user} = useAuthStore();

  return (
    <div className='md:w-[30vw] md:h-[calc(100vh-7vw)] text-white bg-[#181818f5]'>
      <div className="w-full md:p-[1vw] text-zinc-200">
        <h2 className='md:text-[1.5vw] font-second font-semibold select-none'>Hello, {user?.fullName}</h2>
      </div>

      <div className="relative w-full flex items-center justify-center">
        {typeof user?.profilePic === "string" && user.profilePic.trim() !== "" ? (
          <Image
              width={100}
              height={100}
              src={user.profilePic}
              alt="user profile"
              className="md:w-[8vw] md:h-[8vw] w-[5vh] h-[5vh] rounded-full object-cover border-2 border-prime cursor-pointer relative"
            />
          ) : null}

        <UploadImage coverImg={coverImg} setCoverImg={setCoverImg} />
      </div>
    </div>
  )
}

export default Profile