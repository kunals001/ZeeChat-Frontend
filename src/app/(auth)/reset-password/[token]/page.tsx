"use client"
import { Key, Loader,Lock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useState ,useEffect} from 'react'
import { useAuthStore } from '@/store/authStore'
import Input from '@/components/Layouts/Input'
import { useParams ,useRouter} from 'next/navigation'


const page = () => {

    const [password, setPassword] = useState("");
    const [submited, setSubmitting] = useState(false);

    const router = useRouter();
    const params = useParams();
    const token = params.token as string

    const {resetpassword, isLoading, error,isAuthenticated} = useAuthStore();

    useEffect(()=>{
      if(isAuthenticated){
          router.push("/");
        }
    },[isAuthenticated,router])

    const handelSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try { 
            await resetpassword({password,token});
            setSubmitting(true);
        } catch (error) {
            
        }
    }

  return (
     <div className='w-full md:h-[calc(100vh-4vw)] h-[calc(100vh-6vh)] md:px-[3vw] px-[1vh] flex items-center justify-center'>

       {!submited ? (
         <div className="md:w-[30vw] relative w-full md:p-[1vw] p-[1vh] md:rounded-xl rounded-lg flex flex-col items-center overflow-hidden border-2 border-zinc-900">
          
            <h1 className='md:text-[2vw] text-[3.3vh] font-prime text-transparent bg-clip-text bg-gradient-to-r from-prime to-second font-bold md:pt-4 pt-3 select-none'>Reset Your Password</h1>

            <form onSubmit={handelSubmit} className="w-full md:mt-2 mt-3">
  
              <Input type="password" placeholder="Enter new password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} icon={Lock}/>

              {error && (
                <p className='md:text-[1vw] text-[1.5vh] text-red-600 font-semibold mt-2'>{error}</p>
              )}

              <button aria-label="login" type="submit" disabled={isLoading} className="w-full bg-prime text-white md:mt-4 mt-3 md:py-[.2vw] py-[.5vh] md:text-[1.3vw] text-[2.5vh] font-semibold rounded-lg cursor-pointer">
                {isLoading ? <Loader className="animate-spin mx-auto"/> : "Reset Password"}
              </button>
            </form>

        </div>
       ) : (
           <div className="md:w-[30vw] relative w-full md:p-[1vw] p-[1vh] md:rounded-xl rounded-lg flex flex-col items-center overflow-hidden border-2 border-zinc-900">

            <Key className='md:w-[5vw] md:h-[5vw] w-[8vh] h-[8vh] text-prime '/>

            <p className='text-[1.5vh] md:text-[1vw] text-zinc-400 leading-none text-center mt-1'>Your password reset successfully</p>

            
            <p className="md:text-[1vw] text-[1.7vh] text-zinc-300 mt-3 ">Back to <Link href="/login" className='text-prime cursor-pointer hover:underline'>Login</Link></p>
        </div>
       )} 

    </div>
  )
}

export default page