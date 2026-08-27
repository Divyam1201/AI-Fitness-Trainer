import { useAuth, useUser } from '@clerk/clerk-react'
import { Flame, HeartPulse, Loader2, Save, Target } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import DayProgram, { type DietPlan, type WorkoutPlan } from '../components/Feature/DayProgram'
import { type UserData, getUserDietPlan, getUserPrograms, requestUser } from '../utils/getRequest'

type PlanSummary = Record<string, unknown> & { _id?: string; status?: string; splitName?: string; planName?: string; name?: string }
type PlanKind = 'Exercise' | 'Diet'

const fields: Array<{ key: keyof UserData; label: string; type?: string }> = [
  { key: 'name', label: 'Name' }, { key: 'age', label: 'Age', type: 'number' },
  { key: 'height', label: 'Height' }, { key: 'weight', label: 'Weight' },
  { key: 'activityLevel', label: 'Activity level' }, { key: 'fitnessGoal', label: 'Fitness goal' },
  { key: 'fitnessLevel', label: 'Fitness level' }, { key: 'dietaryPreference', label: 'Dietary preference' },
  { key: 'mealsPerDay', label: 'Meals per day', type: 'number' },
  { key: 'medicalConditions', label: 'Medical conditions' }, { key: 'allergiesOrRestrictions', label: 'Allergies or restrictions' },
  { key: 'gymDaysPerWeek', label: 'Gym days per week', type: 'number' },
]

const selectOptions: Partial<Record<keyof UserData, string[]>> = {
  gender: ['Male', 'Female', 'Other'], activityLevel: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'],
  fitnessGoal: ['Build strength', 'Lose fat', 'Gain lean muscle', 'Improve conditioning'],
  fitnessLevel: ['Beginner', 'Intermediate', 'Advanced'], dietaryPreference: ['No preference', 'Vegetarian', 'Vegan', 'Non-Vegetarian'],
  preferredWorkoutType: ['Strength Training', 'Cardio', 'Mixed', 'Flexibility/Mobility'],
}

const displayValue = (value: unknown) => value === undefined || value === null || value === '' ? ' -' : String(value)

const planTitle = (plan: PlanSummary) => String(plan.splitName ?? plan.planName ?? plan.name ?? 'Fitness plan')

const PlanPicker = ({ plans, selectedPlan, onSelect, kind }: { plans: PlanSummary[]; selectedPlan?: PlanSummary; onSelect: (plan: PlanSummary) => void; kind: PlanKind }) => (
  <div className="profile-plan-picker">
    {plans.length === 0 && <p className="muted-copy">No {kind.toLowerCase()} plans found.</p>}
    {plans.map((plan, index) => {
      const isSelected = plan === selectedPlan
      const isActive = plan.status?.toLowerCase() === 'active'
      return <button type="button" key={String(plan._id ?? index)} className={`profile-plan-option${isSelected ? ' selected' : ''}${isActive ? ' active' : ''}`} onClick={() => onSelect(plan)}><span>{planTitle(plan)}</span><small>{isActive ? 'active' : 'inactive'}</small></button>
    })}
  </div>
)

const selectActiveAsFirstIndex = (orgArr:[])=>{
  const dateViseArr = orgArr.sort((a:any,b:any)=>a.createdAt - b.createdAt)
  // @ts-ignore 
  const activeObjIndex =  dateViseArr.findIndex(item=>item.status==="active")
  if (activeObjIndex === -1) {
  return dateViseArr; 
}
  const activeObj = dateViseArr.splice(activeObjIndex,1)
  return [...activeObj,...dateViseArr]
}

