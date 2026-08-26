const basehostedURL = import.meta.env.VITE_API_URL

interface PlanResponse {
    clerkUserId?: Array<Record<string, unknown>>
}

async function getPlan(signal:AbortSignal,userToken:() => Promise<string | null>,endpoint:string,queryOpts?:Record<string, string>):Promise<PlanResponse>{
    const token = await userToken()
    if (!token) throw new Error('Authentication token unavailable')

    const queryString = new URLSearchParams(queryOpts).toString()
    try {
        const result = await fetch(`${basehostedURL}/api/${endpoint}?${queryString}`,{signal,headers:{
            Authorization:`Bearer ${token}`
        }})
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

export { getUserPrograms, getUserDietPlan }