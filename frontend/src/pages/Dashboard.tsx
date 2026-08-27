import { useAuth, useUser } from '@clerk/clerk-react'
import { ChevronRight, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import DayProgram, { type DietPlan, type WorkoutPlan } from '../components/Feature/DayProgram'
import { getUserDietPlan, getUserPrograms } from '../utils/getRequest'

const Dashboard = () => {
  const { getToken } = useAuth()
  const { user } = useUser()
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>()
  const [dietPlan, setDietPlan] = useState<DietPlan>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const query = { status: 'active' }

    Promise.all([
      getUserPrograms(controller.signal, getToken, query),
      getUserDietPlan(controller.signal, getToken, query),
    ]).then(([workoutResult, dietResult]) => {
      setWorkoutPlan(workoutResult?.result?.[0] as WorkoutPlan | undefined)
      setDietPlan(dietResult?.result?.[0] as DietPlan | undefined)
    }).catch((error) => {
      if (error.name !== 'AbortError') console.error(error)
    }).finally(() => setTimeout(()=>{setIsLoading(false)},100))

    return () => controller.abort()
  }, [getToken])

  return (
    <div className="fitness-shell app-shell min-h-auto!">
      <div className="bg-grid" />
      <main className="container-shell dashboard-layout">
        {isLoading && <div className="flex min-h-64 items-center justify-center" role="status" aria-label="Loading dashboard">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-300" />
        </div>}
        {!isLoading && !workoutPlan && !dietPlan && <div className="flex items-center justify-center"><section className="welcome-panel flex-col border glass-panel">
          <div>
            <span className="eyebrow-badge">Hey There, {user?.firstName ?? 'athlete'}</span>
            <h1>Let&apos;s build your next win.</h1>
          </div>
          <Link to="/generate" className="primary-action compact">
            Generate workout
            <ChevronRight className="h-4 w-4" />
          </Link>
        </section></div>}
        {!isLoading && (workoutPlan || dietPlan) && <DayProgram workoutPlan={workoutPlan} dietPlan={dietPlan} />}
      </main>
    </div>
  )
}

export default Dashboard
