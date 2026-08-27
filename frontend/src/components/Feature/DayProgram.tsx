import { CalendarDays, Clock3, Dumbbell, Utensils } from 'lucide-react'
import { useState } from 'react'

export interface WorkoutExercise {
  exerciseName: string
  sets: number
  reps: string
  restSeconds: number
}

export interface WorkoutFocus {
  focusMuscle: string
  exercise: WorkoutExercise[]
}

export interface WorkoutDay {
  day: string
  MuscleFocusDay: string
  items: WorkoutFocus[]
}

export interface WorkoutPlan {
  splitName?: string
  days?: WorkoutDay[]
  createdAt?: string
  updatedAt?: string
}

export interface DietItem {
  name: string
  calories: number
  proteinGm: number
  carbsGm: number
  fatsGm: number
  ingredients: string
}

export interface DietMeal {
  mealType: string
  items: DietItem[]
}

export interface DietDay {
  day: string
  dayMeals: DietMeal[]
}

export interface DietPlan {
  dailyCalorieTarget?: number
  macros?: {
    proteinGm?: number
    carbsGm?: number
    fatsGm?: number
  }
  meals?: DietDay[]
  createdAt?: string
  updatedAt?: string
}

interface DayProgramProps {
  workoutPlan?: WorkoutPlan
  dietPlan?: DietPlan
  mode?: 'workout' | 'diet'
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const formatDate = (value?: string) => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

const Metadata = ({ plan, label }: { plan?: WorkoutPlan | DietPlan; label: string }) => {
  const created = formatDate(plan?.createdAt)
  const updated = formatDate(plan?.updatedAt)
  const hasUpdate = plan?.createdAt && plan?.updatedAt && new Date(plan.createdAt).getTime() !== new Date(plan.updatedAt).getTime()

  if (!created && !updated) return null

  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
      {created && <span>{label} created at: {created}</span>}
      {hasUpdate && updated && <span>{label} updated at: {updated}</span>}
    </div>
  )
}

const DayProgram = ({ workoutPlan, dietPlan, mode }: DayProgramProps) => {
  const [selectedDay, setSelectedDay] = useState('Day 1')
  const workoutDay = workoutPlan?.days?.find((day) => day.day === selectedDay)
  const dietDay = dietPlan?.meals?.find((day) => day.day === selectedDay)
  const meals = dietDay?.dayMeals.flatMap((meal) => meal.items) ?? []
  const totalCalories = meals.reduce((total, meal) => total + (meal.calories || 0), 0)
  const totalProtein = meals.reduce((total, meal) => total + (meal.proteinGm || 0), 0)
  const displayCalories = dietPlan?.dailyCalorieTarget || totalCalories
  const displayProtein = dietPlan?.macros?.proteinGm || totalProtein

  return (
    <section className="day-program space-y-6 border p-2 rounded-2xl">
      <div className="glass-panel day-selector-panel rounded-2xl">
        <div className="panel-header ">
          <div>
            <p className="uppercase-label">Your week</p>
            <h3>Choose a training day</h3>
          </div>
          <CalendarDays className="h-5 w-5 text-cyan-300" />
        </div>
        <div className="day-selector" role="tablist" aria-label="Training days">
          {days.map((day, index) => {
            const dayKey = `Day ${index + 1}`
            const isSelected = selectedDay === dayKey
            return (
              <button
                key={dayKey}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`day-selector-button${isSelected ? ' selected' : ''}`}
                onClick={() => setSelectedDay(dayKey)}
              >
                <span>{day.slice(0, 3)}</span>
                <strong>{index + 1}</strong>
              </button>
            )
          })}
        </div>
      </div>

      <div className="stats-row">
        {mode !== 'workout' && <div className="glass-panel stat-card"><span>Daily calories</span><strong>{displayCalories.toLocaleString()}</strong><small>kcal target</small></div>}
        {mode !== 'workout' && <div className="glass-panel stat-card"><span>Protein target</span><strong>{displayProtein}g</strong><small>daily</small></div>}
        {mode !== 'diet' && <div className="glass-panel stat-card"><span>Workout</span><strong className="text-lg!">{workoutPlan?.splitName || 'Training plan'}</strong><small>{workoutDay?.MuscleFocusDay || 'Recovery session'}</small></div>}
      </div>

      <div className={`content-grid${mode ? ' single-plan-view' : ''}`}>
        {mode !== 'diet' && <div className="glass-panel plan-panel">
          <div className="panel-header">
            <div><p className="uppercase-label">{selectedDay}</p><h3>{workoutDay?.MuscleFocusDay || 'Workout details'}</h3></div>
            <Dumbbell className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="program-list">
            {workoutDay?.items?.map((focus) => (
              <div key={focus.focusMuscle} className="workout-group">
                <p className="uppercase-label">{focus.focusMuscle}</p>
                {focus.exercise.map((exercise) => (
                  <div key={exercise.exerciseName} className="program-row">
                    <strong>{exercise.exerciseName}</strong>
                    <span>{exercise.sets} sets x {exercise.reps}</span>
                    <small><Clock3 className="inline h-3.5 w-3.5" /> {exercise.restSeconds}s rest</small>
                  </div>
                ))}
              </div>
            )) || <p className="muted-copy">No workout was found for this day.</p>}
          </div>
          <Metadata plan={workoutPlan} label="Plan" />
        </div>}

        {mode !== 'workout' && <div className="glass-panel plan-panel">
          <div className="panel-header">
            <div><p className="uppercase-label">{selectedDay}</p><h3>Nutrition plan</h3></div>
            <Utensils className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="program-list">
            {dietDay?.dayMeals.map((meal) => (
              <div key={meal.mealType} className="meal-group">
                <p className="uppercase-label">{meal.mealType}</p>
                {meal.items.map((item) => (
                  <div key={item.name} className="meal-row">
                    <strong>{item.name}</strong>
                    <span>{item.calories} kcal · {item.proteinGm}g protein</span>
                    <small>{item.ingredients}</small>
                  </div>
                ))}
              </div>
            )) || <p className="muted-copy">No meals were found for this day.</p>}
          </div>
          <p className="nutrition-total">Day total: {totalCalories.toLocaleString()} kcal · {totalProtein}g protein</p>
          <Metadata plan={dietPlan} label="Plan" />
        </div>}
      </div>
    </section>
  )
}

export default DayProgram
