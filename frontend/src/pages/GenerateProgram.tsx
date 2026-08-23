import { useState, useEffect, useRef } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Label } from '../components/ui/label'
import { useUser } from '@clerk/clerk-react'
import { CalendarCheck2, Sparkles, Mic, MicOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import * as VapiModule from '@vapi-ai/web'
import { cn } from '@/lib/utils'


const GenerateProgram = () => {
  const { user } = useUser()
  const [isCallActive, setIsCallActive] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [callError, setCallError] = useState<string | null>(null)
  const vapiClientRef = useRef<any>(null)
  // @ts-ignore 
  const Vapi = VapiModule.default.default
  // Initialize VAPI client
  useEffect(() => {
    const apiKey = import.meta.env.VITE_VAPI_API_KEY
    console.log(apiKey)
    if (!apiKey) {
      console.warn('VAPI API key not configured. Please set VITE_VAPI_API_KEY in .env')
      return
    }
const client = new Vapi(apiKey)
    vapiClientRef.current = client

    // Event listeners for call status
    client.on('call-start', () => {
      setIsCallActive(true)
      setIsConnecting(false)
      setCallError(null)
    })

    client.on('call-end', () => {
      setIsCallActive(false)
      setIsConnecting(false)
      setCallError(null)
    })

    client.on('error', (error: Error) => {
      console.error('VAPI error:', error)
      setCallError(error?.message || 'Failed to connect to assistant')
      setIsConnecting(false)
      setIsCallActive(false)
    })

    return () => {
      client.stop()
    }
  }, [])

  const handleStartCall = async () => {
    if (!vapiClientRef.current || !user) return

    setIsConnecting(true)
    setCallError(null)

    try {
      // Get the assistant ID from environment variable
      const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID

      // Start the call with user's name as a variable
      await vapiClientRef.current.start(assistantId, {
        variableValues: {
          userName: user.fullName || user.firstName || 'there',
          userEmail: user.primaryEmailAddress?.emailAddress || '',
        },
      })
    } catch (error) {
      console.error('Failed to start VAPI call:', error)
      setCallError(error instanceof Error ? error.message : 'Failed to start call')
      setIsConnecting(false)
    }
  }

  const handleEndCall = () => {
    if (vapiClientRef.current) {
      vapiClientRef.current.stop()
    }
  }

  const programs = [
    'Strength foundation',
    'Fat-loss accelerator',
    'Lean muscle builder',
    'Athletic conditioning',
  ]

  const userName = user?.fullName || user?.firstName || 'Athlete'

  return (
    <div className="fitness-shell app-shell">
      <div className="bg-grid" />

      <main className="container-shell generate-layout">
        <Card className="form-panel">
          <CardHeader>
            <CardTitle>Generate a fitness program</CardTitle>
            <CardDescription>Build a plan tailored to your goals and equipment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Main goal</Label>
                <Select defaultValue="strength">
                  <SelectTrigger className='text-xs md:text-sm'>
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strength">Build strength</SelectItem>
                    <SelectItem value="fat-loss">Lose fat</SelectItem>
                    <SelectItem value="muscle">Gain lean muscle</SelectItem>
                    <SelectItem value="conditioning">Improve conditioning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Experience</Label>
                <Select defaultValue="intermediate">
                  <SelectTrigger className='text-xs md:text-sm'>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Session length</Label>
                <Select defaultValue="45">
                  <SelectTrigger className='text-xs md:text-sm'>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="45">45 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                    <SelectItem value="75">75 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Equipment</Label>
                <Select defaultValue="home">
                  <SelectTrigger className='text-xs md:text-sm'>
                    <SelectValue placeholder="Select equipment"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home gym</SelectItem>
                    <SelectItem value="full-gym">Full gym</SelectItem>
                    <SelectItem value="bodyweight">Bodyweight only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full" type="button">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate program
            </Button>
          </CardContent>
        </Card>
        <div className='flex flex-col md:flex-row'>
<div className='flex md:flex-col items-center justify-center gap-5'>
  {/* <hr className='w-20 md:rotate-90'></hr>
   */}
  <p className='flex m-2'>or</p>
  {/* <hr className='w-20 md:rotate-90 '></hr> */}
</div>
        <Card className="program-preview">
          <CardHeader>
            <CardTitle>Program preview</CardTitle>
            <CardDescription>Smart output</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">4-week strength phase</span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full">AI generated</span>
              </div>

              <ul className="space-y-2">
                {programs.map((program) => (
                  <li key={program} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarCheck2 className="h-4 w-4" />
                    {program}
                  </li>
                ))}
              </ul>
            </div>

            {/* VAPI AI Assistant Section */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">AI Fitness Coach</h4>
                  <p className="text-sm text-muted-foreground">Talk to your personal assistant about your program</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
                Hey {userName}, ready to customize your workout?
              </p>

              <Button
                className={cn(
                  'w-full gap-2',
                  isCallActive && 'bg-destructive hover:bg-destructive/90',
                  isConnecting && 'opacity-70'
                )}
                onClick={isCallActive ? handleEndCall : handleStartCall}
                disabled={isConnecting}
                type="button"
              >
                {isConnecting && <Loader2 className="h-4 w-4 animate-spin" />}
                {!isConnecting && !isCallActive && <Mic className="h-4 w-4" />}
                {!isConnecting && isCallActive && <MicOff className="h-4 w-4" />}
                <span>
                  {isConnecting ? 'Connecting...' : isCallActive ? 'End Call' : 'Start Voice Call'}
                </span>
              </Button>

              {callError && (
                <div className="flex items-center gap-2 text-sm text-destructive p-3 bg-destructive/10 border border-destructive/20 rounded-lg" role="alert">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {callError}
                </div>
              )}

              {isCallActive && (
                <div className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 animate-pulse" />
                  <span>Call in progress — speak naturally</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        </div>
      </main>
    </div>
  )
}

export default GenerateProgram