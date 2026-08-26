import { useAuth, useUser } from '@clerk/clerk-react'
import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import DayProgram, { type DietPlan, type WorkoutPlan } from '../components/Feature/DayProgram'
import { getUserDietPlan, getUserPrograms } from '../utils/getRequest'

const Dashboard = () => {
  const { getToken } = useAuth()
  const { user } = useUser()
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>()
  const [dietPlan, setDietPlan] = useState<DietPlan>()

  useEffect(() => {
    const controller = new AbortController()
    const query = { status: 'active' }

    Promise.all([
      getUserPrograms(controller.signal, getToken, query),
      getUserDietPlan(controller.signal, getToken, query),
    ]).then(([workoutResult, dietResult]) => {
      setWorkoutPlan(workoutResult?.clerkUserId?.[0] as WorkoutPlan | undefined)
      setDietPlan(dietResult?.clerkUserId?.[0] as DietPlan | undefined)
    }).catch((error) => {
      if (error.name !== 'AbortError') console.error(error)
    })

    return () => controller.abort()
  }, [getToken])

  return (
    <div className="fitness-shell app-shell min-h-auto!">
      <div className="bg-grid" />
      <main className="container-shell dashboard-layout">
        {!workoutPlan && !dietPlan && <div className="flex items-center justify-center"><section className="welcome-panel flex-col border glass-panel">
          <div>
            <span className="eyebrow-badge">Hey There, {user?.firstName ?? 'athlete'}</span>
            <h1>Let&apos;s build your next win.</h1>
          </div>
          <Link to="/generate" className="primary-action compact">
            Generate workout
            <ChevronRight className="h-4 w-4" />
          </Link>
        </section></div>}
        {(workoutPlan || dietPlan) && <DayProgram workoutPlan={workoutPlan} dietPlan={dietPlan} />}
      </main>
    </div>
  )
}

export default Dashboard
