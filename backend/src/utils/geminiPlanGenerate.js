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
        console.log("asdsa",ENV.GOOGLE_GEMINI_API)
    const googleGemini = googleGenAi.getGenerativeModel({model:"gemini-3.5-flash"})

    const prompt = `Given this user intake data: ${JSON.stringify(intakeData)}
  Generate a structured diet plan and workout schedule.
  Respond ONLY with valid JSON matching this shape: { dietPlan: {...}, exercisePlan: {...} }`;

  const result = await googleGemini.generateContent(prompt);
  const text = result.response.text();
  console.log(text)
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}