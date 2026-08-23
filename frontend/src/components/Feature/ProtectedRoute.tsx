import { type ReactNode } from 'react'
import { Navigate } from 'react-router';
import {
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/signin" replace />
      </SignedOut>
    </>
  )
}


export default ProtectedRoute
