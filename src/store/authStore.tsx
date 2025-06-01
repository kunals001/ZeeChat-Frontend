import {create} from 'zustand'
import axios from 'axios'

axios.defaults.withCredentials = true;

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export type User = {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  password?: string; 
  gender: "male" | "female" | "other";
  profilePic?: string | Blob;
  bio?: string;
  followers: string[]; // ObjectId as strings
  following: string[];
  followRequests: string[];
  verifyToken?: string;
  verifyTokenExpiry?: string;
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpiry?: string;
  isOnline: boolean;
  createdAt: string;
  updatedAt: string;
};


interface UpdateUserResponse {
  success?: boolean;
  message?: string;
}

type AuthState={
    user:User|null;
    isLoading:boolean;
    error:string|null;
    isAuthenticated:boolean;
    isCheckingAuth: boolean;
    signup:(data:{
        fullName: string;
        userName: string;
        email: string;
        password: string;
        gender: string;
    })=>Promise<void>;
    verifyEmail: (data:{code:string}) => Promise<any>;
    login:(data:{email:string,password:string})=>Promise<void>;
    logout:()=>Promise<void>;
    forgotpassword:(data:{email:string})=>Promise<void>;
    resetpassword:(data:{password:string,token:string})=>Promise<void>;
    checkAuth:()=>Promise<void>;
    updateUser:(data:{profilePic:Blob | string,bio:string,fullName:string,userName:string})=>Promise<void | UpdateUserResponse>;
   
    
}

export const useAuthStore=create<AuthState>((set, get) => ({
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    isCheckingAuth: false,

    signup:async({fullName, userName, email, password, gender})=>{
        set({ isLoading: true, error: null, isAuthenticated: false })

        try {
            const response = await axios.post(`${API_URL}/api/auth/register`, {fullName, userName, email, password, gender});

            set({ user: response.data, isLoading: false, isAuthenticated: false, error: null });

        } catch (error:any) {
            const msg =error?.response?.data?.message || "Signup failed"; 
            set({ error: msg, isLoading: false });
            throw new Error(msg);
        }
    },
    verifyEmail: async({code})=>{
    set({isLoading:true,error:null,isAuthenticated:false})
    try {
        const response = await axios.post(`${API_URL}/api/auth/verify-email`,{
            code
        })
        set({user:response.data.user, isAuthenticated:true, isLoading:false})
        return response.data
    } catch (error: any) {
      const msg =error?.response?.data?.message || "verifyEmail failed"; 
      set({ error: msg, isLoading: false });
      throw new Error(msg); // throw so that frontend can catch
    }
    },
    login: async({email,password})=>{
        set({isLoading:true,error:null,isAuthenticated:false})
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`,{
                email,
                password
            })
            set({user:response.data.user, isAuthenticated:true, isLoading:false})
            return response.data
        } catch (error: any) {
          const msg =error?.response?.data?.message || "Login failed"; 
          set({ error: msg, isLoading: false });
          throw new Error(msg); // throw so that frontend can catch
        }
    },
    logout: async()=>{
        set({isLoading:true,error:null,isAuthenticated:false})
        try {
            const response = await axios.post(`${API_URL}/api/auth/logout`)
            set({user:null, isAuthenticated:false, isLoading:false})
            return response.data
        } catch (error: any) {
          const msg =error?.response?.data?.message || "Logout failed"; 
          set({ error: msg, isLoading: false });
          Error(msg); // throw so that frontend can catch
        }
    },

    forgotpassword: async({email})=>{
        set({isLoading:true,error:null,isAuthenticated:false})
        try {
            const response = await axios.post(`${API_URL}/api/auth/forgot-password`,{
                email
            })
            set({user:response.data.user, isAuthenticated:false, isLoading:false})
            return response.data
        } catch (error: any) {
          const msg =error?.response?.data?.message || "forgotPassword failed"; 
          set({ error: msg, isLoading: false });
          throw new Error(msg); // throw so that frontend can catch
        }
    },

    resetpassword: async({password,token})=>{
        set({isLoading:true,error:null,isAuthenticated:false})
        try {
            const response = await axios.post(`${API_URL}/api/auth/reset-password/${token}`,{
                password,
            })
            set({user:response.data.user, isAuthenticated:false, isLoading:false})
            return response.data
        } catch (error: any) {
          const msg =error?.response?.data?.message || "resetPassword failed"; 
          set({ error: msg, isLoading: false });
          throw new Error(msg); // throw so that frontend can catch
        }
    },

    checkAuth: async()=>{
        set({isCheckingAuth:true})
        try {
            const response = await axios.get(`${API_URL}/api/auth/check-auth`)
            set({user:response.data.user, isAuthenticated:true, isCheckingAuth:false})
            return response.data
        } catch (error: any) {
          const msg =error?.response?.data?.message || "checkAuth failed"; 
          set({ error: msg, isCheckingAuth: false });
          Error(msg);
        }
    },

    updateUser: async({profilePic,bio,fullName,userName})=>{
        set({isLoading:true,error:null,isAuthenticated:true})
        try {
            const response = await axios.put(`${API_URL}/api/user/update-profile`,{
                profilePic,
                bio,
                fullName,
                userName
            })
            set({user:response.data.user, isAuthenticated:true, isLoading:false})
            return response.data
        } catch (error: any) {
          const msg =error?.response?.data?.message || "updateUser failed"; 
          set({ error: msg, isLoading: false });
          Error(msg);
        }
    }
}))