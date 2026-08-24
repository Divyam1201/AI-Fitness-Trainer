import { getAuth } from "@clerk/express";
import { exerciseModel } from "../models/exerciseModel.js";
import { catchError } from "../utils/AppErrorHandler.js";

const handlegetUserExPlan = catchError(async (req, res) => {
  const { status } = req.params;
  console.log(status);
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated) {
    return res.status(401).json({ error: "Unauthorized" }); //
  }

  if (status) {
    const getDesiredExercisePlan = await exerciseModel
      .find({ status, clerkUserId: userId })
      .select({ _id: 0 });
    return res.json({
      message: "Success",
      clerkUserId: getDesiredExercisePlan,
    });
  }
  console.log(`Request made by Clerk User ID: ${userId}`);

  return res.json({
    message: "Success",
    clerkUserId: userId,
  });
});

const handleAddNewUserExPlan = catchError(async (req,res) => {
  const userData = req.body()
  console.log(userData)
  const existingPlan = await exerciseModel.updateMany(
    { clerkUserId: userData.clerkUserId, status: "active" },
    { $set: { status: "inactive" } },
  );
  const addPlan = await exerciseModel.create(userData);
  console.log(addPlan)
res.json({message:addPlan})
});
export { handlegetUserExPlan, handleAddNewUserExPlan };
