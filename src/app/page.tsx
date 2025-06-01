"use client"
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MainNavigation from "@/components/Home/MainNavigation";
import MobileBottomBar from "@/components/Home/MobileBottomBar";


const page = () => {

  const {isAuthenticated} = useAuthStore();

  const router = useRouter();

 useEffect(() => {
  if (!isAuthenticated) {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [isAuthenticated, router]);

  return (
    <div className="relative w-full md:h-[calcu(100vh-4vw)] h-[calcu(100vh-6vh)] md:flex md:px-[3vw]">
      <MainNavigation/>

      <MobileBottomBar/>
    </div>
  )
}

export default page