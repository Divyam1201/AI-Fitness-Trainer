import { getAuth } from "@clerk/express";
import { dietModel } from "../models/dietModel.js";
import { AppError, catchError } from "../utils/AppErrorHandler.js";

const handlegetUserDietPlan=catchError(async(req,res)=>{
   const { status } = req.query;
    //  console.log(status);
     try {
      
     
     const { userId } = getAuth(req);
   
   
     if (status) {
       const getDesiredDietPlan = await dietModel
         .find({ status, clerkUserId: userId })
         .select({ _id: 0 });
       return res.json({
         message: "Success",
         result: getDesiredDietPlan,
       });
     }
     else{
       const getUserAllDietPlans = await dietModel
         .find({clerkUserId: userId })
         .select({ _id: 0 });
       return res.json({
         message: "Success",
         result: getUserAllDietPlans,
       });
     }} catch (error) {
      throw new AppError(error,500)
     }
})

const handleAddUserNewDietPlan = catchError(async (userData) => {
  const existingPlan = await dietModel.updateMany(
    { clerkUserId: userData.clerkUserId, status: "active" },
    { $set: { status: "inactive" } },
  );
  const addPlan = await dietModel.create(userData);
  // console.log(addPlan)
});
export { handlegetUserDietPlan, handleAddUserNewDietPlan };