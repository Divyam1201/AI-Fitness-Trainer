import { SignIn } from '@clerk/clerk-react'
import { Dumbbell } from 'lucide-react'

const SignInPage = () => {
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
        <SignIn routing="path" path="/signin" signUpUrl="/signup" fallbackRedirectUrl="/dashboard" />

        </div>
      </div>
    </div>

  )
}

export default SignInPage
