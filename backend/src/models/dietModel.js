import {Schema, model} from "mongoose"

const MealItemSchema = new Schema(
  {
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    proteinGm: { type: Number },
    carbsGm: { type: Number },
    fatsGm: { type: Number },
    ingredients:{type:String, required:true}
  },
  { _id: false }
);

const DayMealSchema = new Schema(
  {
    mealType: { type: String, required: true }, // e.g. Breakfast, Lunch, Dinner, Snack
    items: { type: [MealItemSchema], required: true },
      },
  { _id: false }
);

const DailyMealsSchema = new Schema(
  {
    day: { type: String, required: true }, // e.g. "Day 1"
    dayMeals: { type: [DayMealSchema], required: true }
  },
  { _id: false }
);

const MacrosSchema = new Schema(
  {
    proteinGm: { type: Number, required: true },
    carbsGm: { type: Number, required: true },
    fatsGm: { type: Number, required: true }
  },
  { _id: false }
);

const DietPlanSchema = new Schema(
  {
    clerkUserId: { type: String, required: true, index: true },
    vapiCallId: { type: String,unique:true,required:false, }, 
    dailyCalorieTarget: { type: Number, required: true },
    macros: { type: MacrosSchema, required: true },
    meals: { type: [DailyMealsSchema], required: true },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      index: true
    }
  },
  { timestamps: true } 
);

DietPlanSchema.index({ clerkUserId: 1, status: 1 });

export const dietModel = model('DietPlan', DietPlanSchema);