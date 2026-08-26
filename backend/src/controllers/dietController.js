import { getAuth } from "@clerk/express";
import { dietModel } from "../models/dietModel.js";
import { catchError } from "../utils/AppErrorHandler.js";

const handlegetUserDietPlan=catchError(async(req,res)=>{
   const { status } = req.query;
     console.log(status);
     const { isAuthenticated, userId } = getAuth(req);
   
     if (!isAuthenticated) {
       return res.status(401).json({ error: "Unauthorized" }); //
     }
   
     if (status) {
       const getDesiredExercisePlan = await dietModel
         .find({ status, clerkUserId: userId })
         .select({ _id: 0 });
       return res.json({
         message: "Success",
         clerkUserId: getDesiredExercisePlan,
       });
     }
     console.log(`Request made by Clerk User ID: ${userId}`);
   
     return res.status(400).json({
       message: "Failed status is required",
       
     });
})

const handleAddUserNewDietPlan = catchError(async (userData) => {
  const existingPlan = await dietModel.updateMany(
    { clerkUserId: userData.clerkUserId, status: "active" },
    { $set: { status: "inactive" } },
  );
  const addPlan = await dietModel.create(userData);
  console.log(addPlan)
});
export { handlegetUserDietPlan, handleAddUserNewDietPlan };