import { Dumbbell } from 'lucide-react'
import {
  SignUp,
} from '@clerk/clerk-react'

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-[#edf6ff] p-2 md:p-6">
      <div className=' bg-grid inset'/>
      <div className="w-full md:max-w-md p-2 md:p-6 rounded-xl bg-[rgba(15,23,42,0.74)] border border-[rgba(148,163,184,0.18)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-sky-300/20 to-cyan-300/10">
            <Dumbbell className="h-4 w-4" />
          </div>
          <span className="font-semibold">FitFlow AI</span>
        </div>
        <div className='flex justify-center'>
          <SignUp routing="path" path="/signup" signInUrl="/signin" fallbackRedirectUrl="/dashboard" />

        </div>
      </div>
    </div>
  )
}


export default SignUpPage
