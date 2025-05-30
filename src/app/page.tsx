"use client"
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MainNavigation from "@/components/Home/MainNavigation";


const page = () => {

  const {isAuthenticated} = useAuthStore();

  const router = useRouter();

  useEffect(()=>{
    if(!isAuthenticated){
      router.push("/login");
    }
  },[isAuthenticated,router])

  return (
    <div className="w-full md:h-[calcu(100vh-4vw)] h-[calcu(100vh-6vh)] md:flex md:px-[3vw] px-[1vh]">
      <MainNavigation/>
    </div>
  )
}

export default page