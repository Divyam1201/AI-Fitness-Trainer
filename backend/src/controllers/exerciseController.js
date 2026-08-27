import { getAuth } from "@clerk/express";
import { exerciseModel } from "../models/exerciseModel.js";
import { AppError, catchError } from "../utils/AppErrorHandler.js";

const handlegetUserExPlan = catchError(async (req, res) => {
  const { status } = req.query;
  try {
    
  
  const { userId } = getAuth(req);

  if (status) {
    const getDesiredExercisePlan = await exerciseModel
      .find({ status, clerkUserId: userId })
      .select({ _id: 0 });
    return res.json({
      message: "Success",
      result: getDesiredExercisePlan,
    });
  }
  else
    {
      const getUserAllExercisePlan = await exerciseModel
      .find({clerkUserId: userId })
      .select({ _id: 0 });
    return res.json({
      message: "Success",
      result: getUserAllExercisePlan,
    });
  }
  } catch (error) {
    throw new AppError(error,500)
  }
});

const handleAddUserNewExPlan = catchError(async (userData) => {
 
  const existingPlan = await exerciseModel.updateMany(
    { clerkUserId: userData.clerkUserId, status: "active" },
    { $set: { status: "inactive" } },
  );
  const addPlan = await exerciseModel.create(userData);
});
export { handlegetUserExPlan, handleAddUserNewExPlan };
