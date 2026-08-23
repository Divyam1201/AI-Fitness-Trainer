import { useUser } from "@clerk/clerk-react"
import {  Flame, HeartPulse, Target } from "lucide-react"

const Profile = () => {
  
  const { user } = useUser()

  return (
    <div className="min-h-screen relative overflow-hidden text-[#edf6ff]">
      <div className="absolute inset-0 pointer-events-none bg-grid" />
      <main className="max-w-[1200px] w-full px-4 mx-auto py-8 grid md:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="p-6 rounded-xl bg-[rgba(15,23,42,0.74)] border border-[rgba(148,163,184,0.18)]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-300/20 to-cyan-300/10 flex items-center justify-center text-white font-bold">{user?.firstName?.charAt(0)?.toUpperCase() ?? 'A'}</div>
            <div>
              <p className="text-sm uppercase tracking-wide text-sky-200">Athlete profile</p>
              <h2 className="text-2xl font-semibold">{user?.fullName ?? 'Alex Morgan'}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-3 bg-[rgba(15,23,42,0.6)] rounded-lg">
              <span className="text-sm text-slate-300">Age</span>
              <strong className="block">29</strong>
            </div>
            <div className="p-3 bg-[rgba(15,23,42,0.6)] rounded-lg">
              <span className="text-sm text-slate-300">Height</span>
              <strong className="block">5'10"</strong>
            </div>
            <div className="p-3 bg-[rgba(15,23,42,0.6)] rounded-lg">
              <span className="text-sm text-slate-300">Weight</span>
              <strong className="block">162 lb</strong>
            </div>
            <div className="p-3 bg-[rgba(15,23,42,0.6)] rounded-lg">
              <span className="text-sm text-slate-300">Goal</span>
              <strong className="block">Lean bulk</strong>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[rgba(15,23,42,0.74)] border border-[rgba(148,163,184,0.18)]">
          <div>
            <p className="text-sm uppercase tracking-wide text-sky-200">Lifestyle</p>
            <h3 className="text-lg font-semibold">Current goals</h3>
          </div>

          <ul className="mt-4 space-y-3 text-slate-200">
            <li className="flex items-center gap-2"><Target className="h-4 w-4" /> Add 8 lb of lean muscle</li>
            <li className="flex items-center gap-2"><Flame className="h-4 w-4" /> Maintain 3-4 high-intensity sessions</li>
            <li className="flex items-center gap-2"><HeartPulse className="h-4 w-4" /> Prioritize sleep and recovery</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Profile
