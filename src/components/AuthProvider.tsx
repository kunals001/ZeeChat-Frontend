"use client"
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import Loading from './Layouts/Loading';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth ) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading/>
      </div>
    );
  }

  return <>{children}</>;
};