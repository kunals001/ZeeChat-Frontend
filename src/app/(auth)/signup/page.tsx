"use client"
import Input from "@/components/Layouts/Input"
import {Mail, User,Lock, User2,Loader} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Link from "next/link";



const page = () => {
    const [submited, setSubmitting] = useState(false);
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [code, setCode] = useState("");

    const router = useRouter();

    const {signup, verifyEmail, isLoading, error} = useAuthStore();

    const handelSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try { 
          
          await signup({fullName:name, userName, email, password, gender});
          setSubmitting(true);
        } catch (error) {
          
        }
    }

    const handelVerify = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try { 
        await verifyEmail({code});
        router.push("/");
      } catch (error) {
        
      }
    }

  return (
    <div className='w-full md:h-[calc(100vh-4vw)] h-[calc(100vh-6vh)] md:px-[3vw] px-[1vh] flex items-center justify-center'>

    {!submited ? (
          <div className="md:w-[30vw] relative w-full md:p-[1vw] p-[1vh] md:rounded-xl rounded-lg flex flex-col items-center overflow-hidden border-2 border-zinc-900">
          
            <h1 className='md:text-[2vw] text-[3.3vh] font-prime text-transparent bg-clip-text bg-gradient-to-r from-prime to-second font-bold md:pt-4 pt-3 select-none'>Signup</h1>

            <form onSubmit={handelSubmit} className="w-full md:mt-2 mt-3">
              <Input type="text" placeholder="FullName" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} icon={User}/>

              <Input type="username" placeholder="UserName" value={userName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} icon={User2}/>

              <Input type="email" placeholder="Your Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} icon={Mail}/>

              <Input type="password" placeholder="Enter Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} icon={Lock}/>

              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-full bg-zinc-900 border border-zinc-700 text-white md:pl-[2vw] pl-[4.5vh] outline-none cursor-pointer">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 text-white border-none cursor-pointer">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Others</SelectItem>
                </SelectContent>
              </Select>

              <Link href={"/forgot-password"}><p className="md:text-[.8vw] text-[1vh] text-zinc-500 cursor-pointer hover:underline mt-1">Forgot password?</p></Link>

              {error && (
                <p className='md:text-[1vw] text-[1.5vh] text-red-600 font-semibold mt-2'>{error}</p>
              )}

              <button aria-label="signup" type="submit" disabled={isLoading} className="w-full bg-prime text-white md:mt-4 mt-3 md:py-[.2vw] py-[.5vh] md:text-[1.3vw] text-[2.5vh] font-semibold rounded-lg cursor-pointer">
                {isLoading ? <Loader className="animate-spin mx-auto"/> : "Signup"}
              </button>
            </form>

            <p className="md:text-[1vw] text-[1.7vh] text-zinc-300 mt-3 ">Already have an account? <Link href="/login" className='text-prime cursor-pointer hover:underline'>Login</Link></p>
        </div>
    ) : (
      <div className="md:w-[30vw] relative w-full md:p-[1vw] p-[1vh] md:rounded-xl rounded-lg flex flex-col items-center overflow-hidden border-2 border-zinc-900 transition-all ease-in-out dura">

        <h1 className='md:text-[2vw] text-[3.3vh] font-prime text-transparent bg-clip-text bg-gradient-to-r from-prime to-second font-bold md:pt-4 pt-3 select-none'>Verify Email</h1>

        <form onSubmit={handelVerify} className="w-full md:mt-2 mt-3">

          <div className="w-full flex items-center justify-center">

          <InputOTP maxLength={6} value={code} onChange={setCode} className="">
            <InputOTPGroup className="text-white">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator className="text-white"/>
            <InputOTPGroup className="text-white">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          </div>

          {error && (
            <p className='md:text-[1vw] text-[1.5vh] text-red-600 font-semibold mt-2'>{error}</p>
          )}

          <button aria-label="signup" type="submit" disabled={isLoading} className="w-full bg-prime text-white md:mt-4 mt-3 md:py-[.2vw] py-[.5vh] md:text-[1.3vw] text-[2.5vh] font-semibold rounded-lg cursor-pointer">
                {isLoading ? <Loader className="animate-spin mx-auto"/> : "Verify Email"}
          </button>
        </form>

      </div>
    )}

       

    </div>
  )
}

export default page