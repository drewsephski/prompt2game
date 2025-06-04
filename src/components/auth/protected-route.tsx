
import { useUser } from '@clerk/clerk-react';
import { AuthPage } from './auth-page';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0CF2A0]"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <AuthPage />;
  }

  return <>{children}</>;
}
