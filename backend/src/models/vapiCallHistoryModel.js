import mongoose from "mongoose";

const VapiCallHistorySchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, index: true },
  callId: { type: String, required: true },
  intake: {
    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
      
    },
    heightCm: { type: Number, required: true },
    weightKg: { type: Number, required: true },
    activityLevel: {
      type: String,
      enum: ["Sedentary", "Moderate", "Active", "Very Active"]
    },
    fitnessGoal: {
      type: String,
      enum: ["Lose Weight", "Gain Muscle", "Maintain", "Improve Health"]
    },
    dietaryPreference: {
      type: String,
      enum: ["Vegetarian", "Vegan", "Non-Vegetarian"]
    },
    mealsPerDay: { type: Number, required: true },
    medicalConditions: { type: String, default: "None" },
    allergiesOrRestrictions: { type: String, default: "None" },
    gymDaysPerWeek: { type: Number, min: 0, max: 7, required: true },
    preferredWorkoutType: {
      type: String,
      enum: ["Strength Training", "Cardio", "Mixed", "Flexibility/Mobility"]
    }
  },
  rawStructuredData: mongoose.Schema.Types.Mixed,
},{timestamps:true});
export const vapiCallHistoryModel = mongoose.model('vapiCallHistory',vapiCallHistorySchema)