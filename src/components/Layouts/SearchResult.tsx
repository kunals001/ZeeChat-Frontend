import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import type { User } from "@/store/authStore";
import { toast } from 'react-hot-toast';

const SearchResult = ({ users }: { users: User[] }) => {

   const API_URL_3 = process.env.NEXT_PUBLIC_API_KEY_3 

  const [followStatus, setFollowStatus] = useState<{ [key: string]: "none" | "requested" | "following" }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const handleFollow = async (userId: string) => {
    setLoading(prev => ({ ...prev, [userId]: true }));
    try {
      const res = await axios.post(`${API_URL_3}/follow`, { userId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 200) {
        setFollowStatus(prev => ({ ...prev, [userId]: "requested" }));
      }
      toast.success("Follow request sent successfully");
    } catch (err) {
      console.error("Error sending follow request", err);
    } finally {
      setLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const handleUnfollow = async (userId: string) => {
    setLoading(prev => ({ ...prev, [userId]: true }));
    try {
      const res = await axios.post(`${API_URL_3}/unfollow`, { userId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 200) {
        setFollowStatus(prev => ({ ...prev, [userId]: "none" }));
      }
    } catch (err) {
      console.error("Error unfollowing user", err);
    } finally {
      setLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div>
      {users.length === 0 ? (
        <p className='md:text-[1vw] text-zinc-400 font-second text-[2vh] text-center'>
          Find New Friends
        </p>
      ) : (
        users.map((user) => {
          const status = followStatus[user._id] || "none";
          const isLoading = loading[user._id] || false;

          return (
            <div key={user._id} className="friend w-full md:px-[1vh] flex md:gap-[.5vw] px-[1.3vh] cursor-pointer hover:bg-zinc-800 transition-all duration-100 gap-[1vh]">
              <div className="flex items-center justify-center md:p-2 p-1">
                <div className="relative md:w-[3.2vw] md:h-[3.2vw] w-[6vh] h-[6vh] rounded-full overflow-hidden">
                  {typeof user?.profilePic === "string" && (
                    <Image
                      src={user?.profilePic}
                      alt="user profile"
                      fill
                      className='object-cover'
                      sizes="(max-width: 768px) 4vh, 3.2vw"
                    />
                  )}
                </div>
              </div>

              <div className="w-full flex items-center justify-between md:py-[.5vh] border-b border-zinc-700">
                <div className="flex flex-col md:gap-[.4vh] gap-[.5vh]">
                  <h3 className='md:text-[1vw] font-second text-zinc-200 text-[2vh]'>
                    {user?.fullName} | <span className='text-zinc-400 text-sm'>{user?.userName}</span>
                  </h3>
                  <p className='md:text-[.7vw] text-zinc-400 font-second leading-none text-[1.2vh] md:w-[18vw] w-[60vw]'>
                    {user?.bio}
                  </p>
                </div>

                {/* Follow / Unfollow / Requested Button */}
                {status === "following" ? (
                  <button
                    onClick={() => handleUnfollow(user._id)}
                    disabled={isLoading}
                    className='md:text-[1vw] md:px-[1vh] md:py-[.4vh] px-[.5vh] py-[.3vh] md:rounded-lg rounded-md text-white bg-red-600 cursor-pointer'>
                    {isLoading ? "Unfollowing..." : "Unfollow"}
                  </button>
                ) : status === "requested" ? (
                  <button
                    disabled
                    className='md:text-[1vw] md:px-[1vh] md:py-[.4vh] px-[.5vh] py-[.3vh] md:rounded-lg rounded-md text-white bg-zinc-600 cursor-default'>
                    Requested
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(user._id)}
                    disabled={isLoading}
                    className='md:text-[1vw] md:px-[1vh] md:py-[.4vh] px-[.5vh] py-[.3vh] md:rounded-lg rounded-md text-white bg-gradient-to-r from-prime to-second cursor-pointer'>
                    {isLoading ? "Following..." : "Follow"}
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SearchResult;
