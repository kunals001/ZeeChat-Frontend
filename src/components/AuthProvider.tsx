"use client"
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import Loading from './Layouts/Loading';
import { useRouter } from 'next/navigation';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { checkAuth, isCheckingAuth, isAuthenticated} = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

   useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isCheckingAuth, isAuthenticated, router]);

  if (isCheckingAuth ) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading/>
      </div>
    );
  }

  return <>{children}</>;
};