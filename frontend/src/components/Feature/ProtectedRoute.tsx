import { type ReactNode } from 'react'
import { Navigate } from 'react-router';
import {
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react'
import AppNavbar from './AppNavbar';
import Footer from './Footer';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

  return (
    <>
     <SignedIn>
  <div className="h-screen flex flex-col">
    <div className='bg-grid inset'></div>
    <div className=' max-h-max'>
    <AppNavbar />
    </div>
    <main className="overflow-y-scroll h-[85vh]">
      {children}
    </main>
    <div className='flex items-start h-[15vh]'>
    <Footer />
    </div>
  </div>
</SignedIn>
      <SignedOut>
        <Navigate to="/signin" replace />
      </SignedOut>
    </>
  )
}


export default ProtectedRoute
