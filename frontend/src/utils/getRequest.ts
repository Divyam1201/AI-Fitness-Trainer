const baseURL = " http://localhost:3000"

interface PlanResponse {
    result?: Array<Record<string, unknown>>
}

export interface UserData {
    age?: number
    name?: string
    gender?: 'Male' | 'Female' | 'Other'
    height?: string
    weight?: string
    activityLevel?: string
    fitnessGoal?: string
    fitnessLevel?: string
    dietaryPreference?: string
    mealsPerDay?: number
    medicalConditions?: string
    allergiesOrRestrictions?: string
    gymDaysPerWeek?: number
    preferredWorkoutType?: 'Strength Training' | 'Cardio' | 'Mixed' | 'Flexibility/Mobility'
}

export interface UserResponse {
    userData?: UserData
}

async function getPlan(signal:AbortSignal,userToken:() => Promise<string | null>,endpoint:string,queryOpts?:Record<string, string>):Promise<PlanResponse>{
    const token = await userToken()
    if (!token) throw new Error('Authentication token unavailable')

    const queryString = queryOpts ? new URLSearchParams(queryOpts).toString() : ''
    try {
        const url = `${baseURL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`
        const result = await fetch(url,{signal,headers:{
            Authorization:`Bearer ${token}`
        }})
        if (!result.ok) throw new Error(`Request failed with status ${result.status}`)
        const data = await result.json() as PlanResponse
        return data
    } catch (err:unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          console.log('Fetch successfully aborted');
                    return {}
        } else {
            console.log(err)
                        throw err
        }
    }
}

const getUserPrograms = (signal:AbortSignal,userToken:() => Promise<string | null>,queryOpts?:Record<string, string>) => getPlan(signal,userToken,'exercisePlan',queryOpts)
const getUserDietPlan = (signal:AbortSignal,userToken:() => Promise<string | null>,queryOpts?:Record<string, string>) => getPlan(signal,userToken,'dietPlan',queryOpts)

const requestUser = async (
    signal: AbortSignal,
    userToken: () => Promise<string | null>,
    method: 'GET' | 'PUT' ,
    userData?: UserData,
): Promise<UserResponse> => {
    const token = await userToken()
    if (!token) throw new Error('Authentication token unavailable')

    const result = await fetch(`${baseURL}/api/user`, {
        method,
        signal,
        headers: {
            Authorization: `Bearer ${token}`,
            ...(userData ? { 'Content-Type': 'application/json' } : {}),
        },
        ...(userData ? { body: JSON.stringify({ userData }) } : {}),
    })
    if (!result.ok) throw new Error(`User request failed with status ${result.status}`)
    return await result.json()
}

export interface GenerateProgramRequest {
    goal: string
    experience: string
    sessionLength: string
    equipment: string
}

export interface GenerateProgramResponse {
    message: string
    [key: string]: unknown
}

const generateProgram = async (
    signal: AbortSignal,
    userToken: () => Promise<string | null>,
    programData: GenerateProgramRequest,
): Promise<GenerateProgramResponse> => {
    const token = await userToken()
    if (!token) throw new Error('Authentication token unavailable')

    const result = await fetch(`${baseURL}/api/ai`, {
        method: 'POST',
        signal,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(programData),
    })
    if (!result.ok) throw new Error(`Generate program request failed with status ${result.status}`)
    return await result.json()
}

export { getUserPrograms, getUserDietPlan, requestUser, generateProgram }