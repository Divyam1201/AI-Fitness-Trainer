export const editUserDets = async(userData,clerkUserId)=>{
    const result = await userModel.findOneAndUpdate({clerkUserId},{$set:{
    userData
}},{returnDocument:"after"}).select({_id:0})
   
      return result

}