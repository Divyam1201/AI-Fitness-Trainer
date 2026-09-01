import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "../lib/env.js";

const googleGenAi = new GoogleGenerativeAI(ENV.GOOGLE_GEMINI_API)

export const generateDietAndWorkoutPlan = async(intakeData={
        age : 20,
        name: "N/A",
        gender: "Male",
        height: "167 cm",
        weight: "60 kg",
        fitnessGoal: "Lose Weight",
        mealsPerDay: 5,
        activityLevel: "Very Active",
        gymDaysPerWeek: 6,
        dietaryPreference: "Vegan",
        medicalConditions: "None",
        preferredWorkoutType: "Strength Training",
        allergiesOrRestrictions: "None"
      })=>{
    const googleGemini = googleGenAi.getGenerativeModel({model:"gemini-3.5-flash",})

    const prompt = `Given this user intake data: ${JSON.stringify(intakeData)}
  Generate a structured diet plan and workout schedule.Include the days of rest and recovery so generate a plan for full week but keep the exercise to the user given number of days.
  Respond ONLY with valid JSON matching this shape: { dietPlan: {
dailyCalorieTarget:number,
macros:{
   proteinGm:  Number, 
    carbsGm:  Number, 
    fatsGm:  Number, 
  },
    meals:[
      {
    day:  String, // e.g. "Day 1"
    dayMeals:[{
      mealType:  String, // e.g. "Breakfast"
    items:  [{ 
      name:String,
      calories:Number,
      proteinGm:Number, 
      carbsGm:Number, 
      fatsGm:Number,
      ingredients:String
      }],
   
      },...]
  },...]
}, exercisePlan: {
  splitName:String,
  days:[{
    day:String,
    MuscleFocusDay:String,
    items:[{focusMuscle:String,exercise:[{
    exerciseName: String,
    sets: Number,
    reps: String,
    restSeconds: Number,
  }],...]
  },...]
}}`;

  const result = await googleGemini.generateContent(prompt);
  const text = result.response.text();
  // console.log(text)
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}

