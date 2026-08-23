import { Dumbbell } from 'lucide-react'
import {
  SignUp,
} from '@clerk/clerk-react'

const SignUpPage = () => {
  return (
    <div className="auth-shell">
      <div className="auth-card glass-panel">
        <div className="auth-brand">
          <div className="brand-icon">
            <Dumbbell className="h-4 w-4" />
          </div>
          <span>FitFlow AI</span>
        </div>
        <div className='flex w-full justify-center'>
        <SignUp routing="path" path="/signup" signInUrl="/signin" fallbackRedirectUrl="/dashboard" />

        </div>
      </div>
    </div>
  )
}


export default SignUpPage
