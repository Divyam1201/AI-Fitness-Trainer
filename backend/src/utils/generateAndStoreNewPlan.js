import { handleAddUserNewDietPlan } from "../controllers/dietController.js";
import { handleAddUserNewExPlan } from "../controllers/exerciseController.js";
import { sendUserPlan } from "../services/serverEvent.js";
import { editUserDets } from "../services/userService.js";
import { AppError } from "./AppErrorHandler.js";
import { generateDietAndWorkoutPlan } from "./geminiPlanGenerate.js";

export const generateAndStoreNewPlan = async(structuredData,clerkUserId,vapiCallId)=>{
  try {
    
 
          const result = await generateDietAndWorkoutPlan(structuredData);
          await Promise.all([
            handleAddUserNewExPlan({
              clerkUserId:clerkUserId,
              ...(vapiCallId?{vapiCallId: vapiCallId}:{}),
              status: "active",
              daysPerWeek: structuredData.gymDaysPerWeek,
              ...result.exercisePlan,
            }),
            handleAddUserNewDietPlan({
              clerkUserId:clerkUserId,
                ...(vapiCallId?{vapiCallId: vapiCallId}:{}),
              status: "active",
              ...result["dietPlan"],
            }),
          ]);
          await editUserDets(structuredData,clerkUserId)
          sendUserPlan(clerkUserId)
         } catch (error) {
          console.log(error)
    throw new AppError("Something went wrong",500)
  }
}