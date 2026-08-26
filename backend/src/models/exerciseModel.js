import { Schema, model } from "mongoose";

const workoutSchema = new Schema(
  {
    exerciseName: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: String, required: true },
    restSeconds: { type: Number, required: true },
  },
  { _id: false },
);

const focusAndExerciseSchema = new Schema(
  {
    focusMuscle: { type: String, required: true },
    exercise: { type: [workoutSchema], required: true },
  },
  { _id: false },
);

const singleDayExerciseSchema = new Schema(
  {
    day: { type: String, required: true },
      MuscleFocusDay:{type:String,required:true},
    items: { type: [focusAndExerciseSchema], required: true },
  },
  { _id: false },
);
const exerciseSchema = new Schema(
  {
    clerkUserId:{type:String,required:true},
    vapiCallId : {type:String,required:false,unique:true},
    daysPerWeek: { type: Number, required: true },
    splitName:{type:String},
    days: { type: [singleDayExerciseSchema], required: true },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      index: true
    }
  },
  { timestamps: true },
);

export const exerciseModel = model("exercisePlan",exerciseSchema)