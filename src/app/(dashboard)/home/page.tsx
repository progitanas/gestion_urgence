
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthMock } from '@/context/auth-context-mock';

export default function DashboardHomePage() {
  const { user, isLoading } = useAuthMock();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Wait for auth state to load

    if (!user) {
      router.replace('/login');
      return;
    }

    switch (user.role) {
      case 'patient':
        router.replace('/patient'); // Changed from /dashboard/patient
        break;
      case 'doctor':
        router.replace('/doctor'); // Changed from /dashboard/doctor
        break;
      case 'staff':
        router.replace('/staff'); // Changed from /dashboard/staff
        break;
      default:
        router.replace('/login'); // Fallback if role is unknown or null
    }
  }, [user, isLoading, router]);

  // Optional: Display a loading state while redirecting or checking auth
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
    </div>
  );
}
