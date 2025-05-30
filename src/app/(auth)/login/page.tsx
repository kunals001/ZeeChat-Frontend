"use client"
import { Loader } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useState ,useEffect} from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import Input from '@/components/Layouts/Input'
import { Mail, Lock } from 'lucide-react'


const page = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const {login, isLoading, error, isAuthenticated} = useAuthStore();

    useEffect(()=>{
      if(isAuthenticated){
        router.push("/");
      }
    },[isAuthenticated,router])

    const handelSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try { 
            await login({email, password});
            router.push("/");
        } catch (error) {
            
        }
    }

  return (
     <div className='w-full md:h-[calc(100vh-4vw)] h-[calc(100vh-6vh)] md:px-[3vw] px-[1vh] flex items-center justify-center'>

          <div className="md:w-[30vw] relative w-full md:p-[1vw] p-[1vh] md:rounded-xl rounded-lg flex flex-col items-center overflow-hidden border-2 border-zinc-900">
          
            <h1 className='md:text-[2vw] text-[3.3vh] font-prime text-transparent bg-clip-text bg-gradient-to-r from-prime to-second font-bold md:pt-4 pt-3 select-none'>Welcome Back</h1>

            <form onSubmit={handelSubmit} className="w-full md:mt-2 mt-3">
  
              <Input type="email" placeholder="Your Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} icon={Mail}/>

              <Input type="password" placeholder="Enter Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} icon={Lock}/>

              {error && (
                <p className='md:text-[1vw] text-[1.5vh] text-red-600 font-semibold mt-2'>{error}</p>
              )}

              <button aria-label="login" type="submit" disabled={isLoading} className="w-full bg-prime text-white md:mt-4 mt-3 md:py-[.2vw] py-[.5vh] md:text-[1.3vw] text-[2.5vh] font-semibold rounded-lg cursor-pointer">
                {isLoading ? <Loader className="animate-spin mx-auto"/> : "Login"}
              </button>
            </form>

            <p className="md:text-[1vw] text-[1.7vh] text-zinc-300 mt-3 ">Don't have an account <Link href="/signup" className='text-prime cursor-pointer hover:underline'>Signup</Link></p>
        </div>
    </div>
  )
}

export default page