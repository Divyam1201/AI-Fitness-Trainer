import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    clerkUserId:{
        type:String,
        required:true,
        unique:true
    },
    userData:{
        age: { type: Number, required: true },
    name:{type: String, required: true},
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
      
    },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    activityLevel: {
      type: String,
    },
    fitnessGoal: {
      type: String,
    },
    fitnessLevel: {
      type: String,
    },
    dietaryPreference: {
      type: String,
    },
    mealsPerDay: { type: Number, required: true },
    medicalConditions: { type: String, default: "None" },
    allergiesOrRestrictions: { type: String, default: "None" },
    gymDaysPerWeek: { type: Number, min: 0, max: 7, required: true },
    preferredWorkoutType: {
      type: String,
      enum: ["Strength Training", "Cardio", "Mixed", "Flexibility/Mobility"]
    }
    }
},{
    timestamps:true
})

export const userModel = mongoose.model('user',userSchema)