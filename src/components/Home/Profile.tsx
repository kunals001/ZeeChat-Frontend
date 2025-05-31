"use client"
import React, { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import Image from 'next/image'
import Upload from './Upload'
import toast from 'react-hot-toast'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LogOut } from 'lucide-react'


const Profile = () => {

  const [profilePic,setprofilePic] = useState("");
  const [fullName,setFullName] = useState("");
  const [userName,setUserName] = useState("");
  const [bio,setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const {user,updateUser,error,logout} = useAuthStore();

  const updateProfile = async (
  e: React.FormEvent<HTMLFormElement>
   ) => {
  e.preventDefault();
  if (!isEditing) return;

  try {
    const response = await updateUser({ profilePic, bio, fullName, userName });
    if(response?.success === true){
      toast.success("Profile updated successfully");
     }else{
      toast.error("Failed to update profile");
     } 
  } catch (error) {
    toast.error("Failed to update profile");
  } finally {
    setIsEditing(false);
  }
 };

 const handelLogout = async () => {
  try {
      await logout();
      toast.success("Logout successful");
  } catch (error) {
    console.error("Logout failed", error);
  }
 }

  return (
    <div className='md:w-[30vw] md:h-[calc(100vh-7vw)] text-white bg-[#181818f5]'>
      <div className="w-full md:p-[1vw] text-zinc-200 flex items-center justify-between">
        <h2 className='md:text-[1.5vw] font-second font-semibold select-none'>Hello, {user?.fullName}</h2>

        <button onClick={handelLogout} className='md:text-[1vw] text-zinc-100 md:px-[1vh] md:py-[.4vh] md:rounded-lg bg-red-400 cursor-pointer font-semibold disabled:opacity-50 flex gap-1 items-center'>Logout <LogOut className='md:size-4'/></button>
      </div>

      <div className="relative rounded-full md:w-[8vw] md:h-[8vw] w-[5vh] h-[5vh] flex items-center justify-center mx-auto overflow-hidden">
        {typeof user?.profilePic === "string" && user.profilePic.trim() !== "" ? (
          <Image
              width={100}
              height={100}
              src={user.profilePic}
              alt="user profile"
              className="md:w-[8vw] md:h-[8vw] w-[5vh] h-[5vh] rounded-full object-cover border-2 border-prime cursor-pointer relative"
            />
          ) : null}

          {isEditing && (
            <div className="absolute w-full h-full bg-[rgba(0,0,0,0.3)] top-0 flex items-center justify-center">
              <Upload coverImg={profilePic} setCoverImg={setprofilePic} />
            </div>
          )}
      </div>

       <form onSubmit={updateProfile} className="md:px-[1vw] md:mt-[1.5vw] flex flex-col gap-[1vh]">
      <input
        type="text"
        placeholder={user?.fullName}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        disabled={!isEditing}
        className="w-full md:h-[3vh] h-[3vh] md:p-[1vw] p-[1vh] rounded-lg bg-zinc-800 text-zinc-200 outline-none disabled:opacity-50"
      />

      <input
        type="text"
        placeholder={user?.userName}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        disabled={!isEditing}
        className="w-full md:h-[3vh] h-[3vh] md:p-[1vw] p-[1vh] rounded-lg bg-zinc-800 text-zinc-200 outline-none disabled:opacity-50"
      />

      <textarea
        placeholder={user?.bio}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        disabled={!isEditing}
        className="w-full md:h-[6vw] h-[3vh] md:p-[1vw] p-[1vh] rounded-lg bg-zinc-800 text-zinc-200 outline-none resize-none disabled:opacity-50"
      />

      <div className="flex items-center justify-between md:mt-1">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="md:text-[1vw] font-semibold text-zinc-100 md:px-[1vh] md:py-[.4vh] md:rounded-lg bg-zinc-700 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Edit Profile
        </button>

        <button
          type="submit"
          disabled={!isEditing}
          className="md:text-[1vw] text-zinc-100 md:px-[1vh] md:py-[.4vh] md:rounded-lg bg-gradient-to-l from-prime to-second cursor-pointer focus:ring-2 ring-prime font-semibold disabled:opacity-50"
        >
          Save Profile
        </button>
      </div>

      {error && (
        <Alert className="mt-4 bg-zinc-800 border-none outline-none">
          <AlertTitle className='text-red-500 md:text-[1vw]'>Error</AlertTitle>
          <AlertDescription className='text-zinc-200'>{error}</AlertDescription>
        </Alert>
      )}
    </form>
    </div>
  )
}

export default Profile