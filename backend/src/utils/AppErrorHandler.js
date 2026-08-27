export class AppError extends Error{
    constructor(message,statusCode){
        super(message),
        this.statusCode=statusCode,
        this.isOptional=true

    }
}


export const catchError = (fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch((error)=>{
        console.log(error)
        next()
    })
}