const Profile = () => {
  const { getToken } = useAuth()
  const { user } = useUser()
  const [userData, setUserData] = useState<UserData>({name:user?.fullName||user?.firstName||""})
  const [exercisePlans, setExercisePlans] = useState<PlanSummary[]>([])
  const [dietPlans, setDietPlans] = useState<PlanSummary[]>([])
  const [selectedKind, setSelectedKind] = useState<PlanKind>('Exercise')
  const [selectedExercisePlan, setSelectedExercisePlan] = useState<PlanSummary>()
  const [selectedDietPlan, setSelectedDietPlan] = useState<PlanSummary>()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    Promise.all([
      requestUser(controller.signal, getToken, 'GET'),
      getUserPrograms(controller.signal, getToken),
      getUserDietPlan(controller.signal, getToken),
    ]).then(([userResult, exerciseResult, dietResult]:[userResult:any, exerciseResult:any, dietResult:any]) => {

      const loadedData = userResult.result[0].userData ?? {}
      setUserData({name:loadedData.name||user?.fullName||"",...loadedData})
      exerciseResult = exerciseResult.result.length>1?
          exerciseResult = selectActiveAsFirstIndex(exerciseResult.result):
                   exerciseResult.result?? [] as PlanSummary[]
dietResult = dietResult.result.length>1?
           selectActiveAsFirstIndex(dietResult.result):
                   dietResult.result?? [] as PlanSummary[]

      setExercisePlans(exerciseResult)
      setDietPlans(dietResult)
      setSelectedExercisePlan((exerciseResult ?? [])[0] as PlanSummary | undefined)
      setSelectedDietPlan((dietResult ?? [])[0] as PlanSummary | undefined)
    }).catch((error) => {
      console.log(error)
      if (error.name !== 'AbortError') setMessage('Unable to load your profile right now.')
    }).finally(() => setIsLoading(false))
    return () => controller.abort()
  }, [getToken])

  const updateField = (key: keyof UserData, value: string) => {
    setUserData((current) => ({ ...current, [key]: value === '' ? undefined : fields.find((field) => field.key === key)?.type === 'number' ? Number(value) : value }))
  }

  const saveProfile = async () => {
    setIsSaving(true)
    setMessage(null)
    try {
      await requestUser(new AbortController().signal, getToken, 'PUT', userData)
      setMessage('Profile saved.')
    } catch {
      setMessage('Unable to save your profile right now.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-auto relative overflow-hidden text-[#edf6ff]">
      <div className="absolute inset-0 pointer-events-none bg-grid" />
      <main className="container-shell profile-layout">
        {isLoading && <div className="profile-loading" role="status" aria-label="Loading profile"><Loader2 className="h-8 w-8 animate-spin text-cyan-300" /></div>}
        {!isLoading && <><div className='block md:grid grid-cols-[3fr_1fr] gap-3 w-full'>
        <div className="glass-panel profile-overview mb-2">
          <div className="flex items-center gap-4">
            <div className="avatar-ring">{userData.name?.charAt(0)?.toUpperCase() ?? user?.firstName?.charAt(0)?.toUpperCase() ?? 'A'}</div>
            <div>
              <p className="text-sm uppercase tracking-wide text-sky-200">Athlete profile</p>
              {/* <h2 className="text-2xl font-semibold">{displayValue(userData.name ?? user?.fullName)}</h2> */}
            </div>
          </div>

          <div className="field-grid">
            {fields.map(({ key, label, type }) => <label key={key}>{label}
              {selectOptions[key] ? <select value={String(userData[key] ?? '')} onChange={(event) => updateField(key, event.target.value)}><option value=""> -</option>{selectOptions[key]?.map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input type={type ?? 'text'} value={String(userData[key] ?? '')} placeholder=" -" onChange={(event) => updateField(key, event.target.value)} />}
            </label>)}
            <label>Gender<select value={userData.gender ?? ''} onChange={(event) => updateField('gender', event.target.value)}><option value=""> -</option>{selectOptions.gender?.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
            <label>Workout type<select value={userData.preferredWorkoutType ?? ''} onChange={(event) => updateField('preferredWorkoutType', event.target.value)}><option value=""> -</option>{selectOptions.preferredWorkoutType?.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
          </div>
          <div className="mt-6 flex items-center gap-3"><Button onClick={saveProfile} disabled={isSaving}>{isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save changes</Button>{message && <span className="text-sm text-slate-300" role="status">{message}</span>}</div>
        </div>
<div className='flex flex-col justify-center gap-3'>
        <div className="glass-panel goals-panel">
          <div>
            <p className="text-sm uppercase tracking-wide text-sky-200">Lifestyle</p>
            <h3 className="text-lg font-semibold">Current goals</h3>
          </div>

          <ul className="mt-4 space-y-3 text-slate-200"><li className="flex items-center gap-2"><Target className="h-4 w-4" /> {displayValue(userData.fitnessGoal)}</li><li className="flex items-center gap-2"><Flame className="h-4 w-4" /> {displayValue(userData.gymDaysPerWeek)} gym days per week</li><li className="flex items-center gap-2"><HeartPulse className="h-4 w-4" /> {displayValue(userData.medicalConditions?.toLowerCase()==="no"||userData.medicalConditions?.toLowerCase()==="none"?"Remember to take rest":userData.medicalConditions)}</li></ul>
        </div>
        <section className="profile-plans glass-panel rounded-2xl">
          <div className="panel-header"><div><p className="uppercase-label">Your programs</p><h2>Choose a plan to view</h2></div></div>
          <div className="profile-plan-tabs" role="tablist" aria-label="Plan type">
            <button type="button" role="tab" aria-selected={selectedKind === 'Exercise'} className={selectedKind === 'Exercise' ? 'selected' : ''} onClick={() => setSelectedKind('Exercise')}>Exercise plans</button>
            <button type="button" role="tab" aria-selected={selectedKind === 'Diet'} className={selectedKind === 'Diet' ? 'selected' : ''} onClick={() => setSelectedKind('Diet')}>Diet plans</button>
          </div>
          {selectedKind === 'Exercise' ? <PlanPicker plans={exercisePlans} selectedPlan={selectedExercisePlan} onSelect={setSelectedExercisePlan} kind="Exercise" /> : <PlanPicker plans={dietPlans} selectedPlan={selectedDietPlan} onSelect={setSelectedDietPlan} kind="Diet" />}
        </section>
        </div>
        </div>
        {selectedKind === 'Exercise' && selectedExercisePlan && <DayProgram mode="workout" workoutPlan={selectedExercisePlan as WorkoutPlan} />}
        {selectedKind === 'Diet' && selectedDietPlan && <DayProgram mode="diet" dietPlan={selectedDietPlan as DietPlan} />}
        </>}
      </main>
    </div>
  )
}

export default Profile
